import React ,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

function ShowSidebar({children}) {
    const [showDevNav,setShowDevNav]=useState(false)
    const location=useLocation()

    useEffect(()=>{
        if(location.pathname==="/dashboard/developer" ){
            setShowDevNav(true)
        }
        else if(location.pathname==="/dashboard/code-dev" ){
            setShowDevNav(true)
        }
        else if( location.pathname.startsWith('/dashboard/code-dev')){
            setShowDevNav(true)
        }
       
        else{
            setShowDevNav(false)            
        }
    },[location])

  return (
    <div>{showDevNav && children}</div>
  )
}

export default ShowSidebar