import { FaAddressCard } from "react-icons/fa"
import InputField from "../Components/shared/InputField"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import Spinners from "../Components/shared/Spinners"
import toast from "react-hot-toast"
import { addUpdateUserAddress } from "../store/actions"

const AddAddressForm = ({address , setOpenAddressModal}) => {

  const dispatch=useDispatch()
  const { btnLoader = false } = useSelector((state) => state.error ?? {})

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })

  const onSaveAddressHandler = async (data) => {
    dispatch(addUpdateUserAddress(data,toast,address?.addressId,setOpenAddressModal))
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <FaAddressCard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Add New Address</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your shipping details to continue checkout.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSaveAddressHandler)} className="space-y-6">
          <div className="min-w-0 grid gap-5 md:grid-cols-2">
            <InputField
              label="Street"
              id="street"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="Street is required"
              placeholder="123 Main Street"
            />
            <InputField
              label="Building Name"
              id="buildingName"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="Building name is required"
              placeholder="Gali no 1"
            />
            <InputField
              label="City"
              id="city"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="City is required"
              placeholder="New York"
            />
            <InputField
              label="State"
              id="state"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="State is required"
              placeholder="California"
            />
            <InputField
              label="Country"
              id="country"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="Country is required"
              placeholder="United States"
            />
            <InputField
              label="Pincode"
              id="pincode"
              type="text"
              errors={errors}
              register={register}
              required={true}
              message="Pincode is required"
              placeholder="10001"
            />
          </div>

          <button
            type="submit"
            disabled={btnLoader}
            className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
          >
            {btnLoader ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinners />
                <span>Saving address...</span>
              </span>
            ) : (
              "Save Address"
            )}
          </button>
        </form>
    </div>
  )
}
export default AddAddressForm