import {useEffect,useState} from "react"
import apiService from "../../services/apiService"
import { TimeTable } from "../../types";

import { useCookies } from "react-cookie";

export default function Table({ day_id }: { day_id: number }) {
    const [data, setData] = useState<TimeTable[]>([]);
    const [cookies, setCookie] = useCookies([`timetable_${day_id}`]);

    useEffect(() => {
        //Try to load data from cookie
        const cookieData = cookies[`timetable_${day_id}`];
        if (cookieData) {
            console.log(`cookieData-Table-${day_id}: ${cookieData}`);
            setData(cookieData);
        }

        const fetchData = async () => {
        try {
            const result = await apiService.getTimeTable()
            setData(result)

            // Store the new data in cookie
            setCookie(`timetable_${day_id}`, result, {
              path: '/',
              maxAge: 3600, // Cookie expires in 1 hour
              secure: true,
              sameSite: 'strict'
            });
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
