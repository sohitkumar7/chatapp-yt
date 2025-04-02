import jwt from "jsonwebtoken"

const createTokenAndSaveCookie=(userid,res)=>{
    const token = jwt.sign({userid},process.env.JWT_TOKEN,{
        expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict"
    })
}

export default createTokenAndSaveCookie;
