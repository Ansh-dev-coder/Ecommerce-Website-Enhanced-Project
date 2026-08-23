import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getLoggedInUserOrders } from '../store/actions'
import useOrderFilter from '../hooks/UseOrderFIlter'
import OrderTable from './Admin/Orders/OrderTable'
import Loader from './shared/Loader'

const Orders = () => {
  const { personalOrders, personalPagination, personalOrdersLoaded } = useSelector((state) => state.order)

  useOrderFilter(getLoggedInUserOrders)

  const emptyOrders = !personalOrders || personalOrders.length === 0

  if (!personalOrdersLoaded) {
    return <Loader text="Orders Loading" />
  }

  if (emptyOrders) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <FaShoppingCart className="mx-auto mb-4 text-3xl text-slate-400" />
          <h1 className="text-2xl font-bold text-slate-900">No Orders Found</h1>
          <p className="mt-2 text-slate-600">You haven't placed any orders yet.</p>
        </div>
      </div>
    )
  }

  return <OrderTable orders={personalOrders} pagination={personalPagination} personalOrders />
}

export default Orders
