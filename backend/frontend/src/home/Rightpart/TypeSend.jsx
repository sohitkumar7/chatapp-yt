import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";

function TypeSend() {
  const [message,setMessage] =useState("")
  const {loading,sendMessages} = useSendMessage();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await sendMessages(message);
    // console.log(message);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className=" bg-gray-800 flex space-x-2 h-[8vh] ">
      <div className="w-[70%] mx-4">
        <input  
          value={message} 
          onChange={(e)=> setMessage(e.target.value)} 
          type="text" 
          placeholder="Type here" 
          className=" rounded-xl border border-gray-700 outline-none w-full mt-3 px-4 py-3 " 
        />
      </div>
      <button>
        <IoIosSend  className="text-3xl"/>
      </button>
    </div>
    </form>
  );
}

export default TypeSend;
