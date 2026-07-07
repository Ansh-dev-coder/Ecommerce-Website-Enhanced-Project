import React from 'react'
import {useSelector} from 'react-redux'
import {FormControl,FormControlLabel,RadioGroup,Radio} from '@mui/material'
import {useDispatch} from 'react-redux'
import {addPaymentMethod} from '../store/actions'

const PaymentMethod=()=>{
    const dispatch=useDispatch()

    const {paymentMethod}=useSelector((state)=>state.payment)

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