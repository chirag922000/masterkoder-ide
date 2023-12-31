import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import useStorage from "./LocalStorage"
import "./home.css";

function Fiddles() {
  const [htmlCode, setHtmlCode] = useStorage("htmlCode","");
  const [cssCode, setCssCode] = useStorage("cssCode","");
  const [jsCode, setJsCode] = useStorage("jsCode","");
  const[projectname,setProjectName]=useStorage("projectName","")
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
        
         
        setAllProjects(projects_data);
      } else {
        throw new Error("Fetch failed with status " + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const deleteProject = async ( project_id  ) => {
     
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if(confirmDelete){
      try {
        const result = await fetch(`/projects/${project_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (result.ok) {
           
           
          getProducts();
          alert("project Deleted")
        } else {
          throw new Error("Delete failed with status " + result.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  };


  const get_Project_data=(project)=>{
    setHtmlCode( project.html );
    setCssCode( project.css);
    setJsCode( project.js );
    setProjectName(project.name)
     
  }

  
  const get_Allproject_data=(allproject)=>{
    setHtmlCode( allproject.html );
    setCssCode( allproject.css);
    setJsCode( allproject.js );
    setProjectName(allproject.name)
     
  }


  
  return (
    <>
      {
        
        <div className="row">
          <h3 className="h3">My Projects</h3><br/><br/>
          {projects.map((project, index) => (
            <div className="column" key={`my-project-${index}`}>
              <div className="card">
                <h3>{project.name}</h3>
               <a href={`home/${project._id}`} key={`start-coding-${index}`} onClick={() => get_Project_data(project)} ><p>Start Coding</p></a> 
                <button className="btn1" onClick={() => deleteProject(project._id ,project.name)} key={`delete-project-${index}`}><p>Delete</p></button>
                
              </div>
            </div>
           
          ))}
        </div>
      }

      
      {
        <div className="row">
        <h3>All Projects</h3> <br/>
        {allprojects.map((allproject ,index ) => (
          <div className="column" key={allproject._id}>
            <div className="card">
              <h3>{allproject.name}</h3>
             <a href={`home/${allproject._id}`} key={allproject._id} onClick={()=>get_Allproject_data(allproject)}><p>Start Coding</p></a> 
            </div>
          </div>
         
        ))}
      </div>
      }
    </>
  );
}

export default Fiddles;
