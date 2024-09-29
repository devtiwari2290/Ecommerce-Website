import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/v1/product/orders/get");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error); // Log any errors
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="w-full min-h-[90vh] text-black pt-20 lg:pt-24">
        <div className="flex align-center gap-20">
          <div className="flex flex-col">
            <UserMenu />
          </div>
          <div className="flex flex-row text-wrap whitespace-nowrap w-full">
            <div className="w-full">
              <h2 className="text-base lg:text-3xl">All Orders</h2>

              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {orders?.length ? (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
                    >
                      <h3 className="font-semibold text-lg">
                        Order ID: {order._id}
                      </h3>
                      <p>
                        <strong>Buyer:</strong> {order.buyer?.name} ({order.buyer?.email})
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Total Products:</strong> {order.products.length}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <div className="mt-3">
                        <h4 className="font-semibold">Products:</h4>
                        <ul className="list-disc pl-5">
                          {order.products.map((product, index) => (
                            <li key={index} className="text-sm">
                              Product ID: {product._id}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
