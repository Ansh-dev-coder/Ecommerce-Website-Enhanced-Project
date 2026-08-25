import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'
import toast from 'react-hot-toast'
import InputField from '../../shared/InputField'
import Spinners from '../../shared/Spinners'
import { fetchCategories, addProduct, updateProduct } from '../../../store/actions'

const AddProductForm = ({ product, setOpen, update = false, integrationPending = false }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { categories } = useSelector((state) => state.products)
  const { isLoading: categoryLoading } = useSelector((state) => state.error)

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      discount: 0,
      specialPrice: '',
      quantity: '',
      categoryId: '',
    },
  })

  useEffect(() => {
    if (!integrationPending) {
      dispatch(fetchCategories())
    }
  }, [dispatch, integrationPending])

  // Populate form if editing existing product
  useEffect(() => {
    if (product?.productId) {
      setValue('productName', product?.productName || '')
      setValue('description', product?.description || '')
      setValue('price', product?.price || '')
      setValue('discount', product?.discount || 0)
      setValue('specialPrice', product?.specialPrice || '')
      setValue('quantity', product?.quantity || '')
      setValue('categoryId', product?.categoryId || '')
    }
  }, [product, setValue])

  // Handle form submission
  const onSubmitHandler = async (data) => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!data.productName || !data.description || !data.price || (!integrationPending && !data.categoryId) || !data.quantity) {
        toast.error('Please fill in all required fields')
        return
      }

      // Create product data object
      const productData = {
        productName: data.productName,
        description: data.description,
        price: parseFloat(data.price),
        discount: parseInt(data.discount) || 0,
        specialPrice: parseFloat(data.specialPrice || 0),
        quantity: parseInt(data.quantity),
        categoryId: data.categoryId,
      }

      if (integrationPending) {
        toast.success('Seller product API integration point is ready. Backend connection pending.')
        setOpen?.(false)
        return
      }

      if (update) {
        // Update existing product
        dispatch(updateProduct(product.productId, productData, toast, setOpen))
      } else {
        // Add new product
        dispatch(addProduct(productData, toast, setOpen))
        reset()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(error?.response?.data?.message || 'Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <MdAddShoppingCart size={28} />
        </div>
        {!update ? (
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
            <p className="mt-2 text-sm text-slate-500">
              {integrationPending
                ? 'Prepare the product details for your seller inventory. Saving will be connected when the backend API is available.'
                : 'Fill in the product details to add a new item to your inventory.'}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
            <p className="mt-2 text-sm text-slate-500">
              Update the product details.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        {/* Product Details Grid */}
        <div className="min-w-0 grid gap-5 md:grid-cols-2">
          <InputField
            label="Product Name"
            id="productName"
            type="text"
            errors={errors}
            register={register}
            required={true}
            message="Product name is required"
            placeholder="e.g., Wireless Headphones"
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('categoryId', {
                required: integrationPending ? false : 'Category is required',
              })}
              disabled={categoryLoading || integrationPending}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">Select a category</option>
              {integrationPending && (
                <option value="seller-api-pending">Seller API pending</option>
              )}
              {categories && categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>
            )}
          </div>

          <InputField
            label="Price"
            id="price"
            type="number"
            step="0.01"
            errors={errors}
            register={register}
            required={true}
            message="Price is required"
            placeholder="0.00"
          />

          <InputField
            label="Discount (%)"
            id="discount"
            type="number"
            min="0"
            max="100"
            errors={errors}
            register={register}
            required={false}
            placeholder="0"
          />

          <InputField
            label="Special Price"
            id="specialPrice"
            type="number"
            step="0.01"
            errors={errors}
            register={register}
            required={false}
            placeholder="Special promotional price"
          />

          <InputField
            label="Quantity in Stock"
            id="quantity"
            type="number"
            min="0"
            errors={errors}
            register={register}
            required={true}
            message="Quantity is required"
            placeholder="0"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters',
              },
            })}
            placeholder="Enter detailed product description"
            rows="5"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinners />
                <span>{update ? 'Updating...' : 'Adding...'}</span>
              </span>
            ) : (
              update ? 'Update Product' : 'Add Product'
            )}
          </button>

          {!update && (
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddProductForm
