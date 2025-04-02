import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

const sercureRoute = async(req,res,next)=>{
    try{

        // console.log("Cookies Received:", req.cookies);  // Debug log
        
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "no token,unouthorized denied"})
        }
        // console.log("Token Found:", token);

        const decoded = jwt.verify(token,process.env.JWT_TOKEN)

        if(!decoded){
            return res.status(401).json({error: "Invalid Token"})
        }
        // console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.userid).select("-password");
        if(!user){
            return res.status(401).json({error: "NO USER FOUND"})
        }

        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in secureRoute" + error);
        res.status(500).json({error:"Internal error server"});
    }
}

export default sercureRoute;  