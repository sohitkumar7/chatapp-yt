import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import TypeSend from "./TypeSend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/Authprovider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedconversation, setselectedconversation } = useConversation();
  useEffect(() => {
    return setselectedconversation(null);
  }, []);
  return (
    <div className=" w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedconversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser></ChatUser>
            <div
              className="no-scrollbar overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages></Messages>
            </div>
            <TypeSend></TypeSend>
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  // console.log("authuser in nochatselected" ,authUser)
  return (
    <>
      <div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>

        <div className="flex flex-col h-screen items-center justify-center ">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font -semibold text-xl">
              {authUser.user.fullname}
            </span>
          </h1>

          <p>
            No Chat Selected, please start conversation by selecting anyone to
            your contacts
          </p>
        </div>
      </div>
    </>
  );
};
