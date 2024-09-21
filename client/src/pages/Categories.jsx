import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="w-full min-h-[90vh]   pt-20 lg:pt-24">
        <h1 className="text-3xl text-black text-center">All Categories</h1>
        <div className="flex flex-col lg:flex-col gap-5  lg:justify-center  ">
          {categories?.map((c) => (
            <div
              className="pt-5 px-5 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-6"
              key={c._id}
            >
              <Link
                to={`/category/${c.slug}`}
                className="px-5 py-2  text-sm bg-black rounded text-white hover:bg-gray-100 hover:text-gray-900"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
