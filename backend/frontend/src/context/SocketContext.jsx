import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider";
import io from "socket.io-client";

const SocketContext = createContext();

// it is a hook
export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [authUser] = useAuth();
    const [onlineUsers,setOnlineUser] = useState([]);

    useEffect(() => {
        if (authUser) {
            const newSocket = io("https://chatapp-yt-emjq.onrender.com", {
                query: {
                    userId: authUser.user._id,
                },
            });
            setSocket(newSocket);
            newSocket.on("getOnlineUsers",(users)=>{
                setOnlineUser(users)
            })

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket,onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
