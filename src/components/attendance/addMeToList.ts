import apiService from "../../services/apiService"
import { UploadAttendance } from "../../types"

const limit = 3

//upload to db if limit reached
async function signInAttendance(data:string[],unit_id:string) : Promise<UploadAttendance> {
    const params = new URLSearchParams()
    params.set('students',data.join(','))
    const url = `${params.toString()}`
    console.log(`url: ${url}`)

    //call apiservice to upload
    try {
        const fetchData = await apiService.uploadAttendance(unit_id,url)
        console.log(`fetchData: ${fetchData.upload}`)
        return fetchData
    } catch (error) {
        console.log(`signInAttendance Error: ${error}`)
    }

    return {"upload":[]}
}

async function addMeToList(scannedData:string,my_student_id:string,unit_id:string) : Promise<string> {
    //parse JSON string
    const data:string[] = JSON.parse(scannedData);

    //check if student already exists and length is <= 5, if not add
    if(!data.includes(my_student_id.split("-")[1]) && data.length < 6) {
        data.push(my_student_id.split("-")[1])
    }

    //check if list is full
    if(data.length === limit && data[0] === my_student_id.split("-")[1]) {
        try {
            const fetchData = await signInAttendance(data,unit_id)
            if (fetchData.upload.length === limit){
                console.log(`Completed Upload Of: ${fetchData.upload.length}`)
                return 'Y'
            }
        } catch (error) {
            console.log('Failed To Upload Student List To DB!')
        }            
    }

    //convert back to stringify
    const jsonString = JSON.stringify(data)

    return jsonString
}

export default addMeToList