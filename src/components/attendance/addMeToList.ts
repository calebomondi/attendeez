import apiService from "../../services/apiService"
import { UploadAttendance } from "../../types"

const limit = 2

//upload to db if 5
async function signInAttendance(data:string[],unit_id:string) : Promise<UploadAttendance> {
    const params = new URLSearchParams()
    params.set('students',data.join(','))
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
    console.log("Am in addMeToList!")
    //parse JSON string
    const data:string[] = JSON.parse(scannedData);

    //check if student already exists and length is <= 5, if not add
    if(!data.includes(my_student_id.split("-")[1]) && data.length < 6) {
        data.push(my_student_id.split("-")[1])
        console.log(`data ->: ${data}`)
    }

    //check if list is full
    if(data.length === limit && data[0] === my_student_id.split("-")[1]) {
        try {
            const result = async () => {
                const fetchData = await signInAttendance(data,unit_id)
                if (fetchData.upload.length === limit){
                    console.log(`Completed Upload Of: ${fetchData.upload.length}`)
                    return 'Y'
                }
            }
            result()
        } catch (error) {
            
        }            
    }

    //convert back to stringify
    const jsonString = JSON.stringify(data)
    console.log(`data -->: ${jsonString}`)

    return jsonString
}

export default addMeToList