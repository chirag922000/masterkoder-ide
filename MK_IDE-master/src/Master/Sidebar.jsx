import React, { useState } from 'react'
import {
  FaBars
} from "react-icons/fa"
import { NavLink,useNavigate } from 'react-router-dom'
import "./sidebar.css"


function Sidebar() {
  const [loggedin, setLoggedin] = useState(false)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const shouldLogout = window.confirm('Are you sure you want to logout?');
      if (shouldLogout) {
        await fetch("/logout", { method: "POST" });
        setLoggedin(false)
        localStorage.clear()
        navigate("/");
      }
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-sidebar'>
      <div className='sidebar'>
        <div className='top_section'>
          <h1 className='logo-sidebar'>Master Dashboard</h1>
           
        </div>
        
        <div className='dashboeard-nav-links'>
        <FaBars className='toggler-nav'/>
        <NavLink to="master/dash-board" className="link-sidebar" activeclassName="active">
          <div className='link_text'>Dashboard </div>
        </NavLink>
        <NavLink to="master/All-users" className="link-sidebar" activeclassName="active">
          <div className='link_text'>All-users </div>
        </NavLink>
        <NavLink to="master/register" className="link-sidebar" activeclassName="active">
          <div className='link_text'>Register single user </div>
        </NavLink>
        <NavLink to="master/addusers" className="link-sidebar" activeclassName="active">
          <div className='link_text'>Add Multiple users </div>
        </NavLink>
        <NavLink className="logout-nav" onClick={handleLogout}>Logout</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar