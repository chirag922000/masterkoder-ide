import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import "./navbar.css"
import logo from "./logo.png"

function Navbar() {

  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(false)


  const auth = localStorage.getItem("token")
  useEffect(() => {
    if (auth) {
      setLoggedin(true)
    }
  }, [auth])






  const handleLogout = async () => {
    try {
      await fetch("/logout", { method: "POST" });
      setLoggedin(false)
      localStorage.clear()
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };



  return (

    //   <nav className="bg-white border-gray-200 px-2 sm:px-4 py-3.5 rounded dark:bg-gray-800">
    //   <div className="container flex flex-wrap justify-between items-center mx-auto">
    //     <Link   className="flex items-center">
    //         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MASTERKODER</span>
    //     </Link>
    //     <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
    //       <span className="sr-only">Open main menu</span>
    //       <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    //       <svg className="hidden w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    //     </button>
    //     <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
    //       <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
    //         {/* <li>
    //           <NavLink to="/dashboard/code" className="block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent text-black md:p-0 dark:text-white" aria-current="page">Code</NavLink>
    //         </li> */}



    //           {
    //             loggedin?(
    //             <div>
    //               <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
    //               <li>
    //             <NavLink to="/dashboard/code" className="block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent text-black md:p-0 dark:text-white" aria-current="page">Code</NavLink>
    //           </li>
    //           <li>
    //           <NavLink to="/dashboard/home" className="block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent text-black md:p-0 dark:text-white" aria-current="page">Home</NavLink>
    //         </li>
    //             <li>
    //               <NavLink  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={handleLogout}  >Logout</NavLink>
    //             </li>

    //         </ul>
    //           </div>
    //             ):(  <li>
    //               <NavLink to="/"  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Login</NavLink>
    //             </li>)
    //           }    
    //         {/* <li>
    //           <NavLink to="/dashboard/home" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
    //         </li> */}

    //       </ul>
    //     </div>
    //   </div>
    // </nav> 
    <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container" >
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">

              <a href="index.html" className="logo">
                <img src={logo} alt="Chain App Dev" />
              </a>

              {/* <ul className="nav">

                <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                <li className="scroll-to-section"><a href="#services">Code</a></li>
                <li className="scroll-to-section"><a href="#about">Logout</a></li>
                <li><div className="gradient-button"><a id="modal_trigger" href="#modal"><i className="fa fa-sign-in-alt"></i> Login</a></div></li>
              </ul> */}

              {loggedin?(<ul className="nav">

<li className="scroll-to-section"><NavLink to="/dashboard/home"  >Home</NavLink></li>
<li className="scroll-to-section"><NavLink to="/dashboard/code">Code</NavLink></li>
<li className="gradient-button"><NavLink  onClick={handleLogout}><i className="fa fa-sign-in-alt"></i>Logout</NavLink></li>
 
</ul>):(<ul className="nav">

 
<li><div className="gradient-button"><NavLink style={{color:"white"}} id="modal_trigger" to="/"><i className="fa fa-sign-in-alt"></i> Login</NavLink></div></li>
</ul>)}

              <a className='menu-trigger'>
                <span>Menu</span>
              </a>

            </nav>
          </div>
        </div>
      </div>
    </header>




  )
}

export default Navbar