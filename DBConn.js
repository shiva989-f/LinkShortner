import mongoose from "mongoose";

const connection = ()=> {
    mongoose.connect("mongodb://localhost:27017/LinkShortner")
    .then(()=> console.log("Connected successfully!"))
    .catch(()=> console.log("Something went wrong, Can't connect to database"))
}

export default connection;