const mongoose  = require("mongoose")
const projectSchema =  mongoose.Schema({
    name: { type: String, required: true },
    html: { type: String },
    css: { type: String },
    js: { type: String }
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
    createdAt:{
        type:Date,
        default:Date.now()
    },
    projects: [projectSchema]
})


module.exports = mongoose.model("user" , userSchema)

 