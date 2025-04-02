import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessage, selectedconversation } = useConversation();
  
  const sendMessages = async (message) => {
    setloading(true);
    
    try {
      const res = await axios.post(
        `/api/message/send/${selectedconversation._id}`,
        {message}
      );

      console.log("usesendMessage render",res.data.newMessage);
      setMessage([...messages,res.data.newMessage]);

      setloading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setloading(false);
    }
  };
  return{loading,sendMessages}
};

export default useSendMessage;
