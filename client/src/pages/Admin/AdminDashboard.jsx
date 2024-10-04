import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="min-h-[90vh] bg-black text-black pt-20 lg:pt-24">
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-evenly items-center gap-5 ">
          <div className="lg:w-[20%] w-full">
            <AdminMenu />
          </div>
          <div className="lg:w-[50%] w-[90%] rounded-lg lg:px-5 p-3 bg-slate-200 ">
            <h3 className="text-base lg:text-3xl text-wrap lg:py-2">
              Name : {auth?.user?.name}
            </h3>
            <h3 className="text-base lg:text-3xl  text-wrap lg:py-2">
              Email : {auth?.user?.email}
            </h3>
            <h3 className="text-base lg:text-3xl  text-wrap lg:py-2">
              Contact : {auth?.user?.phone}
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
