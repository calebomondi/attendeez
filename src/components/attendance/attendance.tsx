import apiService from "../../services/apiService";
import { useEffect, useState } from "react";
import { TodaysClassesStatus } from "../../types";
import ConfirmStudentAttendance from "../home/confirmAttendance";
import SignInAttendance from "./signin";
import NavBar from "../navbar/navbar";


export default function Attendance({student_id} : {student_id:string}) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const unit = params.get('unit');

  const [data, setData] = useState<TodaysClassesStatus[]>([])

  const [active,setActive] = useState<boolean>(false)

  const [attending,setAttending] = useState<boolean>(false)

  const [before,setBefore] = useState<boolean>(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getTodaysClasses();
        setData(result)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    };

    fetchData();

  },[]);

  const checkCurrentClassActive = async () => {
      const result = await apiService.getConfirmActiveClass(String(unit))
      if (result.length > 0)
        setActive(true)
  }
  checkCurrentClassActive()

  const amAttending = async () => {
    const result = await apiService.checkInAttendance(String(unit),student_id)
      if (result.started)
        setAttending(true)
  }
  amAttending()

  const ifSessionEndBeforeTime = async () => {
    const check = await apiService.endBeforeTime(String(unit))
    console.log(`beforeTime: ${check.session_end}`)
    if (check)
        setBefore(check.session_end)
  }
  ifSessionEndBeforeTime()

  //filter to get specific session
  const selectedClass = data.filter(item => item.units.unit_id === unit)

  //handle attend
  const handleAttend = async () => {
    const result = await apiService.postJoinSession(String(unit),student_id)
    if(result.success)
      console.log('Am attending!')
  }

  return (
    <>
    <NavBar />
    <main className="w-full mt-1 flex justify-center flex-col items-center p-2">
      {
        selectedClass.length > 0 ? (
          selectedClass.map((item,index) => (
            <div className="w-full md:w-1/4 p-2 border border-teal-500 rounded-lg flex flex-col justify-center m-5" key={index}>
              <p className="flex justify-center p-1">{item.units.unit_id}</p>
              <p className="flex justify-center p-1">{item.units.unit_name}</p>
              <p className="flex justify-center p-1">{item.start_time} - {item.end_time}</p>
              <p className="flex justify-center p-1">{item.classroom_id}</p>
              <p className="flex justify-center my-3"><hr className="w-1/2 border-t-2 border-teal-500"/></p>
              {
                item.status === 0 ? (
                  <p className="flex justify-evenly my-3">
                    <span className="font-mono">{item.progress}</span> | 
                    <ConfirmStudentAttendance unit_id={item.units.unit_id} student_id={student_id}/>
                  </p>
                ) : (
                  item.status === 1 ? (
                    active ? (
                      <div className="my-2 flex justify-center p-2">
                        {
                          attending ? (
                            before ? (
                              <p className="flex justify-evenly w-1/2">
                                ended BT
                                <ConfirmStudentAttendance unit_id={item.units.unit_id} student_id={student_id}/>
                              </p>
                            ) : (
                              <p className="flex flex-row justify-center items-center">
                                <span className="font-mono mr-1">You Are In attendance</span>
                                <span className="loading loading-ring loading-md"></span>
                              </p>
                            )
                            
                          ) : (
                            before ? (
                              <p className="flex justify-evenly w-1/2">
                                ended BT
                                <ConfirmStudentAttendance unit_id={item.units.unit_id} student_id={student_id}/>
                              </p>
                            ) : (
                              <button className="btn btn-success" onClick={() => handleAttend()}>Am Attending</button>
                            )
                          )
                        }
                      </div>
                    ): (
                      <p className="flex justify-evenly my-3">
                        <span className="font-mono">Session Not Yet Started</span>
                      </p>
                    )
                  ) : (
                    item.status === 2 ? (
                      <p className="flex justify-evenly my-3">
                        <span className="font-mono">{item.progress}</span>
                      </p>
                    ) : (
                      <span className="loading loading-spinner loading-md"></span>
                    )
                  )
                )
              }
            </div>
          ))
        ) : (
          <span className="loading loading-infinity loading-lg"></span>
        )
      }
      {
        <SignInAttendance unit_id={String(unit)} student_id={student_id} started={attending}/>
      }
    </main>
    </>
  )
}
