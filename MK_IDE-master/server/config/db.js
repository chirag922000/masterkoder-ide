const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

const MongoUrl = "mongodb://localhost:27017/login-register"


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