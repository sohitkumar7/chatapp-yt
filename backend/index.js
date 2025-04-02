import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
import path from "path";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

try {
   mongoose.connect(MONGODB_URI)
    console.log("connect to mongodb");
} catch (error) {
  console.log("error");  
}

// routes
app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);




// ------------------------code for deployment--------------------//

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();

  app.use(express.static("./frontend/dist"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./frontend/dist","index.html"))
  })
}


server.listen(port, () => {
    console.log(`Example app listening at port ${port}`); 
})


