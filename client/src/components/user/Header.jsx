import React from 'react'
import DarkMode from '../shared/DarkMode'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../services/userServices'
import { persistor } from '../../redux/store'
import { clearUser } from '../../redux/features/userSlice'
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
const userData=useSelector((state)=>state.user)
const dispatch=useDispatch()

const handleLogout=()=>{
    try {
      userLogout().then((res)=>{
        persistor.purge()//remove persist data
        dispatch(clearUser())//clearing values in Redux
        navigate('/')
      })
    } catch (error) {
      console.log(error)
    }
}

const navigate=useNavigate()
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Logo</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li onClick={()=>navigate("/")}><a>Home</a></li>
      <li onClick={()=>navigate("/about")}><a>About</a></li>
      <li onClick={()=>navigate("/courses")}><a>Courses</a></li>
    </ul>
  </div>
  
  <div className="navbar-end gap-5">
    <DarkMode/>
    {userData.user && Object.keys(userData.user).length>0 ? 
    <div className='flex items-center space-x-3'>
      <span>{userData.user.name}</span>
      <button onClick={()=>navigate('/cart')}><FaCartShopping className='text-xl' /></button>
      <button className='btn btn-info' onClick={handleLogout}>LogOut</button>
    </div>: <a className="btn" onClick={()=>navigate("/login")}>Join us</a>}
  </div>
</div>
  )
}

export default Header
