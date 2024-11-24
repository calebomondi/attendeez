import { ClassEndTime, ScannerConfig, ScannerSuccessCallback, ScannerErrorCallback, StudentData } from "../../types"
import { QRCodeSVG } from "qrcode.react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import apiService from "../../services/apiService"
import addMeToList from "./addMeToList"
import isWithinTimeLimit from "./withinTimeLimit"

export default function SignInAttendance({unit_id, started, student_id}:{unit_id:string, started:boolean, student_id:string}) {
    const [data,setData] = useState<ClassEndTime>({"end_time":"","session_end":false,"date":"1999-12-31"})
    //console.log(`student_id: ${student_id}`)
    const [scannedData, setScannedData] = useState<{ student_id: string[] }>({ student_id: [student_id.split("-")[1]] });
    //console.log(`scanned data: ${JSON.stringify(scannedData)}`)
    const [hasPermission, setHasPermission] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorMssg, setErrorMssg] = useState<boolean>(false);
    const [didscan, setDidscan] = useState<boolean>(false);
    const [complete, setComplete] = useState<boolean>(false);

    const [ended, setEnded] = useState<boolean>(false);

    const [upload,setUpload] = useState<string>('If not the first, scan before being scanned!')

    //check if session ended
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.checkSessionEnd(unit_id)
                setData(result)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
        fetchData()

    },[unit_id]);

    //for scanning
    useEffect(() => {
        // Only initialize scanner if conditions are met
        if (!data.session_end || !started) {
            return;
        }

        const scannerConfig: ScannerConfig = {
            qrbox: {width:250, height:250},
            fps: 10,
            rememberLastUsedCamera: true,
        }
        
        const scanner = new Html5QrcodeScanner('reader',scannerConfig,true);

        //on successful scan
        const onSuccessfullScan:ScannerSuccessCallback = (result) => {
            setDidscan(true)
            const within = isWithinTimeLimit(data.end_time)
            if(within) {
                const scannedData = addMeToList(result,student_id,unit_id)
                const parsed: StudentData  = JSON.parse(scannedData)

                if (parsed.student_id.length === 5){
                    setUpload('Attendance Sign In Complete!')
                    setComplete(true)
                }
                else
                    setScannedData(parsed)
            } else {
                setUpload('Cannot Add Attendance, Its Past Time!')
            }
            //setScannedData(result)
            setHasPermission(true)
            scanner.clear()
        }

        //error callback
        const error:ScannerErrorCallback = (err) => {
            setErrorMssg(true)
            if(err.includes('NotAllowedError')) {
                setHasPermission(false)
            } else {
                setError(err)
            }
        }

        // Small delay to ensure DOM element exists before starting scan
        setTimeout(() => {
            scanner.render(onSuccessfullScan,error)
        }, 100);

        //clean up component on unmount
        return () => {
            void scanner.clear().catch((err:Error) => console.error(err))
        };

    },[data.session_end, started]);

    setTimeout(() => {
        setEnded(isWithinTimeLimit(data.end_time))
        console.log(`ended--> ${ended}`)
    }, 100);

  return (
    <div className="w-full md:w-1/4 border border-teal-500 rounded-lg flex flex-col justify-center mt-2 p-2">
        {
            //scan qr
            data.session_end && started && ended && (
                <div className="">
                    {
                        !hasPermission && (
                            <p>
                                <h2>Camera Access Denied</h2>
                                <span>Please grant camera permission to use the QR scanner.</span>
                            </p>
                        )
                    }
                    {
                        errorMssg && (
                            <p>
                                <h2>Error</h2>
                                <span>{error}</span>
                            </p>
                        )
                    }
                    <div className="relative aspect-square max-w-sm mx-auto bg-gray-100 rounded-lg overflow-hidden text-gray-600">
                        {/* Scanner will be rendered here */}
                        <div id="reader" className="w-full h-full" />
                    </div>
                    {
                        didscan && (<div className="mt-3 bg-green-400 h-6 flex justify-center">
                            Scanned ✅
                        </div>)
                    }
                    {
                        complete && (<div className="mt-3 bg-green-500 h-6 flex justify-center">
                            Attendance Uploaded : 🙂
                        </div>)
                    }
                </div>
            )
        }
        {
            //generate qr
            data.session_end && started && ended && (
                <div className="flex flex-col bg-teal-800 w-full shadow-xl p-1 rounded-lg mt-3">
                    <div className="flex-col py-4 flex justify-center items-center w-full">
                        <h3 className="card-title text-sm">Your Attendance Code</h3>
                        <h4 className="text-sm w-ful text-red-400">{upload}</h4>
                    </div>
                    <figure className="bg-white rounded-lg">
                        <QRCodeSVG
                            className="w-full h-full p-2"
                            value = {JSON.stringify(scannedData)}
                            level="H"
                            includeMargin={false}
                        />
                    </figure>
                </div>
            )
        }
    </div>
  )
}
