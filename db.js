const mongoose = require('mongoose');
function connectDb(){
    mongoose.connect('mongodb://localhost:27017/carsito', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const connection=mongoose.connection
connection.on("connected",()=>{
    console.log("Mongodb Connected")
})
connection.on("error",()=>{
    console.log("mongodb not connected")
})
}
connectDb()
module.exports=mongoose