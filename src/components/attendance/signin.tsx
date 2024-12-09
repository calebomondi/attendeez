import { ClassEndTime} from "../../types"

import { useEffect, useState } from "react"
import apiService from "../../services/apiService"

//import addMeToList from "./addMeToList"
//import isWithinTimeLimit from "./withinTimeLimit"
import generateQRCode from "./generateqr"

export default function SignInAttendance({unit_id, started, student_id}:{unit_id:string, started:boolean, student_id:string}) {
    
    const [data,setData] = useState<ClassEndTime>({"end_time":"","session_end":false,"date":"1999-12-31"})
    const [scannedData, setScannedData] = useState<{ id: string[] }>({ id: [student_id.split("-")[1]] });

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

  return (
    <div className={`w-full md:w-1/4 ${data.session_end ? 'border border-teal-500 rounded-lg' : ''} flex flex-col justify-center mt-2 p-2`}>
        {
            //generate qr
            data.session_end && started && (
                <div className="bg-white flex flex-col justify-center items-center p-2 rounded-lg">
                    <p className="text-red-500">The first to be scanned is the last to scan</p>
                    <p className="text-red-500">IF NOT</p>
                    <p className="text-red-500">Scan first before being scanned</p>
                    <div 
                        className=""
                        dangerouslySetInnerHTML={{ __html: generateQRCode(JSON.stringify(scannedData),400) }}
                    />
                </div>
            )
        }
        {
            //scan qr
            data.session_end && started && (
                <div className="">
                    Scanner Goes Here!
                    {student_id}
                </div>
            )
        }
    </div>
  )
}
