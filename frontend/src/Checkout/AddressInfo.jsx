import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../Components/shared/Skeleton";
import { useState } from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import AddressList from "./AddressList"
import { useSelector } from "react-redux";

const AddressInfo=({address})=>{
    const [openAddressModal,setOpenAddressModal]=useState(false)
    const [selectedAddress,setSelectedAddress]=useState("")

    const addNewAddressHandler=()=>{
        setSelectedAddress("")
            setOpenAddressModal(true)
        

    }
    const noAddressExist = !address || address===0 ;
    const {isLoading,btnLoader} = useSelector((state)=>state.error)
    return (
        <div className="min-h-[70vh] bg-slate-50 py-10 px-4">
            {noAddressExist ?(
                <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        <FaAddressBook size={58}/>
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900">No Address yet...</h1>
                    <p className="mt-3 text-sm text-slate-600">Please add the address to continue the purchase</p>
                    <button
                      onClick={addNewAddressHandler}
                      className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      Add Address
                    </button>
                </div>
            ):(
                <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Select Address
                </h1>
                {isLoading ? (
                    <div className="mt-6">
                 <Skeleton/></div>   
                ):(
                    <>
                <div className="mt-6">
                    <p className="text-sm text-slate-600">
                        <AddressList
                           addresses={address}
                           selectedAddress={setSelectedAddress}
                           setopenAddressModal={openAddressModal} /></p>
                </div>
                {address.length>0 && ( 
                     <div className="mt-6">
                        <button
                        onClick={addNewAddressHandler}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            Add More
                        </button>
                     </div>
                )}
                </>
            )}

                </div>
            )}
            <AddressInfoModal
            open={openAddressModal}
            setOpen={setOpenAddressModal}>
                <AddAddressForm  
                addresses = {selectedAddress} 
                setSelectedAddress={setSelectedAddress}
                setOpenAddressModal={setOpenAddressModal}/>

            </AddressInfoModal>
            
        </div>
    )
}
export default AddressInfo