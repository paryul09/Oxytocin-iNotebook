const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const MONGODB_URI='mongodb+srv://paryul:paryul@cluster0.2n55t.mongodb.net/test?retryWrites=true&w=majority';

const connectToMongo =  () =>{
    // mongoose.connect(mongoURI,()=>{
    //     console.log("connection sucessfull");
    // })
    mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
      console.log(error);
    console.log("Could not connect to MongoDB server! Shutting down...");
    process.exit(1);
  });

}


module.exports = connectToMongo;