import { Link } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

import logo from '/attendeez.png'

export default function NavBar() {
    const {signOut} = useAuth()

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <Link to="/" className='text-lg'>Home</Link>
                </li>
                <li>
                    <Link to="/timetable" className='text-lg'>Timetable</Link>
                </li>
                <li>
                    <Link to="/units-info" className='text-lg'>All Attendance</Link>
                </li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <Link to = "/" className='text-3xl'>
            <img 
                src={logo} 
                alt="" 
                className="w-12"
            />
            </Link>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://pbs.twimg.com/profile_images/1846119592659496960/sXAZAvFd_400x400.jpg" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to="/profile" className='text-lg'>Profile</Link>
                    </li>
                    <li onClick={signOut}>
                        <span className='text-lg'>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
