import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import useStorage from "../LocalStorage"
import "./home.css";
import proj_img from "./coding.avif"

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
      const result = await fetch("/projects", {
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
    {/* <h4 style={{marginLeft:"5px"}}>My Projects</h4> */}
    {
      
      <div class="card-container">
        
        {projects.map((project, index) => (
        <div class="card-home " key={`my-project-${index}`}>
        <img src={proj_img} alt="I 1" loading="lazy"/>
        <h2>{project.name}</h2>
        <a href={`home/${project._id}`} key={`start-coding-${index}`}><button class="button-30" onClick={() => get_Project_data(project)}>Start Coding</button></a>
         
        <button class="button-30" onClick={() => deleteProject(project._id ,project.name)} key={`delete-project-${index}`}>Delete</button>
        
        <p >Date: 7-31-23</p>
      </div> ))}
         
      </div>
    }
       

      
       {/* <h1 style={{textAlign:"center",margin:"5px"}}>All Projects</h1>
      {
      
      <div class="card-container">
        
        {allprojects.map((allproject, index) => (
        <div class="card-home " key={allproject._id}>
        <img src={proj_img} alt="I 1" loading="lazy"/>
        <h2>{allproject.name}</h2>
        <a href={`home/${allproject._id}`} key={allproject._id} ><button class="button-30" onClick={()=>get_Allproject_data(allproject)}>Start Coding</button></a>
         
 
        
        <p >Date: 7-31-23</p>
      </div> ))}
         
      </div>
    } */}
    </>
  );
}

export default Fiddles;
