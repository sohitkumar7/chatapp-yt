import { Server } from "socket.io";
import http from"http";
import express from "express"

const app = express();

const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        // origin:"https://chatapp-yt-emjq.onrender.com",
        origin:"http://localhost:3001",
        methods:["GET","POST"],
        credentials: true
    }
})

// realtimemessage code goes here
export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId]
}


const users = {} ;

// used to listen event on server side 

io.on("connection",(socket) => {

    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id;
        console.log("Hello",users)
    }

    // used to send the user to all connected users
    io.emit("getOnlineUsers",Object.keys(users));

    // used to listen client side events emitted by server side (server and client) 
    socket.on("disconnect",()=>{
        console.log("a user is disconnected",socket.id);
        delete users[userId];
        io.emit("getOnlineUsers",Object.keys(users));
    })

})


export {app,io,server}