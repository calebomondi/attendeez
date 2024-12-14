import { ClassEndTime} from "../../types"

import { useEffect, useState } from "react"
import apiService from "../../services/apiService"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//import addMeToList from "./addMeToList"
//import isWithinTimeLimit from "./withinTimeLimit"

import QRScanner from "./zxing"
import ResponsiveQRCode from "./generateqr2";

export default function SignInAttendance({unit_id, started, student_id}:{unit_id:string, started:boolean, student_id:string}) {
    
    const [data,setData] = useState<ClassEndTime>({"end_time":"","session_end":false,"date":"1999-12-31"})
    const [scannedData, setScannedData] = useState<string[]>([student_id.split("-")[1]]);

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
    /*
    //upload students
    function uploadMultiple(idArr:string) : void {
        const jsonObj = JSON.parse(idArr);
    }
    */
    const handleScan = (result: string) => {
        if (result.length > 0) {
            const jsonObj = JSON.parse(result)
            setScannedData(jsonObj)
        }
    };

    const handleError = (error: Error) => {
        console.error('QR Scan Error:', error)
        toast.error(`${error}`)
    };

  return (
    <>
    <ToastContainer />    
    <div className={`w-full md:w-1/4 ${data.session_end ? 'border border-teal-500 rounded-lg' : ''} flex flex-col justify-center mt-2 p-2`}>
        {
            //generate qr
            data.session_end && started && (
                <div className="bg-white flex flex-col justify-center items-center p-2 rounded-lg">
                    <p className="text-red-500">The first to be scanned is the last to scan</p>
                    <p className="text-red-500">IF NOT</p>
                    <p className="text-red-500">Scan first before being scanned</p>
                    <ResponsiveQRCode 
                        value={`${JSON.stringify(scannedData)}`}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="flex justify-center items-center"
                    />
                </div>
            )
        }
        {
            //scan qr
            data.session_end && started && (
                <div className="p-2">
                    <QRScanner 
                        onScan={handleScan} 
                        onError={handleError} 
                    />
                </div>
            )
        }
    </div>
    </>
  )
}
