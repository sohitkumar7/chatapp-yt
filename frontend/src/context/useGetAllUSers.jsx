import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"

function useGetAllUSers() {
  
    const [allUsers,setAllUsers] = useState([])
    const [loading,setloading] = useState(false)
    
    useEffect(()=>{
        setloading(true);
        const getUsers=async()=>{
            try {
                const token = Cookies.get("jwt")
                const response = await axios.get("/api/user/allusers",{
                    withCredentials: true, 
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                setAllUsers(response.data);
                setloading(false);

            } catch (error) {
                console.log("Error in useGetAllUser")
            }
        }
        getUsers()
    },[])
    return [allUsers,loading]
}
export default useGetAllUSers;