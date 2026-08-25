import React from "react";
import DashboardOverview from "../../Admin/Dashboard/DashboardOverview";
import { FaBoxOpen, FaChartLine, FaShoppingCart } from "react-icons/fa";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Seller Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your products and seller orders from one focused workspace.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardOverview
          title="My Products"
          amount="--"
          icon={<FaBoxOpen size={22} />}
        />

        <DashboardOverview
          title="Seller Orders"
          amount="--"
          icon={<FaShoppingCart size={22} />}
        />

        <DashboardOverview
          title="Seller Revenue"
          amount="--"
          icon={<FaChartLine size={22} />}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
