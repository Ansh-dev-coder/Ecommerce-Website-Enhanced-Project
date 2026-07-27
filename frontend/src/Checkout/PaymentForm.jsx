import { PaymentElement, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useElements } from '@stripe/react-stripe-js';
import { Skeleton } from '@mui/material';

const PaymentForm = ({ clientSecret, totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return;
        }
        const {error : submitError} = await elements.submit();
        const {error} =await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmPayment : {
                return_url : `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`
            }
        })
        if(error){
            setErrorMessage(error.message)
            return false;
        }
    }

    const paymentElementOptions = {
        layout: "tabs",
    }

    const isLoading = !clientSecret || !stripe || !elements;

    return (
        <form onSubmit={handleSubmit} className="checkout-payment-form">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-900">Payment information</h2>
                <p className="text-sm text-slate-600">Complete the details below to finish your order securely.</p>
            </div>

            {isLoading ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <Skeleton variant="rectangular" height={140} />
                </div>
            ) : (
                <>
                    {clientSecret && (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                            <PaymentElement options={paymentElementOptions} />
                        </div>
                    )}
                    {errorMessage && <div className="checkout-alert-box">{errorMessage}</div>}

                    <button
                        type="submit"
                        disabled={!stripe || isLoading}
                        className="checkout-payment-submit"
                    >
                        {!isLoading ? `Pay ${Number(totalPrice).toFixed(2)}` : "Processing"}
                    </button>
                </>
            )}
        </form>
    )
}

export default PaymentForm