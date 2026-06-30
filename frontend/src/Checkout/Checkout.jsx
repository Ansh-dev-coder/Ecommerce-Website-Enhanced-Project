import { Step,StepLabel, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import AddressInfo from "./AddressInfo"
import { useDispatch, useSelector } from "react-redux"
import { getUserAddress } from "../store/actions"


const Checkout = () =>{

    const [activeStep,setActiveStep]=useState(0)
    const dispatch=useDispatch()
    const {address}=useSelector(
        (state)=>
        state.auth)
    const steps=[
        "Address" ,
        "Payment Method",
        "Order Summary",
        "Payment"
    ]
    useEffect(()=>{
        dispatch(getUserAddress())
    },[dispatch])
    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="mx-auto max-w-5xl rounded-[32px] bg-white p-6 shadow-xl shadow-slate-200/40">
                <Stepper activeStep={activeStep} alternativeLabel className="bg-transparent">
                    {steps.map((label,index)=>(
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="mt-10">
                   {activeStep=== 0 && <AddressInfo address={address}/>}
                </div>
            </div>
        </div>
    )
}
export default Checkout