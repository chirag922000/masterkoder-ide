const mongoose  = require("mongoose")
const DeveloperProjects =  mongoose.Schema({
    name: { type: String, required: true },
    html: { type: String },
    css: { type: String },
    js: { type: String }
  });
  module.exports = mongoose.model("developerproject" ,DeveloperProjects )