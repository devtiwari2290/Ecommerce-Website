import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [changedStatus, setChangedStatus] = useState(null);
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/product/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/product/order-status/${orderId}`,
        {
          status: value,
        }
      );
      toast.success("Status updated successfully");

      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-[90vh]  text-black  pt-20 lg:pt-28">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-between gap-5 ">
          <div className="w-full lg:w-[20%]">
            <AdminMenu />
          </div>
          <div className="w-full lg:w-[70%]">
            <h2 className="text-base text-center lg:text-3xl">All Orders</h2>
            {orders.map((order, i) => {
              return (
                <div className="overflow-x-auto lg:overflow-x-visible">
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
                        <td className="px-4 py-2 border">
                          <Select
                            bordered={false}
                            onChange={(value) => {
                              handleStatusChange(order?._id, value);
                            }}
                            defaultValue={order?.status}
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
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
                  <div className="lg:mt-2 flex flex-col lg:gap-3">
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

export default AdminOrders;
