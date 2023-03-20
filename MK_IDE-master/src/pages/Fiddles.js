import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import "./fiddles.css"

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
   {
   /* <div >
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
  </div> */
  <div classNamename="main-container">
   {projects.map((project,index)=>(
   <div className="cards">
    <div className="card card-1">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">{project.name}</h2>
      <p className="card__apply">
        <a className="card__link" href={`/fiddles/${project._id}`} key={project._id}>start coding <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
  </div>))}
  
</div>
  }

  </>
   
   );
};

export default Fiddles;
 