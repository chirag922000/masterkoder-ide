import React,{ useState, useEffect } from 'react'

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


  return (
    <>
   {
   
  <div className="main-container">
   {projects.map((project,index)=>(
   <div className="cards">
    <div className="card card-1">
      <div className="card__icon"><i className="fas fa-bolt" ></i></div>
      {/* <p className="card__exit"><i className="fas fa-times" ></i>delete</p>   */}
      <p className="card__apply">
        <button className="card__link"   >Delete <i className="fas fa-arrow-right"></i></button>
      </p>
      <h2 className="card__title">{project.name}</h2>
      <p className="card__apply">
        <a className="card__link" href={`fiddles/${project._id}`} key={project._id}>Start coding <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
  </div>))}
  
</div>
  }

  </>
  )
}

export default AdminDashboard