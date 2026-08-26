import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import OrderTable from "../../Admin/Orders/OrderTable";
import useOrderFilter from "../../../hooks/UseOrderFIlter";
import { getSellerOrders, updateSellerOrderStatus } from "../../../store/actions";
import Loader from "../../shared/Loader";

const SellerOrders = () => {
  const { sellerOrders, sellerPagination } = useSelector((state) => state.order);
  const { isLoading, errorMessage } = useSelector((state) => state.error);
  const emptyOrder = !sellerOrders || sellerOrders.length === 0;

  useOrderFilter(getSellerOrders);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {emptyOrder ? (
        <div className="min-h-screen bg-slate-100 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Seller Orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Orders related to your products will appear here.
            </p>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center shadow-sm">
            <FaShoppingCart className="text-4xl text-slate-400" />
            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No seller orders found
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              New orders containing your products will show up in this table.
            </p>
            {errorMessage && (
              <p className="mt-4 max-w-md text-sm font-medium text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      ) : (
        <OrderTable
          orders={sellerOrders}
          pagination={sellerPagination}
          sellerOrders
          updateStatusAction={updateSellerOrderStatus}
        />
      )}
    </div>
  );
};

export default SellerOrders;
