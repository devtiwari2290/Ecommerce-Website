import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // form  function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      const { data } = await axios.put(
        "http://localhost:3001/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let updatedUser = JSON.parse(localStorage.getItem("auth"));
        updatedUser.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(updatedUser));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  return (
    <Layout>
      <div className="w-full min-h-[90vh] pb-7 text-black  pt-20 lg:pt-24">
        <div className=" flex flex-col mt-3 lg:mt-5 lg:flex-row  lg:justify-start lg:gap-40">
          <div className=" ml-0 lg:ml-20">
            <UserMenu />
          </div>
          <div className="bg-gray-300 pt-4 p-5 lg:pt-5 w-[300px]  rounded-xl mx-auto h-[66vh] lg:h-[58vh] lg:w-[500px] lg:mx-0 mt-10 lg:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="text-center">
                <h1 className="text-2xl"> User Profile</h1>
              </div>
              <div className="mb-5">
                <input
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  id="name"
                  value={name}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light dark:placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  id="email"
                  value={email}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="name@example.com"
                  disabled
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Enter your address"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
