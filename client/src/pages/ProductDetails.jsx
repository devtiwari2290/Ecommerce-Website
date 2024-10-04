import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // TODO: get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //   initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //   get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh]  pt-24 lg:pt-28">
        <div className="flex flex-col  gap-10 lg:gap-5 lg:flex-row lg:justify-center">
          <div className="w-[7  0%] h-[40vh]  mx-auto lg:w-[25%]  lg:h-[44vh]">
            <img
              className="w-full h-full object-center"
              src={`http://localhost:3000/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>

          <div className="w-full mx-auto  lg:mx-0 lg:w-[40%] lg:h-[44vh]">
            <h2 className="text-xl text-black px-28 lg:px-10  lg:text-3xl">
              Product Details
            </h2>
            <div className="pt-2  px-20 lg:px-3 text-black ">
              <h4 className="pb-1 ">
                <span className="font-bold text-base">Name:</span>{" "}
                {product.name}
              </h4>
              <h4 className="pb-1">
                <span className="font-bold text-base">Description: </span>{" "}
                {product.description}
              </h4>
              <h4 className="pb-1">
                <span className="font-bold text-base">Price: </span>
                {product.price}
              </h4>
              <h4 className="pb-1">
                <span className="font-bold text-base">Quantity: </span>{" "}
                {product.quantity}
              </h4>
              <h4 className="pb-1">
                <span className="font-bold text-base">Shipping: </span>{" "}
                {product.shipping}
              </h4>
              <h4>
                <span className="font-bold text-base">Category: </span>{" "}
                {product?.category?.name}
              </h4>

              <button className="btn text-sm mt-1 ms-1 rounded text-white px-5 py-2 bg-black lg:mt-2 lg:text-sm lg:px-5 lg:py-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <hr className=" mt-10  border-1 border-gray-300" />
        <div className="pb-7  mt-10 lg:mt-5">
          <h1 className="text-xl text-center lg:text-3xl lg:pt-5 pt-5">
            Related Products
          </h1>
          {relatedProducts?.length < 1 ? (
            <p className="text-center pt-5">No Products Found</p>
          ) : (
            <p className="text-center">
              Total {relatedProducts?.length} products
            </p>
          )}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {relatedProducts?.map((i, index) => (
              <div
                className="w-[270px] mt-1 mx-auto bg-white rounded-md overflow-hidden lg:w-[300px]"
                key={index}
              >
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

export default ProductDetails;
