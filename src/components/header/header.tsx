import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StudentInfo } from '../../types';
import Attendance from '../attendance/attendance';
import Timetable from '../timetable/timetable';
import Home from '../home/home';
import MyAccount from '../myaccount/myaccount';
import UnitInfo from '../unit-info/unitinfo';
import apiService from '../../services/apiService';

import Authenticate from '../auth/authenticate';
import { AuthProvider } from '../auth/authProvider';
import { ProtectedRoute } from '../auth/protectedRoute';
import { useAuth } from '../auth/useAuth';

import { CookiesProvider } from 'react-cookie';

const AuthenticatedApp: React.FC = () => {
    const { user } = useAuth();
    const email: string = user?.email || 'nah@notworking.com';
    console.log(`user-email-> ${email}`)

    const [data,setData] = useState<StudentInfo>({
        "student_id": "",
        "name": "",
        "semester": ""
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getStudentInfo(email)
                setData(result)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }

        fetchData()

    },[])

    const student_id = data.student_id

    console.log(`student_id: ${student_id}`)
  
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Home student_id={student_id}/>
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <MyAccount />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/timetable" 
                element={
                    <ProtectedRoute>
                        <Timetable />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/attendance" 
                element={
                    <ProtectedRoute>
                        <Attendance student_id={student_id}/>
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/units-info" 
                element={
                    <ProtectedRoute>
                        <UnitInfo student_id={student_id}/>
                    </ProtectedRoute>
                } 
            />
            <Route path="/auth" element={<Authenticate />} />
        </Routes>
    );
  };

// Main Header component
export default function Header() {
    return (
        <Router>
            <AuthProvider>
                <CookiesProvider>
                    <AuthenticatedApp />
                </CookiesProvider>
            </AuthProvider>
        </Router>
    );
}