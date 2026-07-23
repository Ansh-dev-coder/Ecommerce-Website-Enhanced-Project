import React from 'react'
import { Alert, AlertTitle } from '@mui/material'

const PaypalPayment = () => {
  return (
    <div className="flex min-h-[24rem] items-center justify-center rounded-[32px] border border-amber-200 bg-amber-50/70 p-4 sm:p-6">
      <Alert
        severity="warning"
        variant="filled"
        style={{ maxWidth: '440px', borderRadius: '20px', boxShadow: '0 20px 50px -24px rgba(245, 158, 11, 0.45)' }}
      >
        <AlertTitle>PayPal unavailable</AlertTitle>
        PayPal payment is unavailable right now. Please choose another payment method to continue.
      </Alert>
    </div>
  )
}

export default PaypalPayment