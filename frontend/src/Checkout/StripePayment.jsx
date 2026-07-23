import React, { useEffect } from 'react'
import { Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'
import { createStripePaymentSecret } from '../store/actions'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const StripePayment = () => {
  const dispatch = useDispatch()

  const { clientSecret } = useSelector((state) => state.auth)
  const { totalPrice } = useSelector((state) => state.carts)
  const { isLoading } = useSelector((state) => state.error)

  useEffect(() => {
    if (!clientSecret) {
      dispatch(createStripePaymentSecret(totalPrice))
    }
  }, [clientSecret, dispatch, totalPrice])

  if (isLoading) {
    return (
      <div className="checkout-card p-6 sm:p-8">
        <Skeleton variant="rectangular" height={180} />
      </div>
    )
  }

  return (
    <div className="checkout-card p-4 sm:p-6">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  )
}

export default StripePayment