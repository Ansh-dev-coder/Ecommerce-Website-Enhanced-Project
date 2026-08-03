import React from "react";
import { formatRevenue } from "../../../utils/FormatPrice";

const DashboardOverview = ({
  title,
  amount,
  icon,
  revenue = false,
}) => {
  const convertedAmount = revenue
    ? Number(amount).toFixed(2)
    : amount;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
          {icon}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-slate-800">
        {revenue && "$"}
        {revenue ? formatRevenue(convertedAmount) : convertedAmount}
      </h1>
    </div>
  );
};

export default DashboardOverview;