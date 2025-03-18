const mongoose =require("mongoose");
 mongoose.connect("mongodb://localhost:27017/chatApp").then((response)=>{
    console.log("Mngo db connected succesfully")
 }).catch(err=>{
    console.log(err)
 }); 