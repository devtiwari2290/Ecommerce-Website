import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd"; // Correct import
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

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
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/product");
        setPhoto("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setCategory("");
        setImagesPreview([]);
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };
  return (
    <Layout>
      <div className="w-full  bg-black   min-h-[90vh] text-black  pt-20 lg:pt-28 ">
        <div className="flex flex-col align-center gap-20 lg:flex-row lg:justify-between">
          <div className="w-full lg:w-[20%]">
            <AdminMenu />
          </div>
          <div className=" w-full lg:pt-2 text-wrap whitespace-nowrap  lg:w-[70%]">
            <div className="flex flex-col pl-5 lg:pl-10 ">
              <h2 className="text-base text-white text-lg lg:text-3xl">
                Create Product
              </h2>
              <div className="pt-2 pb-4 ">
                <Select
                  bordered={false}
                  placeholder="Select Category"
                  size="large"
                  showSearch
                  className="form-select mb-3 bg-white text-lg text-black rounded-lg w-[70%] lg:w-[60%]"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="cursor-pointer bg-white px-5 lg:px-20 py-2 text-black text-sm lg:text-lg  rounded object-cover">
                    {photo ? photo.name : "Upload Image"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className=" rounded object-cover"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="m">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img  w-[40%] h-[30vh] lg:w-[20%] lg:h-[30vh] mt-10"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-[70%] lg:w-[60%] text-lg text-black border border-gray-300 p-2 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    type="text"
                    cols={"30"}
                    rows={"2"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-[70%] lg:w-[60%] text-lg text-black border border-gray-300 p-1 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-[70%] lg:w-[60%] text-lg text-black border border-gray-300 p-2 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="w-[70%] lg:w-[60%] text-lg text-black border border-gray-300 p-2 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select mb-1 bg-white text-lg text-black rounded-lg w-[70%] lg:w-[60%]"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                <div className="mb-1 text-nowrap	">
                  <button
                    className="w-[42%]  text-white	  font-semibold lg:w-[60%] text-lg text-black bg-blue-600  p-2 lg:p-3 rounded-md mx-auto"
                    onClick={handleCreate}
                  >
                    Create Product
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

export default CreateProduct;
