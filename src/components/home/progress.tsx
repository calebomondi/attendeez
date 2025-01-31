import apiService from "../../services/apiService";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../types";

import { useCookies } from "react-cookie";

export default function AttendanceProgress({student_id} : {student_id:string}) {

    const [data,setData] = useState<Progress[]>([]);
    const [cookies, setCookie] = useCookies([`attendanceProgress_${student_id}`]);

    useEffect(() => {
        //Try to load data from cookie
        const cookieData = cookies[`attendanceProgress_${student_id}`];
        if (cookieData) {
            setData(cookieData);
        }
        const fetchData = async () => {
            try {
                const result = await apiService.getAttendanceProgress(student_id);

                console.log(`id: ${student_id} > progress: ${result}`)
                setData(result)

                // Store the new data in cookie
                setCookie(`attendanceProgress_${student_id}`, result, {
                    path: '/',
                    maxAge: 3600, // Cookie expires in 1 hour
                    secure: true,
                    sameSite: 'strict'
                });
            } catch (error) {
                console.log(`Error: ${error}`)
                
            }
        }

        fetchData();

    },[student_id, cookies, setCookie]);

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
        ) : <div className="flex justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        }
    </>
  )
}
