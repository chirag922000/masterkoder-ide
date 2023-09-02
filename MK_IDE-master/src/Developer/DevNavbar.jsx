import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../pages/Navbar/navbar.css"
import logo from "../pages/Navbar/Pemanent Logo-mk.jpg"

function Navbar() {

  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(false)
  const [showLinks, setShowLinks] = useState(false);


  const auth = localStorage.getItem("token")
  const email=localStorage.getItem("email")
  useEffect(() => {
    if (auth) {
      setLoggedin(true)
    }
  }, [auth])






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

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  return (

 <nav class="navbar">
      <div ><img class="navbar-brand" src={logo} alt="" /></div>
      <div className='navbar-content'>
       <h1 class="navbar-crid" ><span style={{color:"#ff5126"}}>C</span >R<span style={{color:"#ff5126"}}>I</span>D</h1> 
       <p >{email}</p>
       <p>Developer Panel</p>
       </div>
      

      {
        loggedin ? (
          <div>
          <div className={`navbar-links ${showLinks ? 'show' : ''}`} id="navbarLinks">
            <NavLink to="/dashboard/developer"  >Home</NavLink>
            <NavLink to="/dashboard/code-dev"  >Code</NavLink>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </div>
          <div class="navbar-toggle" onClick={handleToggle} id="navbarToggle">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        </div>
        ) : (
           <>
           </>
        )
      }
      
    </nav>


  )
}

export default Navbar