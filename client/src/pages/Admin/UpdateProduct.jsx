import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd"; // Correct import
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null); // File object
  const [id, setId] = useState("");

  //  get single product
  const getsingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/v1/product/get-product/${params.slug}`
      );
      setName(data?.product?.name);
      setId(data.product._id);
      setDescription(data?.product?.description);
      setCategory(data?.product?.category._id); // Set category ID
      setPrice(data?.product?.price);
      setQuantity(data?.product?.quantity);
      setShipping(data?.product?.shipping ? 1 : 0); // Boolean handling
      setPhoto(null); // Reset photo for update
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product");
    }
  };

  useEffect(() => {
    getsingleProduct();
  }, []);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo); // Append photo if selected
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `http://localhost:3001/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating product");
    }
  };

  //   delete product function

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:3001/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting product");
    }
  };

  return (
    <Layout>
      <div className="w-full bg-black min-h-[90vh] text-black pt-20 lg:pt-28">
        <div className="flex flex-col align-center lg:flex-row lg:justify-between">
          <div className="w-full lg:w-[20%]">
            <AdminMenu />
          </div>
          <div className="w-full mt-12 text-wrap whitespace-nowrap lg:w-[60%] lg:mt-0">
            <h2 className="text-base px-6 text-white text-xl lg:text-3xl">
              Update Product
            </h2>
            <div className="pt-2 pb-4 mx-5 lg:mx-10">
              <Select
                bordered={false}
                placeholder="Select Category"
                size="large"
                showSearch
                className="form-select mb-3 placeholder-black bg-white text-lg text-black rounded-lg w-[70%] lg:w-[70%]"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="cursor-pointer font-normal bg-gray-400 px-5 lg:px-20 py-2 text-black text-sm lg:text-lg rounded">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="rounded"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="img w-[60%] h-[20vh] lg:w-[50%] lg:h-[30vh] mt-10"
                  />
                ) : (
                  <img
                    src={`http://localhost:3001/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    className="img object-cover w-[60%] h-[20vh] lg:w-[50%] lg:h-[30vh] mt-10"
                  />
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-[70%] lg:w-[70%] text-lg text-black border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <textarea
                  cols={"30"}
                  rows={"2"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-[70%] lg:w-[70%] text-lg text-black border border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-[70%] lg:w-[70%] text-lg text-black border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="w-[70%] lg:w-[70%] text-lg text-black border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-1 bg-white text-lg text-black rounded-lg w-[70%] lg:w-[70%]"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"} // Corrected value handling
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="flex flex-row gap-3 lg:gap-10">
                <div className="mb-3 text-nowrap">
                  <button
                    className="w-full text-white text-sm font-sm lg:font-semibold lg:w-full lg:text-lg text-black bg-blue-600 p-2 lg:p-3 rounded-md mx-auto"
                    onClick={handleUpdate}
                  >
                    Update Product
                  </button>
                </div>

                <div className="mb-2 text-nowrap">
                  <button
                    className="w-full text-white text-sm font-sm lg:font-semibold lg:w-full  lg:text-lg text-black bg-red-600 p-2 lg:p-3 rounded-md mx-auto"
                    onClick={handleDelete}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
