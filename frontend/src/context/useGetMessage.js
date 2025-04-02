import React, { useEffect, useState } from 'react'
import useConversation from "../zustand/useConversation.js"
import axios from"axios";

function useGetMessage() {
    
    const [loading,setloading] = useState(false);
    const {messages,setMessage,selectedconversation}=useConversation();

    useEffect(()=>{
        const getMessages = async()=>{
            setloading(true)
            if (selectedconversation && selectedconversation._id) {
                try {
                    
                    const res = await axios.get(`/api/message/get/${selectedconversation._id}`)
                    setMessage(res.data);
                    setloading(false);
                } catch (error) {
                    console.log("Error in getting messages",error);
                    setloading(false)
                }
            }
        }
        getMessages();
    },[selectedconversation,setMessage])
    return{loading,messages}
}

export default useGetMessage