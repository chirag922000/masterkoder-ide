import {   Route, Routes   } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Fiddles from "./pages/Fiddles";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
import AdminRoute from "./Developer/AdminRoute"
 import AdminDashboard from "./Developer/DeveloperDashboard";
import DashboardLandingPage from "./pages/DashboardLandingPage"
import MasterRoute from "./Master/MasterRoute";
import MasterDashboard from "./Master/MasterDashboard";
import MasterAllusers from "./Master/MasterAllusers"

function App() {
 
  return (
     <div className="App">
    
      <Navbar />
      <Routes>
      <Route>
         <Route  path="/" element={<Login />} />
         
      </Route>
    
     
     {/* user Routes */}
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="" element={<DashboardLandingPage />} />
        <Route path="home" element={<   Home  />} />
        <Route path="fiddles" element={<  Fiddles    />} />
       <Route path="fiddles/:id" element={ < Home  />}  />
      </Route>

    {/* Admin Routes */}
      <Route path="/dashboard" element={<AdminRoute/>}>
         <Route path="developer" element={<AdminDashboard/>}/>
      </Route>

      <Route path="/master" element={<MasterRoute/>}>
        <Route path="dash-board" element={<MasterDashboard/>}/>
        <Route path="All-users" element={<MasterAllusers/>}/>
        <Route  path="register" element={<Register />} />
     </Route>

      <Route path="*" element={<Error />} />
      </Routes>
        

      
    </div>
  );
}

export default App;