import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./masterDashboard.css"

function MasterDashboard() {
  const [userdata,setUserdata]=useState([])

useEffect(()=>{
  getuserData()
},[])


  const getuserData = async () => {
    try {
      const result = await fetch("/master/users-by-school", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        const data = await result.json();

        console.log(data);
        setUserdata(data);
      } else {
        throw new Error("Fetch failed with status " + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveClick = (school) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete all users from ${school} school?`);
    if (confirmDelete) {
      fetch(`/users-by-school/${school}`, { method: 'DELETE' })
        .then(() => {
          setUserdata(userdata.filter(row => row.school !== school));
        })
        .catch(err => console.error(err.message));
    }
  };
  




  return (<>
    
   <div>
    <NavLink to="/master/dash-board"><button >schools</button></NavLink>
    <NavLink to="/master/All-users"><button >All users</button></NavLink>
    <NavLink to="/master/register"> <button >Register user</button></NavLink>
   </div>
   <table style={{width:"100%",textAlign:"center"}}>
      <thead>
        <tr>
          <th>School</th>
          <th>Number of Users</th>
          <th>Remove </th>
        </tr>
      </thead>
      <tbody>
        {userdata.map(({ school, count }) => (
          <tr key={school}>
            <td>{school}</td>
            <td>{count}</td>
            <td><button onClick={() => handleRemoveClick(school)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  
  </>
   
  )
}

export default MasterDashboard