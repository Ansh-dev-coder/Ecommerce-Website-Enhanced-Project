import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../Components/shared/Skeleton";
import { useState } from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import AddressList from "./AddressList"
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../store/actions"

const AddressInfo = ({ address }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState("")
    const dispatch = useDispatch()
    const addNewAddressHandler = () => {
        setSelectedAddress("")
        setOpenAddressModal(true)
    }
    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal))
    }
    const noAddressExist = !address || address === 0
    const { isLoading, btnLoader } = useSelector((state) => state.error)

    return (
        <div className="min-h-[70vh] rounded-[32px] border border-slate-200/80 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            {noAddressExist ? (
                <div className="checkout-card mx-auto max-w-3xl p-8 text-center">
                    <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                        <FaAddressBook size={56} />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900">No address yet</h1>
                    <p className="mt-3 text-sm text-slate-600">Add your delivery details so checkout can continue smoothly.</p>
                    <button
                        onClick={addNewAddressHandler}
                        className="checkout-button mt-6"
                    >
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="checkout-card mx-auto max-w-4xl p-6 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">Select a delivery address</h1>
                            <p className="mt-2 text-sm text-slate-600">Choose the address you want to ship your order to.</p>
                        </div>
                        <button
                            onClick={addNewAddressHandler}
                            className="checkout-button-secondary w-full sm:w-auto"
                        >
                            Add More
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="mt-6">
                            <Skeleton />
                        </div>
                    ) : (
                        <div className="mt-6">
                            <AddressList
                                addresses={address}
                                setSelectedAddress={setSelectedAddress}
                                setOpenAddressModal={setOpenAddressModal}
                                setOpenDeleteModal={setOpenDeleteModal}
                            />
                        </div>
                    )}
                </div>
            )}

            <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
                <AddAddressForm
                    address={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    setOpenAddressModal={setOpenAddressModal}
                />
            </AddressInfoModal>

            <DeleteModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    )
}

export default AddressInfo