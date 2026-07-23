import { Button, Step, StepLabel, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import AddressInfo from "./AddressInfo"
import { getUserAddress } from "../store/actions"
import Skeleton from "../Components/shared/Skeleton"
import ErrorPage from "../Components/shared/ErrorPage"
import PaymentMethod from "./PaymentMethod"
import OrderSummary from "./OrderSummary"
import StripePayment from "./StripePayment"
import PaypalPayment from "./PaypalPayment"

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)
    const dispatch = useDispatch()
    const { isLoading, errorMessage } = useSelector((state) => state.error)
    const { cart, totalPrice } = useSelector((state) => state.carts)
    const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth)
    const { paymentMethod } = useSelector((state) => state.payment)

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select an address to proceed")
            return
        }
        if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select a payment method to proceed further")
            return
        }
        setActiveStep((prevStep) => prevStep + 1)
    }

    const steps = ["Address", "Payment Method", "Order Summary", "Payment"]
    const isLastStep = activeStep === steps.length - 1
    const isProceedDisabled = errorMessage || (activeStep === 0 ? !selectedUserCheckoutAddress : activeStep === 1 ? !paymentMethod : false)

    useEffect(() => {
        dispatch(getUserAddress())
    }, [dispatch])

    return (
        <div className="checkout-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur sm:p-8 lg:p-10">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Secure checkout</p>
                        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Complete your order</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">Choose your delivery address, payment method, and review the order before paying.</p>
                    </div>
                    <div className="checkout-pill">Step {activeStep + 1} of {steps.length}</div>
                </div>

                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    className="checkout-stepper"
                    sx={{
                        '& .MuiStepLabel-label': { fontSize: '0.95rem', fontWeight: 600 },
                        '& .MuiStepIcon-root.Mui-active': { color: '#2563eb' },
                        '& .MuiStepIcon-root.Mui-completed': { color: '#16a34a' },
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {isLoading ? (
                    <div className="mx-auto py-8 lg:w-[80%]">
                        <Skeleton />
                    </div>
                ) : (
                    <div className="mt-8">
                        {activeStep === 0 && <AddressInfo address={address} />}
                        {activeStep === 1 && <PaymentMethod />}
                        {activeStep === 2 && (
                            <OrderSummary
                                totalPrice={totalPrice}
                                cart={cart}
                                address={selectedUserCheckoutAddress}
                                paymentMethod={paymentMethod}
                            />
                        )}
                        {activeStep === 3 && (paymentMethod === "Stripe" ? <StripePayment /> : <PaypalPayment />)}
                    </div>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className="checkout-button-secondary"
                        sx={{
                            borderRadius: '999px',
                            px: 2.8,
                            py: 1.2,
                            textTransform: 'none',
                            fontWeight: 600,
                            minWidth: 120,
                        }}
                    >
                        Back
                    </Button>

                    {!isLastStep && (
                        <button
                            type="button"
                            disabled={isProceedDisabled}
                            className={`checkout-button ${isProceedDisabled ? 'opacity-70' : ''}`}
                            onClick={handleNext}
                        >
                            Proceed
                        </button>
                    )}
                </div>

                {errorMessage && <ErrorPage message={errorMessage} />}
            </div>
        </div>
    )
}

export default Checkout