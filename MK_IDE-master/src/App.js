import {   Route, Routes   } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
// import Register from "./pages/Register";
import Fiddles from "./pages/Fiddles";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
//  import DeveloperLogin from "./Developer/Developer_Login";
function App() {
 
  return (
     <div className="App">
    
      <Navbar />

       <Routes>
           
          <Route  path="/login" element={<Login />} />
          <Route path="/" element={<  PrivateRoute Component={Home}  />} />
          <Route path="/fiddles" element={< PrivateRoute Component={Fiddles}    />} />
          <Route path="/fiddles/:id" element={ <PrivateRoute Component={Home} />}  />
          {/* <Route path="/developer/dashboard" element={<DeveloperLogin/>}/> */}
          <Route path="*"  element={<  Error  />} />
          
          </Routes>

      
    </div>
  );
}

export default App;