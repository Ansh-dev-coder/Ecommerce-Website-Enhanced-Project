import React from "react";
import DashboardOverview from "./DashboardOverview";
import {useDispatch,useSelector} from 'react-redux'
import {analyticsAction} from '../../../store/actions'
import ErrorPage from '../../shared/ErrorPage'
import Loader from "../../shared/Loader";
import { useEffect } from "react";
import {
  FaBoxOpen,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";

const Dashboard = () => {

  const dispatch= useDispatch();
  const {isLoading,errorMessaage}=useSelector((state)=>state.error)

  const { analytics:{productCount, totalRevenue, totalOrders} } = useSelector((state)=>state.admin)

  useEffect(()=>{
    dispatch(analyticsAction())
  },[dispatch])

  if(isLoading){
    return <Loader/>
  }
  if(errorMessaage){
    return<ErrorPage message={errorMessaage}/>
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back 👋 Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          icon={<FaBoxOpen size={22} />}
        />

        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          icon={<FaShoppingCart size={22} />}
        />

        <DashboardOverview
          title="Total Revenue"
          amount={totalRevenue}
          icon={<FaDollarSign size={22} />}
          revenue
        />
      </div>

    </div>
  );
};

export default Dashboard;