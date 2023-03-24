import {   Route, Routes   } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
// import Register from "./pages/Register";
import Fiddles from "./pages/Fiddles";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
import AdminRoute from "./Developer/AdminRoute"
 import AdminDashboard from "./Developer/AdminDashboard";

function App() {
 
  return (
     <div className="App">
    
      <Navbar />
      <Routes>
      <Route> <Route  path="/login" element={<Login />} /></Route>
     
     {/* user Routes */}
      <Route path="/user" element={<PrivateRoute/>}>
        <Route path="home" element={<   Home  />} />
        <Route path="fiddles" element={<  Fiddles    />} />
       <Route path="fiddles/:id" element={ < Home  />}  />
      </Route>

    {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute/>}>
         <Route path="dashboard" element={<AdminDashboard/>}/>

      </Route>


      <Route path="*" element={<Error />} />
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