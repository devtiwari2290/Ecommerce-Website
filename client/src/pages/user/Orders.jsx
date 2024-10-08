import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/orders/get"
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="w-full min-h-[90vh] text-black pt-20 pb-10 lg:pt-28">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-between gap-20 lg:gap-40">
          <div className="flex flex-col">
            <UserMenu />
          </div>
          <div className="w-full">
            <h2 className="text-base text-center lg:text-3xl">All Orders</h2>
            {orders.map((order, i) => {
              return (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full mt-5">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Buyer</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Payment</th>
                        <th className="px-4 py-2 border">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={order.id}>
                        <td className="px-4 py-2 border">{i + 1}</td>
                        <td className="px-4 py-2 border">{order?.status}</td>
                        <td className="px-4 py-2 border">
                          {order?.buyer?.name}
                        </td>
                        <td className="px-4 py-2 border">
                          {moment(order?.createdAt).fromNow()}
                        </td>
                        <td className="px-4 py-2 border">
                          {order.payment.success ? "₹Success" : "Failed"}
                        </td>
                        <td className="px-4 py-2 border">
                          {order?.products?.length}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className=" flex flex-col lg:gap-3">
                    {order?.products?.map((p) => (
                      <div
                        className="w-[300px] mx-auto flex flex-col lg:flex-row my-8 lg:my-3 rounded-md overflow-hidden lg:w-[500px]"
                        key={p._id}
                      >
                        <div className="w-full h-52 lg:h-44">
                          <img
                            className="object-cover w-full h-full"
                            src={`http://localhost:3000/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                          />
                        </div>
                        <div className="inline-block w-full h-28 pt-4 lg:pt-10 pl-16 bg-gray-100 lg:h-44">
                          <h1 className="text-sm font-semibold text-black lg:pb-2 text-nowrap whitespace-nowrap">
                            Name: {p.name}
                          </h1>
                          <p className="text-sm font-semibold text-black">
                            Price: ₹{p.price}
                          </p>
                          <p className="text-sm font-semibold text-black">
                            Quantity: {p.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
