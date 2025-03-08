import apiService from "../../services/apiService";
import { useEffect,useState } from "react";
import { Progress } from "../../types";


export default function Info({student_id} : {student_id:string}) {
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
                const result = await apiService.getAttendanceProgress(student_id)
                setData(result)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }

        fetchData();

    },[student_id]);

  return (
    <>
        {data.length > 0 ? (
            data.map((item,index) => (
                <div className="flex flex-col w-full sm:justify-evenly sm:align-middle sm:flex-row h-1/5 border border-teal-500 p-2 mb-2 rounded-lg" key={index}>
                    <div className="sm:w-1/2 p-2 m-1 flex flex-col text-xl">
                        <p>{item.unit_id}</p>
                        <p className="truncate">{item.unit_name}</p>
                    </div>
                    <div className="sm:w-1/2 p-2 m-1 flex justify-evenly">
                      <div 
                          style={{ "--value": `100`, "--size": "4rem", "--thickness": "2px" } as any} 
                          role="progressbar"
                          className="
                          text-success
                          mx-2
                          radial-progress
                          sm:[--size:8rem]   // Size for screens ≥ 640px
                          md:[--size:10rem]  // Size for screens ≥ 768px
                          lg:[--size:12rem]  // Size for screens ≥ 1024px
                          "
                      >
                          {item.total_sessions}
                      </div>
                      <div 
                          style={{ "--value": `${Math.round(item.attendance_percentage)}`, "--size": "4rem", "--thickness": "2px" } as any} 
                          role="progressbar"
                          className="
                          text-warning
                          mx-2
                          radial-progress
                          sm:[--size:8rem]   // Size for screens ≥ 640px
                          md:[--size:10rem]  // Size for screens ≥ 768px
                          lg:[--size:12rem]  // Size for screens ≥ 1024px
                          "
                      >
                          {item.attended_sessions}
                      </div>
                      <div 
                          style={{ "--value": `${Math.round(item.attendance_percentage)}`, "--size": "4rem", "--thickness": "2px" } as any} 
                          role="progressbar"
                          className="
                          mx-2
                          radial-progress
                          sm:[--size:8rem]   // Size for screens ≥ 640px
                          md:[--size:10rem]  // Size for screens ≥ 768px
                          lg:[--size:12rem]  // Size for screens ≥ 1024px
                          "
                      >
                          {Math.round(item.attendance_percentage)}{'%'}
                      </div>
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
