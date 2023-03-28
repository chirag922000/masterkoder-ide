import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import "./masterDashboard.css"

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()   => {
    try {
        fetch('/master/api/users', { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setUsers(data);
          })
          .catch(err => console.error(err.message));
      } catch(error) {
        console.log(error);
      }
   
  }, []);
//   console.log(users)
  const filteredUsers = users.filter(user =>
    user.email.includes(searchTerm) || user.school.includes(searchTerm)
  );

  const removeUser=(userid)=>{
    fetch()
  }

  return (
    <div>
        <div>
    <NavLink to="/master/dash-board"><button >schools</button></NavLink>
    <NavLink to="/master/All-users"><button >All users</button></NavLink>
    <NavLink to="/master/register"> <button >Register user</button></NavLink>
   </div>
      <input
      style={{width:"100%",border:"2px blue solid",margin:"8px" }}
        type="text"
        placeholder="Search by userid or school..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table style={{width:"100%",textAlign:"center"}}>
        <thead>
          <tr>
            <th>Useremail</th>
            <th>School</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.school}</td>
              <td>
                <button onClick={()=>removeUser(user._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
