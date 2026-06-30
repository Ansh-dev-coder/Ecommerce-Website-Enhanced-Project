import { useSelector } from 'react-redux'

const Orders = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">My Orders</h1>
        <p className="text-slate-600 mb-6">
          Orders for <span className="font-semibold text-slate-900">{user?.username || user?.userName || 'your account'}</span> will appear here.
        </p>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-slate-500 text-center">
          No orders found yet. Browse products and place your first order.
        </div>
      </div>
    </div>
  )
}

export default Orders
