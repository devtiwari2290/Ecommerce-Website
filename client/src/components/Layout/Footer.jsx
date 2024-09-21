import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer w-full h-[12vh]  lg:h-[16vh] text-white text-center text-lg lg:text-2xl ">
        <h1 className="pt-2 lg:tracking-widest lg:pt-5 ">
          All Rights Reserved @ 2024
        </h1>
        <div className="flex justify-center text-base items-center gap-3 text-sm font-normal lg:gap-5 lg:text-xl lg:py-0 lg:gap-15 md:gap-7 sm:gap-5 md:py-5 sm:py-3">
          <Link to="/about">About </Link>|
          <Link to="/policy">Privacy Policy</Link>|
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
