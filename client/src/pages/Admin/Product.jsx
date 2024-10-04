import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  //   get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/get-product"
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh]  w-full bg-black text-black pt-20 lg:pt-24">
        <div className="flex flex-col gap-20 align-center  lg:flex-row lg:justify-between">
          <div className="w-full lg:w-[20%]">
            <AdminMenu />
          </div>
          <div className="w-full mt-7 text-wrap whitespace-nowrap lg:w-[70%]  lg:mt-0">
            <h1 className="text-3xl text-white text-center">
              All Products List
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-3 lg:gap-3  lg:mx-0">
              {products?.map((i, index) => (
                <Link to={`/dashboard/admin/product/${i.slug}`} key={index}>
                  <div className="w-[250px] mx-auto bg-white rounded-md overflow-hidden lg:w-[300px]">
                    <div className="w-full h-44">
                      <img
                        className="w-full h-full object-cover"
                        src={`http://localhost:3000/api/v1/product/product-photo/${i._id}`}
                        alt={i.name}
                      />
                    </div>
                    <div className="w-full p-3 h-28">
                      <h1 className="text-sm font-semibold">Name: {i.name}</h1>
                      <h1 className="text-sm font-semibold">
                        Description: {i.description.slice(0, 50)}
                      </h1>
                      <h1 className="text-sm font-semibold">
                        Price: {i.price}
                      </h1>
                      <h1 className="text-sm font-semibold">
                        Quantity: {i.quantity}
                      </h1>
                      <h1 className="text-sm font-semibold">
                        Category:
                        {i.category?.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
