import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';

const Order = () => {
    const adminOrders=[ {
            "orderId": 5,
            "email": "saxenaansh27@gmail.com",
            "orderItemDTO": [],
            "date": "2026-07-30",
            "payment": {
                "paymentId": 34,
                "paymentMethod": "Online",
                "pgPaymentId": "pi_3TylZNC8BvRNHWuV2ki9yyrh",
                "pgStatus": "succeed",
                "pgResponse": "Payment successful",
                "pgName": "Stripe"
            },
            "totalPrice": 4499.0,
            "orderStatus": "Order Accepted",
            "addressId": 7
        },
        {
            "orderId": 1,
            "email": "saxenaansh27@gmail.com",
            "orderItemDTO": [],
            "date": "2026-07-28",
            "payment": {
                "paymentId": 30,
                "paymentMethod": "Online",
                "pgPaymentId": "pi_3Ty3sEC8BvRNHWuV2xPRvoyV",
                "pgStatus": "succeed",
                "pgResponse": "Payment successful",
                "pgName": "Stripe"
            },
            "totalPrice": 102297.0,
            "orderStatus": "Order Accepted",
            "addressId": 10
        },
        {
            "orderId": 4,
            "email": "saxenaansh27@gmail.com",
            "orderItemDTO": [],
            "date": "2026-07-28",
            "payment": {
                "paymentId": 33,
                "paymentMethod": "Online",
                "pgPaymentId": "pi_3Ty3wqC8BvRNHWuV0Sl9M9CW",
                "pgStatus": "succeed",
                "pgResponse": "Payment successful",
                "pgName": "Stripe"
            },
            "totalPrice": 102297.0,
            "orderStatus": "Order Accepted",
            "addressId": 10
        }]
    const pagination={ pageNumber: 0,
    pageSize: 10,
    totalElements: 3,
    totalPages: 1,
    lastPage: true}
    const emptyOrder=!adminOrders || adminOrders?.length===0;
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
        <OrderTable  adminOrders={adminOrders} pagination={pagination} />

    </div>)}
    
    </div>
  )
}

export default Order