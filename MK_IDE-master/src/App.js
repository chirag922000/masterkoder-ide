import {   Route, Routes   } from "react-router-dom";
// import "./vendor/bootstrap/css/bootstrap.min.css";
// import "./assets/css/templatemo-chain-app-dev.css";
// import "./assets/css/animated.css";
// import "./assets/css/owl.css"
import Login from "./pages/Login/Login";
import Code from "./pages/Code/Code";
import Navbar from "./pages/Navbar/Navbar";
import Register from "./Master/Register";
import Home from "./pages/Home/Home";
import PrivateRoute from "./pages/PrivateRoute";
import Error from "./pages/Error";
import AdminRoute from "./Developer/AdminRoute"
 import AdminDashboard from "./Developer/DeveloperDashboard";
import DashboardLandingPage from "./pages/DashboardLandingPage"
import MasterRoute from "./Master/MasterRoute";
import MasterDashboard from "./Master/MasterDashboard";
import MasterAllusers from "./Master/MasterAllusers"
// import AddLearningJourney from "./Developer/AddLearningJourney";
// import Learn from "./pages/Learn";
// import ContentPage from "./pages/ContentPage";
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
 
  return (
    <>
     
    
     <Navbar/>
      <Routes>
      
      <Route>
         <Route  path="/" element={<Login />} />
         
      </Route>
    
     
     {/* user Routes */}
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="" element={<DashboardLandingPage />} />
          {/* <Route path="learn" element={<Learn />} /> */}
          {/* <Route path="learn/:id" element={< ContentPage/>} /> */}
         <Route path="code" element={<   Code  />} />
        <Route path="home" element={< Home />} />
       <Route path="home/:id" element={ < Code  />}  />
      </Route>

    {/* Admin Routes */}
      <Route path="/dashboard" element={<AdminRoute/>}>
         <Route path="developer" element={<AdminDashboard/>}/>
         {/* <Route path="addtopics" element={<AddLearningJourney/>}/> */}
      </Route>

      <Route path="/master" element={<MasterRoute/>}>
        <Route path="dash-board" element={<MasterDashboard/>}/>
        <Route path="All-users" element={<MasterAllusers/>}/>
        <Route  path="register" element={<Register/>} />
     </Route>

      <Route path="*" element={<Error />} />
      </Routes>
      
      </>
  );
}

export default App;