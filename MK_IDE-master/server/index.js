const express = require("express");
 
const InitiateMongoServer = require("./config/db");
 const cookieParser =require("cookie-parser")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./modal/User");
const DeveloperProjects=require("./modal/DeveloperProjects")
const jwtkey = "e-commerce";
const app = express();
//  app.use(cors())
 app.use(cookieParser())
app.use(cors( ));


 
app.use(express.json());
 

InitiateMongoServer();
 

// PORT
const PORT = 4000;


app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10; // number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = new User({ username, email, password: hashedPassword });
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result}, jwtkey, {expiresIn:"2h"}, (err, token) => {
        if(err){
            res.send({result:"jwt failed"})
        }
        res.send({result,auth:token})
    })
  } catch (e) {
    console.log(e);
  }
});

 

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id:user._id }, jwtkey, { expiresIn: "2h" });
         
        res.cookie("jwt", token,{
          httpOnly: true,
           
          maxAge: 2 * 60 * 60 * 1000, // 2 hours
        })
        
         return res
         .status(200)
         .json({massage:"logged in ",user:user,token})
        
         
      } else {
        res.send({ result: "invalid password" });
      }
    } else {
      res.send({ result: "no user exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "server error" });
  }
});

// to save users and developer's projetcs
app.post("/save",verifyToken,async(req,res)=>{
  const { name, html, css, js } = req.body;
  const userID=req.id
  const user = await User.findOne({ _id :userID});
  try{
    if(user.role===0){
      const projectIndex = user.projects.findIndex(proj => proj.name === name);
          if (projectIndex === -1) { 
            // project doesn't exist yet
            const project = { name, html, css, js };
            user.projects.push(project);
          } else {
             // project already exists, so update it
            user.projects[projectIndex].html = html;
            user.projects[projectIndex].css = css;
            user.projects[projectIndex].js = js;
          }
          await user.save();
           res.status(200).json({ message: 'Project saved successfully' });

    }else if(user.role===1){
      let project = await DeveloperProjects.findOne({ name });
      if (project) {
        project.html = html;
        project.css = css;
        project.js = js;
      }else {
        project = new DeveloperProjects({ name, html, css, js });
      }
      await project.save();
     res.status(200).json({ message: 'Project saved successfully' });
    }
}catch(error){
    console.log(error)
  }

})



app.get('/developersprojects',verifyToken, async (req, res) => {
  try {
    const projects = await DeveloperProjects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// to fetch projects
app.get('/projects',verifyToken, async (req, res) => {
  try {
    const userId =  req.id
    const user = await User.findOne({ _id:userId });
   
    
    if (!user) {
      return res.status(404).send('User not found');
      
    }
    res.send(user.projects);
    // console.log(user.projects)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// to fetch all projects
app.get('/allprojects',verifyToken, async (req, res) => {
  try {
    
    
    const projects = await DeveloperProjects.find();
    
    if (!projects) {
      return res.status(404).send('no projects found');
      
    }
    res.send(projects);
    // console.log(user.projects)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//************************************************************** */
app.get('/fiddles/:id', verifyToken, async (req, res) => {
  try {
    const userId =  req.id
    const user = await User.findOne({ _id:userId });
    if(user.role===0){
    const projects=await user.projects
    const allprojects = await DeveloperProjects.find();

    const responseData = {
      projects: projects,
      allprojects: allprojects
    };

    res.send(responseData)
     
     
    }else if(user.role===1){
      const allprojects = await DeveloperProjects.find();
      const projects=await user.projects
      const responseData = {
        projects: projects,
        allprojects: allprojects
      };
      console.log(projects)
      res.send(responseData)

    }
    
    
 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 
 

app.delete('/projects/:id', verifyToken, async (req, res) => {
  try {
    const userId =  req.id
    const projectId = req.params.id;
    const user = await User.findOne({ _id:userId });
    if(user.role===0){
    const user = await User.findByIdAndUpdate(userId, { $pull: { projects: { _id: projectId } } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("deleted")
    res.send(user) 
  }else if(user.role===1){
    const user = await DeveloperProjects.findByIdAndDelete(projectId);
    res.send(user)
  }
 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// is admin api is to check that who have logged in is admin or not
const isAdmin = async (req, res, next) => {
  try {
    const userId =  req.id
    const user = await User.findOne({ _id:userId });
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};


// to check that user is logged in or not
app.get("/verifyuser",verifyToken,(req,res)=>{
  res.json({ message: 'This is a protected endpoint.' });
}) 
// // to check that Admin is logged in or not
app.get("/verifyadmin",verifyToken,isAdmin,(req,res)=>{
  res.json({ message: 'This is a protected endpoint.' });
}) 

function verifyToken(req, res, next) {
  const cookies = req.headers.cookie;
 
  if (!cookies) {
    return res.status(401).json({ message: "No cookie found" });
  }
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

jwt.verify(String(token),jwtkey,(err,user)=>{
  if(err){
    return res.json({massage:"invalid token"})
  }
   
  req.id=user.id
})
next()
  
   
}




app.listen(PORT, (req, res) => {
  console.log(` Started at PORT ${PORT}`);
});
