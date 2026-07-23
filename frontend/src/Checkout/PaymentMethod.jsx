import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addPaymentMethod } from '../store/actions'
import { createUserCart } from '../store/actions'

const PaymentMethod = () => {
    const dispatch = useDispatch()

    const { paymentMethod } = useSelector((state) => state.payment)
    const { cart, cartId } = useSelector((state) => state.carts)
    const { errorMessage } = useSelector((state) => state.error)

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }))
            dispatch(createUserCart(sendCartItems))
        }
    }, [dispatch, cartId, cart, errorMessage])

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method))
    }

    const options = [
        {
            value: 'Stripe',
            title: 'Stripe',
            description: 'Pay safely with your card and complete the order instantly.',
        },
        {
            value: 'Paypal',
            title: 'PayPal',
            description: 'Use PayPal for a faster checkout experience when available.',
        },
    ]

    return (
        <div className="checkout-card p-6 sm:p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-900">Select payment method</h1>
                <p className="mt-2 text-sm text-slate-600">Pick the payment option you want to use for this purchase.</p>
            </div>

            <FormControl component="fieldset" fullWidth>
                <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                    {options.map((option) => {
                        const isSelected = paymentMethod === option.value
                        return (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio color="primary" />}
                                label={
                                    <div className={`checkout-payment-option w-full ${isSelected ? 'checkout-payment-option--selected' : ''}`}>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-slate-900">{option.title}</span>
                                            <span className="text-sm text-slate-600">{option.description}</span>
                                        </div>
                                    </div>
                                }
                                sx={{ margin: 0, alignItems: 'stretch' }}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default PaymentMethod