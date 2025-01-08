//timetable data structure 
export interface TimeTable {
    "timetable_id": number,
    "start_time": string,
    "end_time": string,
    "classroom_id":string,
    "days":{
        "day_id": number,
        "day_name":string,
    },
    "units":{
        "unit_id": string,
        "unit_name": string
    }
}

//Attendance progress data structure
export interface Progress {
    "unit_id": string,
    "unit_name": string,
    "total_sessions": number,
    "attended_sessions": number,
    "attendance_percentage": number
  }

  //Today's Classes 
export type TodaysClassesStatus = {
    "timetable_id": number,
    "start_time": string,
    "end_time": string,
    "classroom_id": string,
    "days": {
      "day_id": number,
      "day_name": string
    },
    "units": {
      "unit_id": string,
      "unit_name": string
    },
    "status": number,
    "progress": string
  }

//Confirm Attendance
export type ConfirmAttendance = {
    "unit_id": string,
    "attendance": [
      {
        "attended": boolean,
      }
    ]
  }

export type StudentInfo = {
  "student_id": string,
  "name": string,
  "semester": string
}

export type ConfirmClass = {
  "session_end" : boolean
}

export type InAttendance = {
  "started":boolean
}

export type JoinSession = {
  "success": boolean,
  "message": string,
  "data": [
    {
      "id": number,
      "class_session_id": number,
      "student_id": string,
    }
  ]
}

export type ClassEndTime = {
  "end_time":string,
  "session_end":boolean,
  "date":string
}

export type ClassIsActive = {
  "session_end": boolean
}

export interface ScannerConfig {
  qrbox: {
    width: number;
    height: number;
  };
  fps: number;
  rememberLastUsedCamera: boolean;
}

export type ScannerSuccessCallback = (decodedText: string) => void;
export type ScannerErrorCallback = (errorMessage: string) => void;

export type UploadAttendance = {
  "upload": boolean []
}

export interface StudentData {
  "student_id":string[]
}

export type SessionStarted = {
  "id": number,
  "session_end": boolean
}