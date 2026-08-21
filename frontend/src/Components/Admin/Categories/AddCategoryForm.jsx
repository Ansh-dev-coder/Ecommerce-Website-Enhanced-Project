import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MdCategory } from 'react-icons/md'
import toast from 'react-hot-toast'
import Spinners from '../../shared/Spinners'
import { addCategory } from '../../../store/actions'

const AddCategoryForm = ({ setOpen, queryString = '' }) => {
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedCategoryName = categoryName.trim()

    if (!trimmedCategoryName) {
      setError('Category name is required')
      return
    }

    dispatch(addCategory(
      { categoryName: trimmedCategoryName },
      toast,
      () => {
        setCategoryName('')
        setError('')
        setOpen(false)
      },
      setIsSubmitting,
      queryString
    ))
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <MdCategory size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Category</h1>
          <p className="mt-2 text-sm text-slate-500">
            Create a category that can be used while adding products.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="categoryName" className="mb-2 block text-sm font-medium text-slate-700">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value)
              setError('')
            }}
            disabled={isSubmitting}
            placeholder="e.g., Electronics"
            className={`w-full rounded-lg border px-4 py-2 text-slate-900 placeholder-slate-500 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
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
              'Add Category'
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

export default AddCategoryForm
