import { FaBuilding } from "react-icons/fa";
import { useDispatch } from "react-redux"

const AddressList=({addresses,setSelectedAddress,setOpenAddressModal})=>{
    const dispatch=useDispatch();
    const selectedUserAddress=addresses[0]

    const handleAddressSelection=(address)=>{}
    return (
        <div>
            {addresses.map((address)=>(
                <div key={address.addressId}
                     onClick={()=>handleAddressSelection(address)}
                     className={`p-4 border rounded-md cursor-pointer relative ${
                        selectedUserAddress?.addressId===address.addressId ? "bg-green-100" : "bg-white"
                     }`}>


                     <div className="flex items-start">
                            <div className="space y-1">
                                <div className="flex items-center">
                                    <FaBuilding size={14} className="mr-2 text-gray-600"/>
                                    <p>{address.buildingName}</p>
                                    
                                </div>
                            </div>
                    </div>
                </div>

            ))}
        </div>
    )

}
export default AddressList