import React, { useEffect, useState ,} from 'react';
import { Outlet   } from 'react-router-dom';
import Error from "../pages/Error"

const MasterRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await fetch('/verifymaster', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (result.ok) {
          setUserFound(true);
        } else {
          setUserFound(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userFound) {
    return <Outlet />;
  }

  return <Error/>
};

export default MasterRoute;




 
    
 

// export default PrivateRoute;
