const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/young-man-face-avater-vector-illustration-design_968209-13.jpg?ga=GA1.1.1408379961.1714224392&semt=ais_hybrid"
    }

},{timestamps:true});

module.exports = mongoose.model("User",UserSchema)