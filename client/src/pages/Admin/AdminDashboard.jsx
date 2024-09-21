import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="min-h-[88vh] bg-black text-black pt-20 lg:pt-24">
        <div className="flex flex-col  align-center gap-5 ">
          <div className="flex flex-col ">
            <AdminMenu />
          </div>
          <div className="flex flex-col text-wrap whitespace-nowrap lg:w-[50%]">
            <div className="w-full p-3 bg-slate-200 ">
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
      </div>
    </Layout>
  );
};

export default AdminDashboard;
