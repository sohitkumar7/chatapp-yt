import React, { useRef,useEffect } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading.jsx"
import useGetSocketMessage from "../../context/useGetSocketMessages.js";

function Messages() {
  const {loading,messages} = useGetMessage();
  // console.log(messages);
  // console.log("Messages Component Rendered:", messages); 

  useGetSocketMessage();

  const lastMsRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      if(lastMsRef.current){
        lastMsRef.current.scrollIntoView({behavior: "smooth"});
      }
    },100)
  },[messages])

  return (
    <div  className="flex-1 overflow-y-auto" style ={{minHeight:"calc(92vh - 8vh)"}}>
      
      {loading?(<Loading/>):(messages.length> 0 && messages.map((message)=>(
        <div key={message._id} ref={lastMsRef}>
          <Message  message = {message}/>
        </div>
      )))}
      
      {!loading && messages.length===0 && (
        <div>
          <p className="text-center mt-[20%]">Say! Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
