import axios, { AxiosResponse } from 'axios';
import { UploadAttendance ,TimeTable, ClassIsActive, ClassEndTime, Progress, TodaysClassesStatus, ConfirmAttendance, StudentInfo, ConfirmClass, JoinSession, InAttendance } from '../types';
import API_URL from './apiurl';


const apiService = {
  getTimeTable: async (): Promise<TimeTable[]> => {
    try {
      const response: AxiosResponse<TimeTable[]> = await axios.get(`${API_URL}/api/class/timetable`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getAttendanceProgress: async (student_id:string): Promise<Progress[]> => {
    try {
      const response: AxiosResponse<Progress[]> = await axios.get(`${API_URL}/api/student/progress?user=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getTodaysClasses: async (): Promise<TodaysClassesStatus[]> => {
    try {
      const response: AxiosResponse<TodaysClassesStatus[]> = await axios.get(`${API_URL}/api/class/class-status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getConfirmAttendance: async (student_id:string): Promise<ConfirmAttendance[]> => {
    try {
      const response: AxiosResponse<ConfirmAttendance[]> = await axios.get(`${API_URL}/api/student/attended-today?user=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getStudentInfo: async (email:string): Promise<StudentInfo> => {
    try {
      const response: AxiosResponse<StudentInfo> = await axios.get(`${API_URL}/api/student/student-info?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getConfirmActiveClass: async (unit_id:string): Promise<ConfirmClass[]> => {
    try {
      const response: AxiosResponse<ConfirmClass[]> = await axios.get(`${API_URL}/api/tutor/confirmed-today?unit_id=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  postJoinSession: async (unit_id:string,student_id:string): Promise<JoinSession> => {
    try {
      const studentId = encodeURIComponent(student_id)
      const response: AxiosResponse<JoinSession> = await axios.post(`${API_URL}/api/student/join-session?unitId=${unit_id}&studentId=${studentId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      }
      throw error;
    }
  },
  checkInAttendance: async (unit_id:string,student_id:string): Promise<InAttendance> => {
    try {
      const response: AxiosResponse<InAttendance> = await axios.get(`${API_URL}/api/student/in-attendance?unitId=${unit_id}&studentId=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  checkSessionEnd: async (unit_id:string): Promise<ClassEndTime> => {
    try {
      const response: AxiosResponse<ClassEndTime> = await axios.get(`${API_URL}/api/class/check-session-end?unitId=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  endBeforeTime: async (unit_id:string): Promise<ClassIsActive> => {
    try {
      const response: AxiosResponse<ClassIsActive> = await axios.get(`${API_URL}/api/class/end-before-time?unitId=${unit_id}`);
      console.log('endBeforeTime:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  uploadAttendance: async (unit_id:string,students:string): Promise<UploadAttendance> => {
    try {
      const response: AxiosResponse<UploadAttendance> = await axios.post(`${API_URL}/api/student/upload-multiple?unitId=${unit_id}&${students}`);
      console.log('uploadAttendance:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      }
      throw error;
    }
  },
};

export default apiService;