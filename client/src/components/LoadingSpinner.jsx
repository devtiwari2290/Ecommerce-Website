// LoadingSpinner.js
import React from "react";
import loader from "../assets/Hourglass.gif";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadingSpinner = ({ path = "login" }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    count === 3 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <div className="flex justify-center items-center w-full min-h-[88vh] text-center">
      <div>
        <img className="w-[100px] mx-auto" src={loader} alt="" />

        <h2 className="text-3xl text-black mt-5">Loading.... {count} sec</h2>
      </div>
    </div>
  );
};

export default LoadingSpinner;
