const message = require('../Models/message');
const UserModel = require('../Models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
    try{
        let {name, mobileNumber,password,profilePic}= req.body;
        
        // Validate required fields
        if (!name || !mobileNumber || !password) {
            return res.status(400).json({error:"All fields are required"});
        }
        
        // Validate mobile number format
        if (!/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({error:"Please enter a valid 10-digit mobile number"});
        }
        
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({error:"Password must be at least 6 characters long"});
        }
        
        const isExist = await UserModel.findOne({mobileNumber});
        if(isExist){
            return res.status(409).json({error:"User with this Mobile no. already registered"});
        }
        
        let hashedPassword = await bcrypt.hash(password,10);
        console.log('Hashed password:', hashedPassword);
        const newUser = new UserModel({name,mobileNumber,password:hashedPassword,profilePic});
        await newUser.save()
        console.log('User saved successfully:', newUser._id);
        res.status(200).json({
            message:"User Registered Successfully",
            newUser,
        })
    }catch(err){
        console.log('Registration error:', err)
        if (err.code === 11000) {
            return res.status(409).json({error:"User with this Mobile no. already registered"});
        }
        res.status(500).json({error:"server error"})
    }
}
const cookieOptions = {
  httpOnly: true,
  secure: true,       // Always true in production (Railway uses HTTPS)
  sameSite: 'None'    // REQUIRED for cross-origin cookies
};
exports.login = async(req,res) =>{
    try{
      const {mobileNumber, password} = req.body;
      const userExist = await UserModel.findOne({mobileNumber});
      if(userExist && await bcrypt.compare(password,userExist.password)){
      
        const token = jwt.sign({userId:userExist._id}, process.env.JWT_SECRET || 'Its_my_secret_key')
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
    try {
        res.clearCookie('token', cookieOptions);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Logout failed' });
    }
}
