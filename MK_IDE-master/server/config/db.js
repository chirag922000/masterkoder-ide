const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

// const MongoUrl = "mongodb://localhost:27017/login-register"
const MongoUrl="mongodb+srv://MasterKoder:MasterKoder2023@masterkoder2023.guuzkdc.mongodb.net/?retryWrites=true&w=majority"
// mongodb+srv://chirag:Chirag@4689@cluster0.rrneh.mongodb.net/?retryWrites=true&w=majority

const InitiateMongoServer = async ()=>{
    try{
        await mongoose.connect(MongoUrl,{
            useNewUrlParser:true
        });
        console.log("connected to db")
    }
    catch(e){
        console.log(e)
        throw e
    }
}

module.exports = InitiateMongoServer