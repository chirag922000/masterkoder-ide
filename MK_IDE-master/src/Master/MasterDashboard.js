import React, { useEffect, useRef, useState } from 'react'
// import { NavLink } from 'react-router-dom'
import "./masterDashboard.css"

function MasterDashboard() {
   
  const [userdata, setUserdata] = useState([])
  // const [isOpen, setIsOpen] = useState(false);
  const sidePanelRef = useRef(null);

  // Close the panel if clicked outside
  const handleClickOutside = (event) => {
    if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
    
    }
  };

  

  useEffect(() => {
    getuserData()
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [])


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


     
    <div className="container">
      <div className="content-wrapper">
        <table style={{ width: "100%", textAlign: "center"}}>
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
      </div>
       
    </div>
     



  </>

  )
}

export default MasterDashboard