import React, { useEffect }   from "react";
import { useNavigate } from "react-router-dom";
// import { Route, Navigate } from "react-router-dom";

function PrivateRoute (props)  {
  const {Component}= props
  const navigate = useNavigate();
 
  useEffect(()=>{
    const token=localStorage.getItem("auth")
    if(!token){
      navigate("/login")
    }
  })

 
  
  return (
    
  <div>
   
    <Component/>
  </div>
  );
};

export default PrivateRoute;
