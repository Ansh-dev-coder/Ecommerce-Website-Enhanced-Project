import { FaBuilding, FaCheckCircle, FaEdit, FaStreetView, FaTrash } from "react-icons/fa";
import {MdLocationCity,MdPinDrop, MdPublic} from "react-icons/md"
import { useDispatch,useSelector } from "react-redux"
import { selectUserCheckoutAddress } from "../store/actions"

const AddressList=({addresses,setSelectedAddress,setOpenAddressModal})=>{
    const dispatch=useDispatch();
    const {selectedUserCheckoutAddress}=useSelector((state)=>state.auth)

     const onEditButtonHandler=(addresses)=>{
        setSelectedAddress(addresses)
        setOpenAddressModal(true)

    }
    const onDeleteButtonHandler=(addresses)=>{
        setSelectedAddress(addresses)

    }

    const handleAddressSelection=(addresses)=>{

         dispatch(selectUserCheckoutAddress(addresses))
    }

   
   
    return (
        <div className="space-y-4">
            {addresses.map((address)=>(
                <div key={address.addressId}
                     onClick={()=>handleAddressSelection(address)}
                     className={`relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                        selectedUserCheckoutAddress?.addressId===address.addressId ? "bg-emerald-50 border-emerald-300" : "bg-white"
                     }`}>

                     <div className="flex flex-col gap-4">
                         <div className="space-y-3">
                             <div className="flex items-center gap-2 text-slate-900">
                                 <FaBuilding size={16} className="text-slate-500"/>
                                 <p className="font-semibold">{address.buildingName}</p>
                                 {selectedUserCheckoutAddress?.addressId===address.addressId &&
                                     <FaCheckCircle size={18} className="text-emerald-600" /> }
                             </div>
                             <div className="flex items-center gap-2 text-slate-600">
                                 <FaStreetView size={16} className="text-slate-500"/>
                                 <p>{address.street}</p>
                             </div>
                             <div className="flex items-center gap-2 text-slate-600">
                                 <MdLocationCity size={16} className="text-slate-500"/>
                                 <p>{address.city}, {address.state}</p>
                             </div>
                             <div className="flex items-center gap-2 text-slate-600">
                                 <MdPinDrop size={16} className="text-slate-500"/>
                                 <p>{address.pincode}</p>
                             </div>
                             <div className="flex items-center gap-2 text-slate-600">
                                 <MdPublic size={16} className="text-slate-500"/>
                                 <p>{address.country}</p>
                             </div>
                         </div>
                         <div className="flex justify-end gap-2">
                             <button
                                 type="button"
                                 onClick={(event)=>{ event.stopPropagation(); onEditButtonHandler(address); }}
                                 className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-slate-900 hover:text-white"
                             >
                                 <FaEdit size={18}/>
                             </button>
                             <button
                                 type="button"
                                 onClick={(event)=>onDeleteButtonHandler(address)}
                                 className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-red-600 hover:text-white"
                             >
                                 <FaTrash size={18}/>
                             </button>
                         </div>
                     </div>
                </div>

            ))}
        </div>
    )

}
export default AddressList