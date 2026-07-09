import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {FormControl,FormControlLabel,RadioGroup,Radio} from '@mui/material'
import {useDispatch} from 'react-redux'
import {addPaymentMethod} from '../store/actions'
import { createUserCart } from '../store/actions'

const PaymentMethod=()=>{
    const dispatch=useDispatch()

    const {paymentMethod}=useSelector((state)=>state.payment)
    const {cart,cartId}=useSelector((state)=>state.carts);
    const {isLoading,errorMessage}=useSelector((state)=>state.error)

    useEffect(()=>{
        if(cart.length > 0 && !cartId && !errorMessage){
            const sendCartItems=cart.map((item)=>{
                return {
                    productId : item.productId,
                    quantity : item.quantity
                }
            })
            dispatch(createUserCart(sendCartItems))
        }
    },[dispatch,cartId])

const paymentMethodHandler=(method)=>{
    dispatch(addPaymentMethod(method))
}

    return (
        <div >
            <h1>Select Payment Method</h1>
            <FormControl>
                <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e)=>paymentMethodHandler(e.target.value)}
                >
                    <FormControlLabel 
                          value="Stripe" 
                          control={<Radio color="primary"/>}
                           label="Stripe"
                           className="text-gray-700"/>

                    <FormControlLabel
                           value="Paypal" 
                           control={<Radio color="primary" />} 
                           label="Paypal"
                           className="text-gray-700"/>
                </RadioGroup> 
            </FormControl>
        </div>
    )
}
export default PaymentMethod