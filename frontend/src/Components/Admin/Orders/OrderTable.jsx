import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { FaEdit } from 'react-icons/fa';


const OrderTable = ({adminOrders,pagination}) => {
    const columns = [
  {
    sortable : false,
    disableColumnMenu : true,
    field : "id",
    headerName : "orderId",
    minWidth : 180,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Order ID</span>
  },
  {
   
    field : "email",
    headerName : "Email",
    minWidth : 180,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Email</span>
   
  },
  {
    sortable:true,
    field : "totalAmount",
    headerName : "Total Amount",
    minWidth : 180,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Total Amount</span>
  },
  {
    sortable:false,
    field : "status",
    headerName : "Status",
    minWidth : 180,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Status</span>
  },
  {
    sortable : false,
    field : "date",
    headerName : "Order Date",
    minWidth : 180,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Order Date</span>
  },
  {
    sortable : false,
    field : "action",
    headerName : "Actiond",
    minWidth : 250,
    headerAlign: "center",
    editable : false,
    headerClassName : "test-black font-semibold border",
    cellClassName : "test-slate-700 font-normal border",
    renderHeader : (params) => <span className='text-center'>Action</span>,
    renderCell : (params)=>{
        return (
            <div className='flex justify-center items-center space-x-2 h-full pt-2'>
                <button className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md' >
                    <FaEdit  />


                </button>
            </div>
        )
    }
  }
];

const tableRecords=adminOrders?.map((item)=>{
    return {
        id:item.orderId,
        email : item.email,
        totalAmount : item.totalPrice,
        status : item.orderStatus,
        date : item.date
    }
})
  return (
    <div>
        <h1>
            All Orders
        </h1>
        <div>
            <DataGrid  
            rows={tableRecords}
            columns={columns}
            initialState={{
                pagination : {
                    paginationModel:{
                        pageSize : 5
                    }
                }
            }}
            />
        </div>
    </div>
  )
}

export default OrderTable