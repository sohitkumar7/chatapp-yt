import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUSers";
import useConversation from "../../zustand/useConversation.js";
import toast from "react-hot-toast";
function Search() {
  const [search, setsearch] = useState();
  const [allUsers] = useGetAllUsers();
  const { setselectedconversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setselectedconversation(conversation);
      setsearch("");
    } else {
      toast.error("User not Found");
    }
  };

  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="border-[1px] bg-slate-900 rounded-lg p-3 border-gray-900 flex items-center gap-2 w-[80%]">
              <input
                type="search"
                className="grow outline-none bg-transparent "
                placeholder="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </label>
            <button>
              <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
