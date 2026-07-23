import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { selectUserCheckoutAddress } from "../store/actions"

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal }) => {
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth)

    const onEditButtonHandler = (address) => {
        setSelectedAddress(address)
        setOpenAddressModal(true)
    }

    const onDeleteButtonHandler = (address) => {
        setSelectedAddress(address)
        setOpenDeleteModal(true)
    }

    const handleAddressSelection = (address) => {
        dispatch(selectUserCheckoutAddress(address))
    }

    return (
        <div className="space-y-4">
            {addresses.map((address) => {
                const isSelected = selectedUserCheckoutAddress?.addressId === address.addressId

                return (
                    <div
                        key={address.addressId}
                        onClick={() => handleAddressSelection(address)}
                        className={`checkout-address-card cursor-pointer p-5 ${isSelected ? 'checkout-address-card--selected' : ''}`}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <FaBuilding size={16} className="text-slate-500" />
                                    <p className="font-semibold">{address.buildingName}</p>
                                    {isSelected && <FaCheckCircle size={18} className="text-emerald-600" />}
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <FaStreetView size={16} className="text-slate-500" />
                                    <p>{address.street}</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MdLocationCity size={16} className="text-slate-500" />
                                    <p>{address.city}, {address.state}</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MdPinDrop size={16} className="text-slate-500" />
                                    <p>{address.pincode}</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <MdPublic size={16} className="text-slate-500" />
                                    <p>{address.country}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        onEditButtonHandler(address)
                                    }}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-900 hover:text-white"
                                >
                                    <FaEdit size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        onDeleteButtonHandler(address)
                                    }}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-red-600 hover:text-white"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AddressList