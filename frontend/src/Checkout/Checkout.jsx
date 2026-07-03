import { Button, Step,StepLabel, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import AddressInfo from "./AddressInfo"
import { useDispatch, useSelector } from "react-redux"
import { getUserAddress } from "../store/actions"
import Skeleton from "../Components/shared/Skeleton"


const Checkout = () =>{

    const [activeStep,setActiveStep]=useState(0)
    const dispatch=useDispatch()
    const {isLoading,errorMessage}=useSelector((state)=>state.error)
    const {address,selectedUserCheckoutAddress}=useSelector(
        (state)=>
        state.auth)

        const handleBack=()=>{
            setActiveStep((prevStep)=>prevStep-1)
        }
        const handleNext=()=>{
            if(activeStep===0 && !selectedUserCheckoutAddress){
                toast.error("Please select an address to proceed")
                return;
            }
            if(activeStep===1 && (!selectedUserCheckoutAddress || !paymentMethod)){
                toast.error("Please select payment address to proceed further")
                return;
            }
            setActiveStep((prevStep)=>prevStep+1)
        }
        const paymentMethod=false
    
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
                {isLoading ? (<div className="lg:w-[80%] mx-auto py-5">
                    <Skeleton/>
                </div>) :(
                    <div className="mt-10">
                   {activeStep=== 0 && <AddressInfo address={address}/>}
                </div>)}
                
                <div className="mt-8 flex items-center justify-between">
                     <Button 
                         variant='outlined'
                         disabled={activeStep===0}
                         onClick={handleBack}
                         sx={{
                            borderRadius: "12px",
                            px: 4,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#cbd5e1",
                            color: "#334155",
                             "&:hover": {
                               borderColor: "#94a3b8",
                               backgroundColor: "#f8fafc", 
                               },
                               }}>
                                Back
                     </Button> 
                     {activeStep !==steps.Length-1 && (
                        <button
                        disabled={
                            errorMessage || (
                                (activeStep===0 ? !selectedUserCheckoutAddress 
                                    : activeStep===1 ? !paymentMethod 
                                    : false)
                            )
                        }
                        className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${
                            errorMessage ||
                                (activeStep===0 && !selectedUserCheckoutAddress) ||
                                (activeStep===1 && !paymentMethod)
                                ?"opacity-60"
                                :"" 
                            
                        }`}
                        onClick={handleNext}>
                            Proceed

                        </button>
                     )}
                </div>
                    
            </div>
        </div>
    )
}
export default Checkout