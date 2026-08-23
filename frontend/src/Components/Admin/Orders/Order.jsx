import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from '../../../hooks/UseOrderFIlter';
import { getOrdersForDashboards } from '../../../store/actions';

const Order = () => {
    const {adminOrder,pagination}=useSelector((state)=>state.order)
   
useOrderFilter(getOrdersForDashboards)

    const emptyOrder=!adminOrder || adminOrder?.length===0;
  return (
    <div>{emptyOrder ? (
    <div>
        <FaShoppingCart/>
        <h2>
              No Orders Placed Yet
        </h2>
    </div>

    ):
    (<div>
        <OrderTable orders={adminOrder} pagination={pagination} />

    </div>)}
    
    </div>
  )
}

export default Order
