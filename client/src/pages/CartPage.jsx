import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth(); // No need to set auth if you are only using it
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Total price item
  const totalPrice = () => {
    try {
      let total = 0; // Change to let to allow updates
      cart?.forEach((item) => {
        total += item.price * item.quantity; // Multiply by quantity to get the correct total
      });

      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index > -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get PaymentGateway Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfull");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh] pb-10 pt-20 lg:pt-24">
        <h1 className="text-3xl text-center text-black mb-3 ">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>

        <h4 className="text-lg text-center text-black">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart is Empty"}
        </h4>
        <div className="flex flex-col mt-12 lg:flex-row lg:justify-between lg:px-40">
          <div className="rounded-md overflow-hidden mx-14 lg:mx-0">
            <h1 className="text-center text-xl">Cart Items</h1>

            <div className="flex flex-col lg:gap-3">
              {cart?.map((p) => (
                <div
                  className="w-full flex flex-col lg:flex-row my-8 lg:my-3 rounded-md overflow-hidden lg:w-[500px]"
                  key={p._id}
                >
                  <div className="w-full h-44">
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="w-full inline-block pl-16 pt-4 h-40 lg:h-44 bg-gray-100">
                    <h1 className="text-sm text-black lg:pb-2 text-nowrap whitespace-nowrap font-semibold">
                      Name: {p.name}
                    </h1>
                    <p className="text-sm text-black font-semibold">
                      Price: ₹{p.price}
                    </p>
                    <p className="text-sm text-black font-semibold">
                      Quantity: {p.quantity}
                    </p>
                    <button
                      className="btn text-sm ms-0 lg:ms-0 rounded text-white px-5 py-2 bg-red-500 lg:px-5 lg:py-2"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-[300px] mx-auto lg:mx-0  mt-10 lg:mt-0 text-center">
            <h2 className="text-xl">Cart Summary</h2>
            <div className=" pt-2 lg:pt-5">
              <p className="tracking-widest">Total | Checkout | Payment</p>
              <hr className="w-[70%] mx-auto  lg:w-full h-[1px] bg-black" />
              <h4 className="text-xl pt-5">Total: {totalPrice()}</h4>

              <div className="pt-5">
                <p className="tracking-widest">Contact no</p>
                <hr className="w-[70%] mx-auto  lg:w-full h-[1px] bg-black" />
                <h4 className="text-xl pt-2">{auth?.user?.phone}</h4>
              </div>
              {auth?.user?.address ? (
                <>
                  <div className="pt-5">
                    <p className="tracking-widest">Current Address</p>
                    <hr className="w-[70%] mx-auto lg:w-full h-[1px] bg-black" />
                    <h4 className="text-xl pt-2">{auth?.user?.address}</h4>
                    <button
                      className="btn text-sm mt-4 rounded-lg text-white px-5 py-2 bg-green-500 lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-5">
                  {auth?.token ? (
                    <button
                      className="btn text-sm mt-4 rounded-lg text-white px-5 py-2 bg-green-500 lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn text-sm mt-4 rounded-lg text-white px-5 py-2 bg-green-500 lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-7 lg:mt-0 overflow-hidden">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setData(instance)}
                    />
                    <button
                      className="btn text-sm mt-4 rounded-lg text-white px-5 py-2 bg-blue-500 lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                      onClick={handlePayment}
                      disabled={!loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
