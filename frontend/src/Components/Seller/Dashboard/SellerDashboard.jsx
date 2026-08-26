import React from "react";
import DashboardOverview from "../../Admin/Dashboard/DashboardOverview";
import { FaBoxOpen, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSellerOrders, sellerProductsAction } from "../../../store/actions";
import Loader from "../../shared/Loader";
import ErrorPage from "../../shared/ErrorPage";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { sellerPagination } = useSelector((state) => state.products);
  const { sellerOrders, sellerPagination: sellerOrderPagination } = useSelector((state) => state.order);
  const { isLoading, errorMessage } = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(sellerProductsAction("pageNumber=0&pageSize=10"));
    dispatch(getSellerOrders("pageNumber=0&pageSize=10"));
  }, [dispatch]);

  const sellerRevenue = sellerOrders?.reduce(
    (total, order) => total + Number(order?.totalPrice || 0),
    0
  );

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

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
          amount={sellerPagination?.totalElements ?? 0}
          icon={<FaBoxOpen size={22} />}
        />

        <DashboardOverview
          title="Seller Orders"
          amount={sellerOrderPagination?.totalElements ?? 0}
          icon={<FaShoppingCart size={22} />}
        />

        <DashboardOverview
          title="Seller Revenue"
          amount={sellerRevenue || 0}
          icon={<FaChartLine size={22} />}
          revenue
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
