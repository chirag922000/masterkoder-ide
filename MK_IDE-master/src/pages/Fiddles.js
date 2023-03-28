import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import "./fiddles.css";

function Fiddles() {
  const [projects, setProjects] = useState([]);
  const [allprojects,setAllProjects]=useState([])
  //  const navigate=useNavigate()
  useEffect(() => {
    getProducts();
    getAllProjects()
  }, []);

  const getProducts = async () => {
    try {
      const result = await fetch(" /projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        const data = await result.json();

        console.log(data);
        setProjects(data);
      } else {
        throw new Error("Fetch failed with status " + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const getAllProjects=async()=>{
    try {
      const result = await fetch(" /allprojects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        const projects_data = await result.json();
        
        console.log(projects_data);
        setAllProjects(projects_data);
      } else {
        throw new Error("Fetch failed with status " + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const deleteProject = async (project_id) => {
    try {
      const result = await fetch(`/projects/${project_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        console.log("ok");
         
        getProducts();
        alert("project Deleted")
      } else {
        throw new Error("Delete failed with status " + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        
        <div className="row">
          <h3>My Projects</h3>
          {projects.map((project, index) => (
            <div className="column" key={`my-project-${index}`}>
              <div className="card">
                <h3>{project.name}</h3>
               <a href={`fiddles/${project._id}`} key={`start-coding-${index}`}><p>Start Coding</p></a> 
                <button onClick={() => deleteProject(project._id)} key={`delete-project-${index}`}><p>Delete</p></button>
                
              </div>
            </div>
           
          ))}
        </div>
      }

      
      {
        <div className="row">
        <h3>All Projects</h3>
        {allprojects.map((allproject ,index ) => (
          <div className="column" key={allproject._id}>
            <div className="card">
              <h3>{allproject.name}</h3>
             <a href={`fiddles/${allproject._id}`} key={allproject._id}><p>Start Coding</p></a> 
            </div>
          </div>
         
        ))}
      </div>
      }
    </>
  );
}

export default Fiddles;
