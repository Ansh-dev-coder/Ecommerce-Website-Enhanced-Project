import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

const PaymentConfirmation = () => {

    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const dispatch=useDispatch();
    const {errorMessage}=useSelector((state)=>state.error)
    const {cart}=useSelector((state)=>state.carts)
    const [loading,setLoading]=useState(false)

    const paymentIntent=searchParams.get("payment_intent")
    const clientSecret=searchParams.get("payment_intent_client_secret")
    const redirectStatus=searchParams.get("redirect_statue")

    useEffect(()=>{
        if(paymentIntent && clientSecret && redirectStatus && cart && cart.length){}
    },[paymentIntent,clientSecret,redirectStatus,cart])


  return (
    <div>PaymentConfirmation</div>
  )
}

export default PaymentConfirmation