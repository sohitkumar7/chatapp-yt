import Conversation from "../models/Conversation.model.js"
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";


export const sendMessage=async(req,res)=>{
    
    // console.log("message Send",req.params.id,req.body.message)

    try {
        
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;       // current logged in user

        let conversation = await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        }) 

        if(!conversation){
            conversation = await Conversation.create({
                members:[senderId,receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save();            ......phala ya save hoga fir badma nicha wala
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()]); // run parallel ek sath dono save ho jayga
        
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json({
            message: "Message sent successfully",
            newMessage
        })

    } catch (error) {
        console.log("Error in Sendmessage",error)
        res.status(500).json({error: "Internal Server Error"})
    }

}   


export const getMessage = async(req,res) => {
    try {
        
        const {id:chatUser} = req.params;
        const senderId = req.user._id;       // current logged in user

        let conversation = await Conversation.findOne({
            members:{$all:[senderId,chatUser]}
        }).populate("messages")

        if(!conversation){
            return res.status(201).json([])
        }

        const messages = conversation.messages
        res.status(201).json(messages)

    } catch (error) {
        console.log("Error in getmessage",error)
        res.status(500).json({error: "Internal Server Error"}) 
    }
}