import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function User({ user }) {
  const { selectedconversation, setselectedconversation } = useConversation();
  const isselected = selectedconversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isselected ? "bg-slate-700" : ""
      }`}
      onClick={() => setselectedconversation(user)}
    >
      <div className="hover:bg-slate-700 duration-300 cursor-pointer flex space-x-4 px-8 py-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-16 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>

        <div>
          <h1 className="font-bold">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
