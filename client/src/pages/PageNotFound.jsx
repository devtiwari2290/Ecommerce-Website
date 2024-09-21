import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="w-full min-h-[88vh] pt-20 text-center">
        <h1 className="text-8xl text-black font-bold  text-center pt-20 ">
          404
        </h1>
        <h2 className="text-2xl text-black text-center  lg:text-4xl ">
          Oops! Page Not Found
        </h2>
        <Link to="/">
          <button className="btn text-xl mt-4 rounded-lg text-white px-5 py-2 bg-black lg:mt-3 lg:text-2xl lg:px-5 lg:py-2">
            Back to Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
