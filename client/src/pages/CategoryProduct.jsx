import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/product/product-category/${slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) getProductsByCategory();
  }, [slug]);
  return (
    <Layout>
      <div className="w-full min-h-[90vh]  text-black  pt-20 lg:pt-24">
        <h4 className="text-2xl text-black text-center">
          Category- {category?.name}
        </h4>
        <h6 className="text-lg text-black text-center">
          {products?.length} Results Found
        </h6>

        <div className="mt-10 lg:mt-14">
          <h1 className="text-3xl text-black text-center">All Products</h1>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products?.map((i, index) => (
              <div
                className="w-[270px] my-3 mx-auto bg-white rounded-md overflow-hidden lg:w-[300px]"
                key={index}
              >
                <div className="w-full h-48" key={index}>
                  <img
                    className="w-full h-full object-cover  "
                    src={`http://localhost:3001/api/v1/product/product-photo/${i._id}`}
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
                  <button
                    className="btn text-sm  ms-6 lg:ms-9  gap-10 rounded text-white px-5 py-2 bg-green-500 lg:mt-2  lg:px-5 lg:py-2"
                    onClick={() => navigate(`/product/${i.slug}`)}
                  >
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

export default CategoryProduct;
