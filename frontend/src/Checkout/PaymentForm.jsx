import { PaymentElement, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

const PaymentForm = ({clientSecret,totalPrice}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [loading , setLoading]=useState(false);
    const[errorMessage,setErrorMessage]=useState("");

    const handleSubmit=async(e)=>{

    }

    const paymentElementOptions={
        layout : "tabs",
    }

  return (
    <form onSubmit={handleSubmit  }>
        <h2>Payment Information</h2>
        {loading ? (<Skeleton/>)
        :
        (<>
        {clientSecret && <PaymentElement  options={paymentElementOptions} />}
         {errorMessage && (<div>{errorMessage}</div>)}

         <button
         disabled={!stripe || loading}
         >
            {!loading ? `Pay ${Number(totalPrice).toFixed(2)}` : "Processing"}
         </button>
        </>)}
    </form>
  )
}

export default PaymentForm