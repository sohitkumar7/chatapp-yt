import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
    const [authUser,setAuthUser] = useAuth();

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm the password
  const password = watch("password", "");
//   const confirmpassword = watch("confirmpassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Password do not Match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    // console.log(userInfo);

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("SignUp Successfull");
        }
        localStorage.setItem("ChatApp",JSON.stringify(response.data))
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error : "+error.response.data.error)   
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
          <h2 className="text-xl text-white font-bold">Signup</h2>
          <br />

          {/* Fullname*/}
          <label className="input validator flex flex-col">
            <input
              type="input"
              {...register("fullname", { required: true })}
              required
              placeholder="fullname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
          {errors.fullname && <span>This field is required</span>}
          <br />

          {/* Email*/}
          <label className="input validator flex flex-col gap-2">
            <input
              type="email"
              placeholder="E-mail"
              {...register("email", { required: true })}
              required
            />
          </label>
          {errors.email && <span>This field is required</span>}
          <br />

          {/* Password*/}
          <label className="input validator flex flex-col">
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

          {/*confirm password*/}
          <label className="input validator flex flex-col">
            <input
              type="password"
              required
              placeholder="confirm Password"
              {...register("confirmpassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          {errors.confirmpassword && (
            <span>{errors.confirmpassword.message}</span>
          )}
          <br />

          {/*text and button*/}
          <div className="flex justify-between">
            <p>
              Have an account?{" "}
              <Link to = "/login" className=" ml-2 text-blue-500 underline cursor-pointer">
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className=" text-white  bg-green-500 px-2 py-1 rounded-2xl cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
