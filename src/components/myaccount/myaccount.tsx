import NavBar from "../navbar/navbar"
import { useAuth } from "../auth/useAuth"
import apiService from "../../services/apiService";
import { StudentInfo } from "../../types";
import { useState, useEffect } from "react";

export default function MyAccount() {
  const {user} = useAuth();
  const email: string = user?.email || 'nah@notworking.com';

  const [data,setData] = useState<StudentInfo>({
      "student_id": "",
      "name": "",
      "semester": ""
  })

  useEffect(() => {
      //load from ls
      const ls_data = localStorage.getItem('profile')
      if (ls_data) {
        setData(JSON.parse(ls_data))
      }

      //load from db
      const fetchData = async () => {
        try {
          const result = await apiService.getStudentInfo(email)
          setData(result)

          localStorage.setItem('profile', JSON.stringify(result))
        } catch (error) {
          console.log(`Error: ${error}`)
        }
      }

      fetchData()

  },[email])
  
  return (
    <>
      <NavBar />
      <main className="w-full flex justify-center h-full p-5">
        <div className="card bg-base-100 w-96 shadow-xl m-5 border border-teal-500">
          <figure>
            <img
              src="https://pbs.twimg.com/profile_images/1846119592659496960/sXAZAvFd_400x400.jpg"
              alt="Profile Picture" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {data.student_id}
              <div className="badge badge-warning">{data.semester}</div>
            </h2>
            <h3 className="font-semibold">{data.name}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
      </main>
    </>
  )
}
