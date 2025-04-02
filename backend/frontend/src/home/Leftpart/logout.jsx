import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

function Logout() {

  const [loading,setloading] = useState(false);

  const handlelogout = async()=>{
    setloading(true);
    try {
      const res = await axios.post("/api/user/logout")
      localStorage.removeItem("ChatApp")
      Cookies.remove("jwt")
      setloading(false);
      toast.success("Logged Out  Successfully")
      window.location.reload();
    } catch (error) {
      toast.error("ERROR: error in logout")
      console.log("ERROR: error in logout",error)
    }
  } 
  return (
    <div className="h-[10vh] ">
      <div>
        <BiLogOutCircle className="text-5xl text-white p-2 ml-2 mt-2 hover:bg-slate-700 rounded-full duration-300 cursor-pointer" onClick={handlelogout} />
      </div>
    </div>
  );
}

export default Logout;
