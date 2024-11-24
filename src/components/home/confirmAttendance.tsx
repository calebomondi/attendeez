import { ConfirmAttendance } from "../../types";
import apiService from "../../services/apiService";
import { useState,useEffect } from "react";

export default function ConfirmStudentAttendance({student_id, unit_id} : {student_id : string,unit_id : string}) {
    const [data, setData] = useState<ConfirmAttendance[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getConfirmAttendance(student_id);
                console.log(`result>: ${result}`)
                setData(result);
            } catch (error) {
                console.log(`Error CA: ${error}`);
            }
        }

        fetchData();

    },[student_id]);

  return (
    <>
        {
            data.length > 0 ? (
                data.filter(item => item.unit_id === unit_id).map(item => (
                    <span key={item.unit_id}>
                        {
                            item.attendance[0].attended && (<>✅</>)
                        }
                    </span>
                ))
            ) : (
                <span>❌</span>
            )
            
        }
    </>
  )
}
