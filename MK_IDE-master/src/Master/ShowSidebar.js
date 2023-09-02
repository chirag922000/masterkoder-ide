import React ,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

function ShowSidebar({children}) {
    const [showSidebar,setShowSidebar]=useState(false)
    const location=useLocation()

    useEffect(()=>{
        if(location.pathname==="/master/dash-board" ){
            setShowSidebar(true)
        }
        else if(location.pathname==="/master/All-users" ){
            setShowSidebar(true)
        }
        else if(location.pathname==="/master/register" ){
            setShowSidebar(true)
        }
        else if(location.pathname==="/master/addusers" ){
            setShowSidebar(true)
        }
        else{
            setShowSidebar(false)            
        }
    },[location])

  return (
    <div>{showSidebar && children}</div>
  )
}

export default ShowSidebar