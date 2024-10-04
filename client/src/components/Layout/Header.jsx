import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSearch } from "../../context/search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategories, setIsCategories] = useState(false);
  const [auth, setAuth] = useAuth();

  const categories = useCategory();
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategories = () => {
    setIsCategories(!isCategories);
  };

  return (
    <nav className="navbar top-0 fixed w-full border-b border-gray-200 z-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-16 lg:h-[10vh]">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-black tracking-wide">
              🛍️ Ecommerce App
            </Link>
          </div>

          {/* Search Box with Button (Hidden on Mobile) */}
          <div className="hidden md:flex items-center">
            <form className="flex space-x-2" onSubmit={handleSearch}>
              <input
                type="text"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Search..."
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              <button
                type="submit"
                className="px-7 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Search
              </button>
            </form>
          </div>

          {/* Hamburger Menu */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-black "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <IoClose className="text-3xl" />
              ) : (
                <TiThMenu className="text-3xl" />
              )}
            </button>
          </div>

          {/* Navigation Links (Hidden on Mobile) */}
          <div className="hidden  md:flex space-x-4 items-center relative">
            <NavLink to="/" className="text-black hover:text-blue-500">
              Home
            </NavLink>

            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={toggleCategories}
                  className="inline-flex text-black justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none"
                >
                  Categories
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isCategories && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/categories"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                    >
                      All Categories
                    </Link>

                    {categories?.map((c) => (
                      <Link
                        key={c._id}
                        to={`/category/${c.slug}`}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!auth.user ? (
              <>
                <NavLink
                  to="/register"
                  className="text-black bg-red-500 px-4 rounded py-2 hover:text-blue-500"
                >
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  className="text-black bg-red-500 px-4 py-2 rounded hover:text-blue-500"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      {auth?.user?.name}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Log Out
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Replace with dynamic cart count if available */}
            <Badge count={cart.length} showZero offset={[10, 10]} size="medium">
              <NavLink
                to="/cart"
                className="block px-2 ml-1 lg:ml-0 mb-4 lg:mb-0 text-base rounded font-medium  text-black hover:text-blue-500"
              >
                Cart
              </NavLink>
            </Badge>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#ffe4c4]">
          <div className="px-2 pt-2 pb-3 flex flex-col space-y-3">
            <NavLink
              to="/"
              className=" px-3 py-2 text-base font-medium text-black hover:text-blue-500"
            >
              Home
            </NavLink>

            <div className="relative  text-left">
              <div>
                <button
                  onClick={toggleCategories}
                  className="inline-flex text-left text-black justify-center w-32 lg:w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none"
                >
                  Categories
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isCategories && (
                <div className="origin-top-right absolute left-0 mt-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/categories"
                      className="block px-3 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                    >
                      All Categories
                    </Link>

                    {categories?.map((c) => (
                      <Link
                        key={c._id}
                        to={`/category/${c.slug}`}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!auth.user ? (
              <>
                <NavLink
                  to="/register"
                  className="block w-32 rounded-md px-3 py-2 bg-red-500 text-base font-medium text-black hover:text-blue-500"
                >
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  className="block w-32 rounded-md px-3 py-2 bg-red-500 text-base font-medium text-black hover:text-blue-500"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <div className="relative block text-left">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="flex start text-left text-black max-w-xs lg:w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      {auth?.user?.name}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="origin-top-right absolute left-0 lg:right-0 mt-2 w-32 lg:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Log Out
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            <Badge count={cart.length} showZero offset={[10, 10]} size="medium">
              <NavLink
                to="/cart"
                className="px-2 ml-1 lg:ml-0 mb-4 lg:mb-0 text-base rounded font-base  text-black hover:text-blue-500"
              >
                Cart
              </NavLink>
            </Badge>

            {/* Search Box with Button in Mobile */}
            <form className="flex space-x-2 " onSubmit={handleSearch}>
              <input
                type="text"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Search..."
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
