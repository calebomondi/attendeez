import axios, { AxiosResponse } from 'axios';
import { TimeTable, ClassIsActive, ClassEndTime, Progress, TodaysClassesStatus, ConfirmAttendance, StudentInfo, ConfirmClass, JoinSession, InAttendance } from '../types';
import API_URL from './apiurl';


const apiService = {
  getTimeTable: async (): Promise<TimeTable[]> => {
    try {
      const response: AxiosResponse<TimeTable[]> = await axios.get(`${API_URL}/timetable`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getAttendanceProgress: async (student_id:string): Promise<Progress[]> => {
    try {
      const response: AxiosResponse<Progress[]> = await axios.get(`${API_URL}/progress?user=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getTodaysClasses: async (): Promise<TodaysClassesStatus[]> => {
    try {
      const response: AxiosResponse<TodaysClassesStatus[]> = await axios.get(`${API_URL}/class-status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getConfirmAttendance: async (student_id:string): Promise<ConfirmAttendance[]> => {
    try {
      const response: AxiosResponse<ConfirmAttendance[]> = await axios.get(`${API_URL}/attended-today?user=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getStudentInfo: async (email:string): Promise<StudentInfo> => {
    try {
      const response: AxiosResponse<StudentInfo> = await axios.get(`${API_URL}/student-info?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getConfirmActiveClass: async (unit_id:string): Promise<ConfirmClass[]> => {
    try {
      const response: AxiosResponse<ConfirmClass[]> = await axios.get(`${API_URL}/confirmed-today?unit_id=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  postJoinSession: async (unit_id:string,student_id:string): Promise<JoinSession> => {
    try {
      const studentId = encodeURIComponent(student_id)
      const response: AxiosResponse<JoinSession> = await axios.post(`${API_URL}/join-session?unitId=${unit_id}&studentId=${studentId}`);
      console.log('postJoinSession:', response.data);
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
      const response: AxiosResponse<InAttendance> = await axios.get(`${API_URL}/in-attendance?unitId=${unit_id}&studentId=${student_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  checkSessionEnd: async (unit_id:string): Promise<ClassEndTime> => {
    try {
      const response: AxiosResponse<ClassEndTime> = await axios.get(`${API_URL}/check-session-end?unitId=${unit_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  endBeforeTime: async (unit_id:string): Promise<ClassIsActive> => {
    try {
      const response: AxiosResponse<ClassIsActive> = await axios.get(`${API_URL}/end-before-time?unitId=${unit_id}`);
      console.log('endBeforeTime:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  uploadAttendance: async (unit_id:string,students:string): Promise<boolean[]> => {
    try {
      const response: AxiosResponse<boolean[]> = await axios.post(`${API_URL}/upload-multiple?unitId=${unit_id}&${students}`);
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