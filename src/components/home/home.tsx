//get todays classes
import TodaysClasses from "../timetable/todaysClasses";
//get attendance progress
import AttendanceProgress from "./progress";
//get IsVisible Function
import { IsVisible } from "./isvisble";

import NavBar from "../navbar/navbar";

export default function Home({student_id} : {student_id:string}) {
  
  return (
    <>
      <NavBar />
      <main className={`m-2 flex flex-col sm:flex-row ${IsVisible() ? '' : 'justify-center'}`}>
        <div className="w-full p-2 sm:h-full sm:w-1/2 sm:mr-2 bg-base-200 rounded-lg">
            <h2 className="mb-3 text-xl font-bold font-sans text-center">Attendance Progress</h2>
            <AttendanceProgress student_id = {student_id} />
        </div>
        <div className={`w-full mt-5 sm:mt-0 sm:ml-2 p-2 sm:w-1/2 bg-base-200 rounded-lg ${IsVisible() ? '' : 'hidden'}`}>
            <h2 className="mb-3 text-xl font-bold font-sans text-center">Todays classes</h2>
            <TodaysClasses student_id={student_id}/>
        </div>   
      </main>
    </>
  )
}
