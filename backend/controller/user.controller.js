import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req,res)=>{
    
    try {
        const {fullname,email,password,confirmpassword} = req.body;
        
        if(password !== confirmpassword){
            return res.status(400).json({error:"Password do not match"});
        }
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({error:"User already registered"})
        }

        // hasing the password 
        const hashPassword = await bcrypt.hash(password,10 )

        const newUser = await User({
            fullname,
            email,
            password:hashPassword,
        })
        await newUser.save();

        if(newUser){
            createTokenAndSaveCookie(newUser._id,res)
            res.status(201).json({message:"User created successfully",user:{
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email
            }})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"});
    }
}

export const login = async(req,res) => {
    
    const {email,password} = req.body;
    try {    
        const user = await User.findOne({email});        
        const ismatch = await bcrypt.compare(password,user.password);
   
        if(!user || !ismatch){
            return res.status(400).json({error: "Invalid Credential"});
        }

        createTokenAndSaveCookie(user._id,res);
        res.status(200).json({message: "User login Successfully", user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"});
    }
}

export const logout = async(req,res) => {

    try {
        res.clearCookie("jwt")
        res.status(201).json({message: "User logout successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
}

export const allUsers = async(req,res) => {

    try{
        const loggdInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggdInUser}}).select("-password")
        res.status(201).json(filteredUsers);
    }
    catch(error){
        console.log("Error in allUser controller : " + error)
    }
}