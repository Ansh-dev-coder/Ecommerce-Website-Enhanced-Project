import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import { getOrderColumns } from '../../helper/tableColumn';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({adminOrders,pagination}) => {
    const navigate=useNavigate();
    const [currentPage,setCurrentPage]=useState(pagination?.pageNumber + 1 || 1)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [loader,setLoader]=useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [searchParams]=useSearchParams()
    const params=new URLSearchParams(searchParams)
    const pathname=useLocation().pathname

    const columns = useMemo(() => getOrderColumns((order) => {
      setSelectedOrder(order)
      setIsEditModalOpen(true)
    }), [])
   
    const tableRecords=adminOrders?.map((item)=>{
        return {
            id:item.orderId,
            email : item.email,
            totalAmount : item.totalPrice,
            status : item.orderStatus,
            date : item.date
        }
    })

    const handlePaginationChange =(paginationModel)=>{
      const  page=paginationModel.page + 1
      setCurrentPage(page);
      params.set("page",page.toString())
      navigate(`${pathname}?${params}`)
    }

    return (
      <div className="min-h-screen bg-slate-100 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            All Orders
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all customer orders
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-[600px] w-full">
            <DataGrid
              rows={tableRecords}
              columns={columns}
              paginationMode="server"
              rowCount={pagination?.totalElements || 0}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pagination?.pageSize || 10,
                    page: currentPage - 1
                  }
                }
              }}
              onPaginationModelChange={handlePaginationChange}
              pageSizeOptions={[pagination?.pageSize || 10]}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnResize
              pagination
              paginationOptions={{
                showFirstButton: true,
                showLastButtong: true,
                hideNextButtong: currentPage === pagination?.totalPages,
              }}
            />
          </div>
        </div>

        {selectedOrder && (
          <Modal open={isEditModalOpen} setOpen={setIsEditModalOpen} title="Update Order Status">
            <UpdateOrderForm
              setOpen={setIsEditModalOpen}
              loader={loader}
              setLoader={setLoader}
              selectedId={selectedOrder.id}
              selectedItem={selectedOrder}
            />
          </Modal>
        )}
      </div>
    )
}

export default OrderTable