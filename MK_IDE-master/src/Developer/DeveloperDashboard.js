import React,{ useState, useEffect } from 'react'
 
import proj_img from "../pages/Home/coding.avif"
import useStorage from "../pages/LocalStorage"

function AdminDashboard() {
  const [htmlCode, setHtmlCode] = useStorage("htmlCode","");
  const [cssCode, setCssCode] = useStorage("cssCode","");
  const [jsCode, setJsCode] = useStorage("jsCode","");
  const[projectname,setProjectName]=useStorage("projectName","")
  const [projects, setProjects] = useState([]);
  const [allprojects,setAllProjects]=useState([])

  useEffect(() => { 
    getProducts();
    
  }, []);

    
  const getProducts = async () => {
    
    try {
      const result = await fetch(" /developersprojects", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
     });
      if (result) {
        const data = await result.json();
        console.log(data)
        setProjects(data);
      } else {
        
        throw new Error('Fetch failed with status ' + result.status);
        
      }
    } catch (error) {
      
      console.log(error);
     
    }
  };
  const deleteProject = async (project_id ) => {
    try {
      const result = await fetch(`/projects/${project_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        
        // const updatedProjects = projects.filter(project => project._id !== project_id);
        // setProjects(updatedProjects);
        getProducts();
        alert("project Deleted")
      } else {
        throw new Error('Delete failed with status ' + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_Project_data=(project)=>{
    setHtmlCode( project.html );
    setCssCode( project.css);
    setJsCode( project.js );
    setProjectName(project.name)
     
  }

  return (
    <>
       

{
      
      <div class="card-container">
        
        {projects.map((project, index) => (
        <div class="card-home " key={`all-project-${index}`}>
        <img src={proj_img} alt="I 1" loading="lazy"/>
        <h2>{project.name}</h2>
        <a href={`code-dev/${project._id}`} key={`start-coding-all-${index}`}><button class="button-30" onClick={() => get_Project_data(project)}>Start Coding</button></a>
         
        <button class="button-30" onClick={() => deleteProject(project._id ,project.name)} key={`delete-project-${index}`}>Delete</button>
        
        <p >{project.time}</p>
      </div> ))}
         
      </div>
    }
    </>
  )
}

export default AdminDashboard