import React from 'react'
import Sidebar from '../shared/Sidebar'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Select an item from the sidebar to manage products, categories and sellers.</p>
        </div>
      </main>
    </div>
  )
}

export default AdminLayout