import React ,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

function ShowNavbar({children}) {
    const [showNavbar,setShowNavbar]=useState(false)
    const location=useLocation()
    

    useEffect(()=>{
        if(location.pathname==="/dashboard/code" ){
            setShowNavbar(true)
        }
        else if(location.pathname==="/dashboard/home" ){
            setShowNavbar(true)
        }
        else if(location.pathname.startsWith('/dashboard/home/')){
            setShowNavbar(true)
        }
         
        else{
            setShowNavbar(false)            
        }
    },[location])

  return (
    <div>{showNavbar && children}</div>
  )
}

export default ShowNavbar