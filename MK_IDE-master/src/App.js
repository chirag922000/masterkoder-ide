import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Fiddles from "./pages/Fiddles";
// import PrivateRoute from "./PrivateRoute";
 
function App() {
  
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/" element={<PrivateRoute />}> */}
         
         
          <Route path="/" element={<Home />} />
          <Route path="/fiddles" element={<Fiddles />} />
          <Route path="/fiddles/:id" element={<Home />} />
      
      
        {/* </Route> */}
      
      </Routes>
    </div>
  );
}

export default App;