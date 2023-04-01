import React, { useEffect, useState ,} from 'react';
import { Outlet ,useNavigate} from 'react-router-dom';
import PreLoader from './PreLoader';

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await fetch('/verifyuser', {
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
    return <PreLoader/>;
  }

  if (userFound) {
    return <Outlet />;
  }

  return navigate("/");
};

export default PrivateRoute;




