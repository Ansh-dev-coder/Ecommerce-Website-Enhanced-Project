import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { AiOutlineLogin } from "react-icons/ai"
import toast from "react-hot-toast"
import InputField from "../shared/InputField"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authenticateSignupUser } from "../../store/actions"



const Register=()=>{
     const navigate = useNavigate()
  const dispatch=useDispatch()
  const [loader, setLoader] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  })

  const registerHandler = async (data) => {
    dispatch(authenticateSignupUser(data,toast,reset,navigate,setLoader))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-8 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <AiOutlineLogin size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to sign up and start shopping.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(registerHandler)} className="space-y-6">
          <InputField
            label="Email"
            id="email"
            type="email"
            errors={errors}
            register={register}
            required={true}
            message="Email is required"
            placeholder="example@domain.com"
          />
          <InputField
            label="Username"
            id="username"
            type="text"
            errors={errors}
            register={register}
            required={true}
            message="Username is required"
            placeholder="ansh123"
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            errors={errors}
            register={register}
            required={true}
            min={6}
            message="Password is required"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loader}
            className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loader ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center text-sm text-slate-500">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 inline-block text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )

}
export default Register