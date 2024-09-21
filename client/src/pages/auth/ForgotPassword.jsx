import React, { useState } from "react";
import { useRef } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const remail = useRef();
  const rnewpassword = useRef();
  const ranswer = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && newpassword && answer) {
      remail.current.value = "";
      rnewpassword.current.value = "";
      ranswer.current.value = "";
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/forgot-password",
        {
          email,
          newpassword,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res && res.data.message);

        navigate("/login");
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
          <h1 className="text-2xl  pt-28 font-bold  lg:text-4xl text-center lg:pb-4 lg:pt-20">
            Reset Your Password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-300 mt-5 lg:pt-10 p-6  mx-12  rounded-xl  lg:max-w-sm lg:mx-auto text-center"
          >
            <div className="mb-6">
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

            <div className="mb-6">
              <input
                onChange={(e) => setAnswer(e.target.value)}
                ref={ranswer}
                name="answer"
                type="text"
                id="answer"
                value={answer}
                className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="What is your Favourite Movie ?"
                required
              />
            </div>

            <div className="mb-6">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                ref={rnewpassword}
                type="password"
                name="newpassword"
                id="newpassword"
                value={newpassword}
                className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="mb-6">
              <button className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:w-full ">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
