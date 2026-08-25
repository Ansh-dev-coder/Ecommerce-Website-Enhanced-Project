import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import OrderTable from "../../Admin/Orders/OrderTable";

const sellerOrdersPagination = {
  pageNumber: 0,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  lastPage: true,
};

const SellerOrders = () => {
  const sellerOrders = [];

  return (
    <div>
      {sellerOrders.length === 0 ? (
        <div className="min-h-screen bg-slate-100 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Seller Orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Orders for your products will appear here after the seller orders API is available.
            </p>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center shadow-sm">
            <FaShoppingCart className="text-4xl text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No seller orders loaded yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              This frontend view is scoped for seller-owned product orders and is ready for the future backend integration.
            </p>
          </div>
        </div>
      ) : (
        <OrderTable
          orders={sellerOrders}
          pagination={sellerOrdersPagination}
          sellerOrders
        />
      )}
    </div>
  );
};

export default SellerOrders;
