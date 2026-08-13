import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { columns } from '../../helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';



const OrderTable = ({adminOrders,pagination}) => {
    const navigate=useNavigate();
    const [currentPage,setCurrentPage]=useState(pagination?.pageNumber + 1 || 1)
    const [searchParams]=useSearchParams()
    const params=new URLSearchParams(searchParams)
    const pathname=useLocation().pathname
   
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
    <div>
        <h1>
            All Orders
        </h1>
        <div>
            <DataGrid  
            rows={tableRecords}
            columns={columns}
            paginationMode='server'
            rowCount={pagination?.totalElements || 0}
            initialState={{
                pagination : {
                    paginationModel:{
                        pageSize : pagination?.pageSize || 10,
                        page : currentPage -1
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
            showFirstButton : true,
            showLastButtong : true,
            hideNextButtong : currentPage===pagination?.totalPages,
        }}
            />
        </div>
    </div>
  )
}

export default OrderTable