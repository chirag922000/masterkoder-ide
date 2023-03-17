 
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem("token")
    if (auth)
    {
      navigate("/")
    }
  })
   
  const collectData = async (event) => {
    event.preventDefault();
    try {
      let result = await fetch("http://localhost:4000/register", {
        method:"POST",
        body: JSON.stringify({ username: userName, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (result) {
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/login");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <div className=" w-screen h-[80vh] flex  justify-center items-center">
      <form
        
        className="flex flex-col  w-[50%]  space-y-4  "
      >
        <h1 className="text-xl "> Signup</h1>
        <div className="flex flex-col ">
          <label className="text-xl ">User Name</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter Your User Name"
            className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
          />
        </div>
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

        <button onClick={collectData}
          type="submit"
          className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
