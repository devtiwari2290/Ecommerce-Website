import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Policy from "../pages/Policy";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../pages/user/DashBoard";
import PrivateRoutess from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateCategory from "../pages/Admin/CreateCategory";
import CreateProduct from "../pages/Admin/CreateProduct";
import Users from "../pages/Admin/Users";
import Orders from "../pages/user/Orders";
import Profile from "../pages/user/Profile";
import Product from "../pages/Admin/Product";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import Search from "../pages/Search";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import CategoryProduct from "../pages/CategoryProduct";
import CartPage from "../pages/CartPage";

const Routess = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoutess />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Routess;
