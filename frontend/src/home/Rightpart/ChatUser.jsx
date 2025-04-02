import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function ChatUser() {
  const { selectedconversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) =>
    onlineUsers.includes(userId) ? "avatar-online" : "avatar-offline";

  return (
    <div  className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="h-[8vh] hover:bg-gray-700 duration-300 bg-gray-800 flex items-center justify-center px-4">
        <div
          className={`avatar ${getOnlineUsersStatus(selectedconversation._id)}`}
        >
          <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-xl">{selectedconversation.fullname}</h1>
          <span className="text-sm capitalize">
            {getOnlineUsersStatus(selectedconversation._id).split("-")[1]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
