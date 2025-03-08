import Info from "./info"
import NavBar from "../navbar/navbar"

export default function UnitInfo({student_id} : {student_id:string}) {
  return (
    <>
      <NavBar />
      <main className="w-full p-3 mt-1 flex flex-col justify-center items-center">
        <div className="w-full sm:w-1/2 dark:bg-base-200 bg-white p-2 rounded-md">
            <h2 className="mb-3 text-xl font-bold font-sans text-center">Attendance Progress</h2>
            <Info student_id={student_id} />
        </div>
      </main>
    </>
  )
}
