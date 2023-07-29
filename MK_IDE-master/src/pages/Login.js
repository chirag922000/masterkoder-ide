 
import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
 

function Login( ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect the user to the home dashboard if they are already logged in
      navigate('/dashboard/home');
    }
  }, [navigate]);
   
  
    
    const collectData=async(event)=>{
      try {
        event.preventDefault();
      let result =await fetch("/login",{
          method:"POST",
          body:JSON.stringify({email,password}),
          headers:{
              "Content-Type":"application/json"
          }

      })
      result=await result.json()
       
     if(result ){ 
     localStorage.setItem('token', result.token);
     const user_role= JSON.stringify(result.user);

     if(user_role === "0"){ 
      navigate("/dashboard/home")
    }else if(user_role==="1"){
      navigate("/dashboard/developer")
    }else if(user_role==="2"){
      navigate("/master/dash-board")
    }
    ;
    }
    }catch(error){
        console.log(error)
    }
      
    }
  
  return (
    <>
    <div className="d-flex justify-content-center align-items-center h-100">
      <form className="col-md-6 p-4 border rounded">
        <h1 className="text-center mb-4">Login</h1>

        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Your Password"
            className="form-control"
          />
        </div>

        <button onClick={collectData} type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;
