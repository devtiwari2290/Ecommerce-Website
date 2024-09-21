import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div class="w-[250px] mx-auto text-center lg:w-[230px] bg-white p-2 rounded shadow-lg lg:p-6">
      <h2 class="text-xl font-semibold text-wrap   whitespace-nowrap shrink-0 mb-4 text-gray-800 lg:text-2xl">
        User Panel
      </h2>

      <ul class="list-disc list-inside space-y-2 pt-4 text-gray-700  list-none">
        <li class="hover:text-blue-500 pb-5">
          <NavLink to="/dashboard/user/profile">Profile</NavLink>
        </li>

        <li class="hover:text-blue-500 ">
          <NavLink to="/dashboard/user/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
