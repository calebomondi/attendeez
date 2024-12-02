import { ClassEndTime} from "../../types"

import { useEffect, useState } from "react"
import apiService from "../../services/apiService"

//import addMeToList from "./addMeToList"
//import isWithinTimeLimit from "./withinTimeLimit"
import generateQRCode from "./generateqr"

export default function SignInAttendance({unit_id, started, student_id}:{unit_id:string, started:boolean, student_id:string}) {
    
    const [data,setData] = useState<ClassEndTime>({"end_time":"","session_end":false,"date":"1999-12-31"})
    const [qrCode, setQRCode] = useState<string>('');

    //const [scannedData, setScannedData] = useState<{ student_id: string[] }>({ student_id: [student_id.split("-")[1]] });

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

    const generate = () => {
        const result = generateQRCode(student_id);
        setQRCode(result)
    }
    generate()

  return (
    <div className="w-full md:w-1/4 border border-teal-500 rounded-lg flex flex-col justify-center mt-2 p-2">
        {
            //scan qr
            data.session_end && started && (
                <div className="">
                    Scanner Goes Here!
                    {student_id}
                </div>
            )
        }
        {
            //generate qr
            data.session_end && started && (
                <div className="flex flex-col bg-teal-800 w-full shadow-xl p-1 rounded-lg mt-3">
                    <img 
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`} 
                        alt="Generated QR Code" 
                    />
                </div>
            )
        }
    </div>
  )
}
