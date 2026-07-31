import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { stripePaymentConfirmation } from '../store/actions';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import Skeleton from '../Components/shared/Skeleton';

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

        } else {
          setLoading(false)
        }
    },[paymentIntent,clientSecret,redirectStatus,cart, selectedUserCheckoutAddress, dispatch])


  return (
    <div className="payment-confirmation-shell">
      <div className="payment-confirmation-card">
        {loading ? (
          <div className="payment-confirmation-loading">
            <Skeleton variant="form" items={1} className="w-full" />
          </div>
        ): (
          <>
            <div className="payment-confirmation-icon">
              <FaCheckCircle size={72}/>
            </div>
            <h2>Payment Confirmed</h2>
            <p>Thank you for your purchase. Your payment was successful.</p>
            {errorMessage ? (
              <div className="checkout-alert-box payment-confirmation-alert">
                {errorMessage}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentConfirmation