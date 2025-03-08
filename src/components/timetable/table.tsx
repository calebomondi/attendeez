import {useEffect,useState} from "react"
import apiService from "../../services/apiService"
import { TimeTable } from "../../types";

export default function Table({ day_id }: { day_id: number }) {
    const [data, setData] = useState<TimeTable[]>([]);

    useEffect(() => {
      //load from ls
      const ls_data = localStorage.getItem('timetable')
      if (ls_data) {
        setData(JSON.parse(ls_data))
      }
      
      //load from db
      const fetchData = async () => {
        try {
            const result = await apiService.getTimeTable()
            setData(result)
            
            localStorage.setItem('timetable', JSON.stringify(result))
        } catch (error) {
            console.log(`Error: ${error}`)
        };
      }

      fetchData();

    },[day_id]);

  // Filter data by day_id
  const filteredData = data.filter((item) => item.days.day_id === day_id);

  return (
    <div className="collapse-content flex flex-col md:flex-row">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div key={index} className="my-1 md:mx-1 md:flex md:justify-evenly md:w-2/6 border border-teal-600 rounded-lg">
            <div className="w-full p-2">
            <p>{item.units.unit_id}</p>
            <p className="truncate">{item.units.unit_name}</p>
            <p>{item.start_time} - {item.end_time}, {item.classroom_id}</p>
            </div>
          </div>
        ))
      ) : (
          <p>
            <span className="loading loading-infinity loading-lg"></span>
          </p>
      )}
    </div>
  )
}
