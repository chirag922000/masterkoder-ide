const mongoose  = require("mongoose")
const projectSchema =  mongoose.Schema({
    name: { type: String, required: true },
    html: { type: String },
    css: { type: String },
    js: { type: String },
     
  });



const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    school:{
        type:String,
    },
    std:{
        type:String,
    },
    div:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    role: {
        type: Number,
        default: 0,
        required:true
      },
    projects: [projectSchema]
})


module.exports = mongoose.model("user" , userSchema)

 