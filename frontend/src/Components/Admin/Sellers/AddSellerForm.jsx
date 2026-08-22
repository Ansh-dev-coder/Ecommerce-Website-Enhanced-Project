import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaStore } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Spinners from '../../shared/Spinners'
import { addSeller } from '../../../store/actions'

const AddSellerForm = ({ setOpen, queryString = '' }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.username.trim()) {
      nextErrors.username = 'Username is required'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required'
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    dispatch(addSeller(
      {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      },
      toast,
      () => {
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        setErrors({})
        setOpen(false)
      },
      setIsSubmitting,
      queryString
    ))
  }

  const inputClassName = (fieldName) => `w-full rounded-lg border px-4 py-2 text-slate-900 placeholder-slate-500 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 ${
    errors[fieldName]
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
  }`

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
          <FaStore size={26} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Seller</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create a seller account for the admin dashboard.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="seller123"
            className={inputClassName('username')}
          />
          {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="seller@example.com"
            className={inputClassName('email')}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Enter password"
            className={inputClassName('password')}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Confirm password"
            className={inputClassName('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinners />
                <span>Adding...</span>
              </span>
            ) : (
              'Add Seller'
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddSellerForm
