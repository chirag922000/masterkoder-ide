 
import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
   
  
    
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
      console.log(result)
       navigate("/")
      }catch(error){
        console.log(error)
      }
      
    }
  
  return (
    <div className="w-screen h-[80vh] flex  justify-center items-center">
      <form
        
        className="flex flex-col  w-[50%]  space-y-4  "
      >
        <h1 className="text-xl "> Login</h1>

        <div className="flex flex-col ">
          <label className="text-xl ">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Your Email"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-xl ">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter Your Password"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
        </div>

        <button
          onClick={collectData}
          type="submit"
          className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
