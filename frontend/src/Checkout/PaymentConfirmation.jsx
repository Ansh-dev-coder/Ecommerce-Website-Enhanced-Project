import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { stripePaymentConfirmation } from '../store/actions';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";

const PaymentConfirmation = () => {

    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const dispatch=useDispatch();
    const [errorMessage,setErrorMessage]=useState("")
    const {cart}=useSelector((state)=>state.carts)
    const [loading,setLoading]=useState(false)

    const paymentIntent=searchParams.get("payment_intent")
    const clientSecret=searchParams.get("payment_intent_client_secret")
    const redirectStatus=searchParams.get("redirect_status") || searchParams.get("redirect_statue")
    const checkoutAddressRaw = localStorage.getItem("CHECKOUT_ADDRESS")
    const selectedUserCheckoutAddress = checkoutAddressRaw ? JSON.parse(checkoutAddressRaw) : null

    useEffect(()=>{
      if(paymentIntent && clientSecret && redirectStatus && cart && cart.length){
          const sendData={
             "addressId": selectedUserCheckoutAddress?.addressId,
    "pgName":"Stripe",
    "pgPaymentId":paymentIntent,
    "pgStatus":"succeed",
    "pgResponseMessage":"Payment successful"
          }

          dispatch(stripePaymentConfirmation(setErrorMessage,setLoading,toast,sendData))

        }
    },[paymentIntent,clientSecret,redirectStatus,cart, selectedUserCheckoutAddress, dispatch])


  return (
    <div>
        {loading ? (
          <div>
            <Skeleton/>
          </div>
        ): (
          <div>
            <div>
              <FaCheckCircle size={64}/>
            </div>
            <h2>Payment Confirmed</h2>
            <p>Thank You for you purchase ! you payemt wass successfull</p>
          </div>
        )}
    </div>
  )
}

export default PaymentConfirmation