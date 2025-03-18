const message = require('../Models/message');
const UserModel = require('../Models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
    try{
        let {name, mobileNumber,password,profilePic}= req.body;
        const isExist = await UserModel.findOne({mobileNumber});
        if(isExist){
            return res.status(409).json({error:"User with this Mobile no. already registered"});
        }
        let hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const newUser = new UserModel({name,mobileNumber,password:hashedPassword,profilePic});
        await newUser.save()
        res.status(200).json({
            message:"User Registered Successfully",
            newUser,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"server error"})
    }
}
const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax'
};

exports.login = async(req,res) =>{
    try{
      const {mobileNumber, password} = req.body;
      const userExist = await UserModel.findOne({mobileNumber});
      if(userExist && await bcrypt.compare(password,userExist.password)){
      
        const token = jwt.sign({userId:userExist._id}, 'Its_my_secret_key')
        res.cookie("token",token,cookieOptions)
        console.log(token)
        res.status(200).json({
            message:"Login Successfully",
            user:userExist
        })
      }
      else{
    res.status(400).json({error:"Invalid credentials"});
      }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server error"})
    }
}
exports.searchMember = async(req,res)=>{
    try{
        let {queryParam}=req.query;
        const users = await UserModel.find({
            $and:[
                {_id : {$ne:req.user._id}},
                {
                    $or:[
                        {name: { $regex: new RegExp(`^${queryParam}`, 'i')}},
                        {mobileNumber: { $regex: new RegExp(`^${queryParam}`,'i')}}
                    ]
                }
            ]
        })
        return res.status(201).json(users)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server error"})
    }
}
exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}