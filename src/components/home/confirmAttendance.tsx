import { ConfirmAttendance } from "../../types";
import apiService from "../../services/apiService";
import { useState,useEffect } from "react";

export default function ConfirmStudentAttendance({student_id, unit_id} : {student_id : string,unit_id : string}) {
    const [data, setData] = useState<ConfirmAttendance[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getConfirmAttendance(student_id);
                console.log(`result>: ${JSON.stringify(result)}`)
                setData(result);
            } catch (error) {
                console.log(`Error CA: ${error}`);
            }
        }

        fetchData();

    },[student_id]);

    const filteredData = data.filter(item => item.unit_id === unit_id);

  return (
    <>
        {
            filteredData.length > 0 ? (
                    <span>
                        {
                            filteredData[0].attendance[0].attended && (<>✅</>)
                        }
                    </span>
            ) : (
                <span>❌</span>
            )
            
        }
    </>
  )
}
