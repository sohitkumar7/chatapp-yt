import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";
import selectedconversation from ".//..//zustand/useConversation.js"

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage,addMessageToCurrentChat} = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      addMessageToCurrentChat(newMessage); 
      // setMessage([...messages, newMessage]);

    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedconversation, addMessageToCurrentChat,messages,setMessage]); // [socket, messages, setMessage]);
  return null;        // ya nhi tha real ma
};
export default useGetSocketMessage;