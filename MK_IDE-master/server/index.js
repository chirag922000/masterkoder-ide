const express = require("express");
 
const InitiateMongoServer = require("./config/db");
 const cookieParser =require("cookie-parser")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./modal/User");
const DeveloperProjects=require("./modal/DeveloperProjects")
const Accordion =require("./modal/Accordion")
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
    const { username, email, password,school,std } = req.body;
    const saltRounds = 10; // number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = new User({ username, email, password: hashedPassword ,school,std });
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result}, jwtkey , (err, token) => {
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
  
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id:user._id }, jwtkey );
         
        res.cookie("jwt", token,{
          httpOnly: true,
           
          maxAge: 2 * 60 * 60 * 1000, // 2 hours
        })
        
         return res
         .status(200)
         .json({massage:"logged in ",user:user.role,token})
        
         
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

app.post("/logout", (req, res) => {
  
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({ message: "Logout successful" });
});

// to save users and developer's projetcs
app.post("/save",verifyToken,async(req,res)=>{
  const { name, html, css, js } = req.body;
  const userID=req.id
  const user = await User.findOne({ _id :userID});
  if(name){
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
  }else{
    res.send("project name is not provided")
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

// to get all users data from master Route
app.get('/master/getuserdata',verifyToken, async (req, res) => {
  try {
    
    
    const users = await User.find();
    
    if (!users) {
      return res.status(404).send('no user found');
      
    }
    res.send(users);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
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
// ismaster api is to check that who have logged in is Master or not
const isMaster = async (req, res, next) => {
  try {
    const userId =  req.id
    const user = await User.findOne({ _id:userId });
    if (user.role !== 2) {
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

const isUser = async (req, res, next) => {
  try {
    const userId =  req.id
    const user = await User.findOne({ _id:userId });
    if (user.role !== 0) {
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
app.get("/verifyuser",verifyToken,isUser,(req,res)=>{
  res.json({ message: 'This is a protected endpoint.' });
}) 
// // to check that Admin is logged in or not
app.get("/verifyadmin",verifyToken,isAdmin,(req,res)=>{
  res.json({ message: 'This is a protected endpoint.' });
}) 
// // to check that Admin is logged in or not
app.get("/verifymaster",verifyToken,isMaster,(req,res)=>{
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
    return res.status(401).json({massage:"invalid token"})
  }
   
  req.id=user.id
})
next()
  
   
}

// mongodb aggregate
app.get('/master/users-by-school', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          school: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$school',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          school: '$_id',
          count: 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/users-by-school/:school', async (req, res) => {
  try {
    const { school } = req.params;
     
    await User.deleteMany({ school });
    res.send(`Users of ${school} school have been deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/master/api/users', async (req, res) => {
  try {
    const users = await User.find({ school: { $exists: true } }, { email: 1, school: 1 });
    
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 
app.delete('/master/user/:id', verifyToken, async (req, res) => {
  try {
     const userid=req.params.id
      
    const user = await User.findByIdAndDelete(userid);
    res.send(user)
     
 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Add accordion
app.post("/add-accordion", async (req, res) => {
  try {
    const { title, items } = req.body;
    const accordion = new Accordion({
      title,
      items,
    });
    const savedAccordion = await accordion.save();
    res.status(201).json(savedAccordion);
  } catch (e) {
    console.log(e);
  }
});

// to fetch all accordions
app.get('/get-accordion',verifyToken, async (req, res) => {
  try {
    
    
    const accordions = await Accordion.find();
    
    if (!accordions) {
      return res.status(404).send('no projects found');
      
    }
    
    res.send(accordions);
    // console.log(user.projects)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// to content get data on contentpage
app.get('/learn/:id', verifyToken, async (req, res) => {
  const contentid = req.params.id; 

  try{
    const accordion = await Accordion.findOne({ "items._id": contentid }, { "items.$": 1 });
  
    if (accordion) {
      const content = accordion.items[0].content;
    
      
      res.send(content)
    } else {
      console.log("Matching topic not found!");
    }
  }catch(error){
    console.log(error)
  }
 
 
});



app.listen(PORT, (req, res) => {
  console.log(` Started at PORT ${PORT}`);
});
