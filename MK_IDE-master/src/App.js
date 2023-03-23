import {   Route, Routes   } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Fiddles from "./pages/Fiddles";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
 import DeveloperLogin from "./Developer/Developer_Login.js";
import DeveloperScreen from "./Developer/Developer_screen";
 

function App() {
 
  return (
     <div className="App">
    
      <Navbar />
      <Routes>
      <Route> <Route  path="/login" element={<Login />} /></Route>
     
      <Route path="/user" element={<PrivateRoute/>}>
        <Route path="home" element={<   Home  />} />
        <Route path="fiddles" element={<  Fiddles    />} />
       <Route path="fiddles/:id" element={ < Home  />}  />
      </Route>
      </Routes>
       {/* <Routes>
           
          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route path="/" element={<   Home  />} />
          <Route path="/fiddles" element={<  Fiddles    />} />
          <Route path="/fiddles/:id" element={ < Home  />}  />

          <Route path="/developer" element={<DeveloperLogin/>}/>
              <Route path="/dashboard" element={< DeveloperScreen/>}  />
          <Route/>

          <Route path="*"  element={<  Error  />} />
          
          </Routes> */}

      
    </div>
  );
}

export default App;