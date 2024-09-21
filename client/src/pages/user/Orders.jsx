import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout>
      <div className="w-full min-h-[90vh]  text-black  pt-20 lg:pt-24">
        <div className="flex  align-center gap-20 ">
          <div className="flex flex-col ">
            <UserMenu />
          </div>
          <div className="flex flex-row text-wrap whitespace-nowrap ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
              <h2 className="text-base lg:text-3xl">All Orders</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
