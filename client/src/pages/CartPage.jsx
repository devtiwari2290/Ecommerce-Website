import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth(); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price item
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });

      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => alert('Failed to load Razorpay SDK. Please check your connection.');
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

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

  // Handle Razorpay Payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create an order on the backend
      const { data: order } = await axios.post(
        "http://localhost:3001/api/v1/product/razorpay/order",
        { cart } // Send cart details to backend
      );

      // Define Razorpay options
      const options = {
        key:"rzp_test_tNWXa4uuNEOeQc", // Razorpay Key ID from env
        amount: order.amount, 
        currency: order.currency, 
        name: "Your Shop Name",
        description: "Order Payment",
        order_id: order.id, 
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post(
              "http://localhost:3001/api/v1/product/razorpay/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart,
              }
            );

            if (verificationResponse.data.success) {
              // Payment Success
              localStorage.removeItem("cart");
              setCart([]);
              toast.success("Payment Successful!");
              navigate("/dashboard/user/orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
          contact: auth.user.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error initiating payment");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh] pb-10 pt-20 lg:pt-24">
        <h1 className="mb-3 text-3xl text-center text-black ">
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
          <div className="overflow-hidden rounded-md mx-14 lg:mx-0">
            <h1 className="text-xl text-center">Cart Items</h1>

            <div className="flex flex-col lg:gap-3">
              {cart?.map((p) => (
                <div
                  className="w-full flex flex-col lg:flex-row my-8 lg:my-3 rounded-md overflow-hidden lg:w-[500px]"
                  key={p._id}
                >
                  <div className="w-full h-44">
                    <img
                      className="object-cover w-full h-full"
                      src={`http://localhost:3001/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="inline-block w-full h-40 pt-4 pl-16 bg-gray-100 lg:h-44">
                    <h1 className="text-sm font-semibold text-black lg:pb-2 text-nowrap whitespace-nowrap">
                      Name: {p.name}
                    </h1>
                    <p className="text-sm font-semibold text-black">
                      Price: ₹{p.price}
                    </p>
                    <p className="text-sm font-semibold text-black">
                      Quantity: {p.quantity}
                    </p>
                    <button
                      className="px-5 py-2 text-sm text-white bg-red-500 rounded btn ms-0 lg:ms-0 lg:px-5 lg:py-2"
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
            <div className="pt-2 lg:pt-5">
              <p className="tracking-widest">Total | Checkout | Payment</p>
              <hr className="w-[70%] mx-auto  lg:w-full h-[1px] bg-black" />
              <h4 className="pt-5 text-xl">Total: {totalPrice()}</h4>

              <div className="pt-5">
                <p className="tracking-widest">Contact no</p>
                <hr className="w-[70%] mx-auto  lg:w-full h-[1px] bg-black" />
                <h4 className="pt-2 text-xl">{auth?.user?.phone}</h4>
              </div>
              {auth?.user?.address ? (
                <>
                  <div className="pt-5">
                    <p className="tracking-widest">Current Address</p>
                    <hr className="w-[70%] mx-auto lg:w-full h-[1px] bg-black" />
                    <h4 className="pt-2 text-xl">{auth?.user?.address}</h4>
                    <button
                      className="px-5 py-2 mt-4 text-sm text-white bg-green-500 rounded-lg btn lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
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
                      className="px-5 py-2 mt-4 text-sm text-white bg-green-500 rounded-lg btn lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="px-5 py-2 mt-4 text-sm text-white bg-green-500 rounded-lg btn lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
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
              <div className="overflow-hidden mt-7 lg:mt-0">
                {cart?.length > 0 && auth?.user?.address && (
                  <button
                    className="px-5 py-2 mt-4 text-sm text-white bg-blue-500 rounded-lg btn lg:mt-3 lg:text-lg lg:px-5 lg:py-2"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
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
