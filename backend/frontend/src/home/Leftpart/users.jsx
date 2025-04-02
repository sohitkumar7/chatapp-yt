import React from "react";
import User from "./User";
import useGetAllUSers from "../../context/useGetAllUSers";


function Users() {

  const [allUsers,loading] = useGetAllUSers();
  // console.log(allUsers);

  return (
    <div>
      <h1 className="px-8 py-2 text-white bg-slate-800 rounded-md"> Message</h1>
      
      <div className=" py-2 no-scrollbar overflow-y-auto" style={{maxHeight:"calc(84vh - 10vh)"}}>
      {allUsers.map((user,index)=>(
        <User key={index} user = {user} />
      ))}  
      </div>
    </div>
  );
}

export default Users;
