import apiService from "../../services/apiService";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../types";

export default function AttendanceProgress({student_id} : {student_id:string}) {
    const [data,setData] = useState<Progress[]>([]);

    useEffect(() => {
        //load from ls
        const ls_data = localStorage.getItem('progress')
        if (ls_data) {
            setData(JSON.parse(ls_data))
        }

        //load from db
        const fetchData = async () => {
            try {
                const result = await apiService.getAttendanceProgress(student_id);
                setData(result)

                localStorage.setItem('progress', JSON.stringify(result))
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }

        fetchData();

    },[student_id]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/units-info');
    }

  return (
    <>
        {data.length > 0 ? (
            data.map((item,index) => (
                <div className="flex justify-evenly align-middle h-1/5 bg-teal-500 p-2 mb-2 rounded-lg cursor-pointer shadow-none hover:text-teal-500 hover:shadow-[0_0_10px_5px_rgba(0,128,128,0.85)] hover:bg-base-200 transition-shadow duration-300" onClick={() => handleClick()} key={index}>
                    <div className="flex flex-col justify-center w-1/2 p-2 ">
                        <p>{item.unit_id}</p>
                        <p className="truncate">{item.unit_name}</p>
                    </div>
                    <div 
                        style={{ "--value": `${Math.round(item.attendance_percentage)}`, "--size": "4rem", "--thickness": "2px" } as any} 
                        role="progressbar"
                        className="
                        radial-progress
                        sm:[--size:8rem]   // Size for screens ≥ 640px
                        md:[--size:10rem]  // Size for screens ≥ 768px
                        lg:[--size:12rem]  // Size for screens ≥ 1024px
                        "
                    >
                        {Math.round(item.attendance_percentage)}{'%'}
                    </div>
                </div>
            ))
        ) : <div className="flex justify-center text-lg my-5 font-semibold text-warning">
                <p className="text-center">You Haven't Attendeed Any Sessions Yet!</p>
            </div>
        }
    </>
  )
}
