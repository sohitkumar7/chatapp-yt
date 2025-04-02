import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  
  const [authUser,setAuthUser] = useAuth();
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    // console.log(userInfo);

    await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("SignUp Successfull");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error : " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <div className="flex flex-col space-y-4 h-screen items-center justify-center">
        <form
           onSubmit={handleSubmit(onSubmit)}
          className="border border-white rounded-2xl px-6 py-2 w-90"
        >
          <h1 className=" text-2xl text-center">
            Chat
            <span className="text-green-400 font-semibold pl-2">App</span>
          </h1>

          <h2 className="text-xl text-white font-bold">Login</h2>
          <br />
          {/* Email*/}
          <label className="input validator flex flex-col gap-2">
            <input type="email" placeholder="E-mail" required 
             {...register("email", { required: true })}
             />
          </label>
          {errors.email && <span>This field is required</span>}

          {/* Password*/}
          <label className=" mt-3 input validator flex flex-col">
            <input
              type="password"
              required
              {...register("password", { required: true })}
              placeholder="Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          {errors.password && <span>This field is required</span>}

          <br />
          {/*text and button*/}
          <div className="flex justify-between">
            <p>
              New User?{" "}
              <Link to="/signup" className=" ml-2 text-blue-500 underline cursor-pointer">
                SignUp
              </Link>
            </p>
            <input
              type="submit"
              value="login"
              className=" text-white  bg-green-500 px-2 py-1 rounded-2xl cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
