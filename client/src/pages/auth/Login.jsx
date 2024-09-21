import React, { useState } from "react";
import { useRef } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const remail = useRef();
  const rpassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      remail.current.value = "";
      rpassword.current.value = "";
    }
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className=" w-full h-[88vh]">
          <h1 className="text-2xl pb-2 pt-28 font-bold lg:text-4xl text-center lg:pb-4 lg:pt-20">
            Login Page
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-300 p-5 rounded-xl mx-3 lg:max-w-sm lg:mx-auto text-center"
          >
            <div className="mb-5">
              <input
                onChange={(e) => setEmail(e.target.value)}
                ref={remail}
                name="email"
                type="email"
                id="email"
                value={email}
                className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-5">
              <input
                onChange={(e) => setPassword(e.target.value)}
                ref={rpassword}
                type="password"
                name="password"
                id="password"
                value={password}
                className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-5 ">
              <button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:w-full "
              >
                Login Now
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate("/forgot-password")}
                type="button"
                className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:w-full"
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
