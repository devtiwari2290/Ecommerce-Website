import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // get all categories

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get  products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/product-list/${page}`
      );
      if (data?.success) {
        setLoading(false);
        setProducts(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  //  get TotalCount
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/filter-product",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in filtering products");
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh] pb-5 text-black pt-20  lg:pt-28">
        <div className="flex flex-col align-center gap-10 lg:gap-20 lg:flex-row lg:justify-between">
          <div className="flex flex-col  w-full min-h-[30vh]  lg:w-[25%]  lg:min-h-[90vh] ">
            {/* Category filter */}
            <h1 className="text-xl text-center text-nowrap whitespace-nowrap pt-5 lg:pt-7 lg:text-3xl">
              Filter By Category
            </h1>
            <div className=" grid grid-cols-1  lg:mt-0  mx-28 lg:grid-cols-2 lg:mx-5">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price filter */}
            <h1 className="text-xl text-center text-nowrap whitespace-nowrap pt-10 lg:pt-12 lg:text-3xl">
              Filter By Price
            </h1>
            <div className=" grid grid-cols-1  lg:mt-0  mx-28 lg:grid-cols-2 lg:mx-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className=" grid grid-cols-1  lg:mt-0  mx-28 lg:grid-cols-2 lg:mx-5">
              <button
                className="btn text-sm text-wrap whitespace-nowrap ms-2 lg:ms-5 mt-5 gap-10 rounded text-white px-5 py-2 bg-red-500 lg:mt-4  lg:px-5 lg:py-2"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="w-full mx-auto text-wrap whitespace-nowrap  lg:w-[70%] lg:min-h-[90vh]">
            <h1 className="text-xl text-center lg:text-3xl lg:pt-0 pt-5">
              All Products
            </h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products?.map((i, index) => (
                <div
                  className="w-[270px] my-3 mx-auto bg-white rounded-md overflow-hidden lg:w-[300px]"
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
                    <button
                      className="btn text-sm mt-1 ms-3 rounded text-white px-5 py-2 bg-black lg:mt-2 lg:text-sm lg:px-5 lg:py-2"
                      onClick={() => {
                        setCart([...cart, i]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, i])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-5">
              {products && products.length < total && (
                <button
                  className="btn text-sm text-wrap whitespace-nowrap ms-2 lg:ms-5 mt-5 gap-10 rounded text-white px-5 py-2 bg-black lg:mt-4  lg:px-5 lg:py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
