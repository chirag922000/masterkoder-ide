import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


function Fiddles () {
  const [projects, setProjects] = useState([]);
 
 useEffect(() => {
    getProducts();
  }, []);


  
  const getProducts = async () => {
    
    try {
      const result = await fetch(" /projects", {
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
  

 return (<>
   <div >
    <h2>Projects:</h2>
    {projects.length === 0 ? (
      <p>No projects found.</p>
    ) : (
      <ul >
        {projects.map((project,index) => (
         <a href={`/fiddles/${project._id}`} key={project._id} style={{margin:"20px",padding:"10px"}}> 
         <button   >
            <li  >
               
              <h3 >{project.name}</h3>
              
            </li>
            </button>
            </a>
        ))}
      </ul>
    )}
  </div>

  </>
   
   );
};

export default Fiddles;
 