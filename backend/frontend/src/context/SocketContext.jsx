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
    // https://chatapp-yt-emjq.onrender.com
    // http://localhost:4001    
    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:4001",{
                query: {
                    userId: authUser.user._id,
                },
                withCredentials:true,
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
