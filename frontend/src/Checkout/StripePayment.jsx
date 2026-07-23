import React from 'react'
import { Alert,AlertTitle } from '@mui/material'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const stripePromise=loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY)

const StripePayment = () => {

  const {clientSecret}=useSelector((state)=>state.auth)
  const {totalPrice} = useSelector((state)=>state.carts)
  const {isLoading,errorMessage}=((state)=>state.error)
  return (
   <>
    {clientSecret && (
      <Elements stripe={stripePromise} options={{clientSecret}}>

        <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice}/>
      </Elements>
    )}

   </>
  )
}

export default StripePayment