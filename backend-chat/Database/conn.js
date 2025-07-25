const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chat:3TvojW6tr8ohV4XO@cluster1.qgghybq.mongodb.net/';

mongoose.connect(MONGODB_URI).then((response)=>{
    console.log("MongoDB connected successfully")
 }).catch(err=>{
    console.log(err)
 }); 
