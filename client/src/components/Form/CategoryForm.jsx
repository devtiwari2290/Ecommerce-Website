import React, { useState } from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className=" p-5 rounded-xl  text-center">
        <div className="mb-5">
          <input
            onChange={(e) => setValue(e.target.value)}
            name="category"
            type="text"
            id="category"
            value={value}
            className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter new Category"
            required
          />
        </div>
        <div className="mb-2 ">
          <button
            type="submit"
            className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:w-full "
          >
            Sumbit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
