import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";


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

server.listen(port, () => {
    console.log(`Example app listening at port ${port}`); 
})


