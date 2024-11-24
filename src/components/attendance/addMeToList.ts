import apiService from "../../services/apiService"
import { UploadAttendance } from "../../types"

const limit = 5

interface StudentData {
    "student_id":string[]
}

//upload to db if 5
async function signInAttendance(data:StudentData,unit_id:string) : Promise<UploadAttendance> {
    const students = data.student_id
    const params = new URLSearchParams()
    params.set('students',students.join(','))
    const url = `${params.toString()}`
    //call apiservice to upload
    try {
        const fetchData = await apiService.uploadAttendance(unit_id,url)
        return fetchData
    } catch (error) {
        console.log(`signInAttendance Error: ${error}`)
    }

    return {upload: []}
}

function addMeToList(scannedData:string,my_student_id:string,unit_id:string) : string {
    //parse JSON string
    const data = JSON.parse(scannedData) as StudentData;
    //check if student already exists and length is <= 5
    if(!data.student_id.includes(my_student_id.split("-")[1]) && data.student_id.length < 6) {
        data.student_id.push(my_student_id.split("-")[1])
    }
    //check if full
    if(data.student_id.length === limit && data.student_id[0] === my_student_id.split("-")[1]) {
        try {
            const result = async () => {
                const fetchData = await signInAttendance(data,unit_id)
                if (fetchData.upload.length === limit){
                    console.log(`fetchData.upload.length: ${fetchData.upload.length}`)
                }
            }
            result()
        } catch (error) {
            
        }            
    }
    //convert back to stringify
    const jsonString = JSON.stringify(data)

    return jsonString
}

export default addMeToList