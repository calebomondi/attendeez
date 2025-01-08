import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService"
import { TodaysClassesStatus } from "../../types";
import ConfirmStudentAttendance from "../home/confirmAttendance";

export default function TodaysClasses({student_id }: {student_id:string }) {
    const [data, setData] = useState<TodaysClassesStatus[]>([]);

    const navigate = useNavigate();

    const handleClick = ({unit_id} : {unit_id: string}) => {
      navigate(`/attendance?unit=${unit_id}`)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
            const result = await apiService.getTodaysClasses();
            setData(result)
        } catch (error) {
            console.log(`Error: ${error}`)
        };
      }
      fetchData();

    },[]);

  return (
    <>
    <div className="flex flex-col m-3">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="my-1 w-full flex flex-col md:flex-row border border-teal-600 rounded-lg cursor-pointer shadow-none hover:text-teal-500 hover:shadow-[0_0_10px_5px_rgba(0,128,128,0.85)] hover:bg-base-200 transition-colors duration-300" onClick={() => handleClick({unit_id: item.units.unit_id})}>
            <div className="md:w-2/3 w-full p-2">
              <p>{item.units.unit_id}</p>
              <p className="truncate">{item.units.unit_name}</p>
              <p>{item.start_time} - {item.end_time}, {item.classroom_id}</p>
            </div>
            <div className="md:w-2/6 w-full py-2 ml-1 flex justify-evenly items-center">
              <span className="font-mono">{item.progress}</span> |
              {
                item.progress === 'ended' ? (
                  <ConfirmStudentAttendance unit_id={item.units.unit_id} student_id={student_id} />
                ) : (
                  item.progress === 'ongoing' ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    <span className="loading loading-dots loading-lg"></span>
                  )
                )
              }
            </div>
          </div>
        ))
      ) : (
          <div className="flex justify-center w-full">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
      )}
    </div>
    </>
  )
}
