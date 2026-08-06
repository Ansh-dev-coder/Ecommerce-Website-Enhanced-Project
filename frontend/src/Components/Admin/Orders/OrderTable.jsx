import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { columns } from '../../helper/tableColumn';


const OrderTable = ({adminOrders,pagination}) => {
   
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