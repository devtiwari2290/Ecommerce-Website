import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="w-full min-h-[90vh]  pt-20 lg:pt-28">
        <div className="text-center">
          <h1 className="text-xl text-black lg:text-3xl">Search Results</h1>
          <h6 className="text-base text-black lg:text-xl">
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length}`}
          </h6>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {values?.results.map((i, index) => (
              <div className="w-[270px] my-3 mx-auto bg-white rounded-md overflow-hidden lg:w-[300px]">
                <div className="w-full h-48" key={index}>
                  <img
                    className="w-full h-full object-cover "
                    src={`http://localhost:3000/api/v1/product/product-photo/${i._id}`}
                    alt={i.name}
                  />
                </div>
                <div className="w-full p-3 h-40 bg-gray-100">
                  <h1 className="text-sm text-black font-semibold">
                    Name: {i.name}
                  </h1>
                  <p className="text-sm text-black font-semibold">
                    Description: {i.description.substring(0, 15)}...
                  </p>
                  <p className="text-sm text-black font-semibold">
                    Price: ₹,{i.price}
                  </p>
                  <button className="btn text-sm  ms-6 lg:ms-9  gap-10 rounded text-white px-5 py-2 bg-green-500 lg:mt-2  lg:px-5 lg:py-2">
                    View
                  </button>
                  <button className="btn text-sm mt-1 ms-3 rounded text-white px-5 py-2 bg-black lg:mt-2 lg:text-sm lg:px-5 lg:py-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
