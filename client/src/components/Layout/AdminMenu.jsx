import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="max-w-sm mx-20 text-center  rounded-lg border border-gray-200 shadow-md lg:max-w-sm lg:mx-0 lg:text-left">
      <div class=" p-2 rounded shadow-lg lg:p-6">
        <h2 class="text-xl text-black font-semibold text-wrap   whitespace-nowrap shrink-0 mb-4 text-gray-800 lg:text-2xl">
          Admin Panel
        </h2>

        <ul class="text-black list-none ">
          <li class="hover:text-blue-500 pb-2 bg-white mb-4 px-2 py-2 rounded">
            <NavLink to="/dashboard/admin/create-category">
              Create Category
            </NavLink>
          </li>
          <li class="hover:text-blue-500 pb-2 bg-white mb-4 px-2 py-2 rounded">
            <NavLink to="/dashboard/admin/create-product">
              Create Product
            </NavLink>
          </li>

          <li class="hover:text-blue-500 pb-2 bg-white mb-4 px-2 py-2 rounded">
            <NavLink to="/dashboard/admin/product">Products</NavLink>
          </li>
          <li class="hover:text-blue-500  bg-white px-2 py-2 rounded">
            <NavLink to="/dashboard/admin/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
