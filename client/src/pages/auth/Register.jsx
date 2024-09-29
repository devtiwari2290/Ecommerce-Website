import React, { useState } from "react";
import { useRef } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const rname = useRef();
  const remail = useRef();
  const rpassword = useRef();
  const rphone = useRef();
  const raddress = useRef();
  const ranswer = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }

      if (name && email && password && phone && address && answer) {
        rname.current.value = "";
        remail.current.value = "";
        rpassword.current.value = "";
        rphone.current.value = "";
        raddress.current.value = "";
        ranswer.current.value = "";
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="w-full min-h-[90vh] pt-16 bg-gray-700 lg:pt-24">
        <h1 className="text-2xl pb-2  font-bold lg:text-4xl text-center lg:pb-5 ">
          Register Page
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 pt-4 p-5 lg:pt-5  rounded-xl mx-12 h-[72vh] lg:h-[62vh] lg:max-w-sm lg:mx-auto lg:p-5 sm:p-2 sm:mx-auto sm:max-w-xs"
        >
          <div className="mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              ref={rname}
              name="name"
              type="text"
              id="name"
              value={name}
              className="shadow-sm bg-gray-50 border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <input
              onChange={(e) => setPhone(e.target.value)}
              ref={rphone}
              type="text"
              id="phone"
              name="phone"
              value={phone}
              className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setAddress(e.target.value)}
              ref={raddress}
              type="text"
              id="address"
              name="address"
              value={address}
              className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-4">
            <input
              onChange={(e) => setAnswer(e.target.value)}
              ref={ranswer}
              type="text"
              id="answer"
              name="answer"
              value={answer}
              className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="What is your Favourite Movie"
              required
            />
          </div>

          <div className="flex items-start mb-3">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                defaultValue
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              I agree with the {""}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
