import React,{ useState, useEffect } from 'react'
import "../pages/fiddles.css"

function AdminDashboard() {
  const [projects, setProjects] = useState([]);

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
        console.log("ok")
        // const updatedProjects = projects.filter(project => project._id !== project_id);
        // setProjects(updatedProjects);
        getProducts();
      } else {
        throw new Error('Delete failed with status ' + result.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <div className="row">
          {projects.map((project, index) => (
            <div className="column" key={`all-project-${index}`}>
              <div className="card">
                <h3>{project.name}</h3>
               <a href={`fiddles/${project._id}`} key={`start-coding-all-${index}`}><p>Start Coding</p></a> 
                <button onClick={() => deleteProject(project._id)} key={`delete-project-${index}`}><p>Delete</p></button>
                
              </div>
            </div>
           
          ))}
        </div>
      }
    </>
  )
}

export default AdminDashboard