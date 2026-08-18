import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'
import toast from 'react-hot-toast'
import InputField from '../../shared/InputField'
import Spinners from '../../shared/Spinners'
import { fetchCategories, addProduct, updateProduct } from '../../../store/actions'

const AddProductForm = ({ product, setOpen, update = false }) => {
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(product?.image || null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { categories } = useSelector((state) => state.products)
  const { isLoading: categoryLoading } = useSelector((state) => state.error)

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    control,
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

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

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
      if (product?.image) {
        setImagePreview(product.image)
      }
    }
  }, [product, setValue])

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('Image size should be less than 5MB')
        return
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        toast.error('Please upload a valid image format (JPEG, PNG, GIF, WebP)')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const onSubmitHandler = async (data) => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!data.productName || !data.description || !data.price || !data.categoryId || !data.quantity) {
        toast.error('Please fill in all required fields')
        return
      }

      if (update) {
        // Update existing product - send JSON only (no image)
        const productData = {
          productName: data.productName,
          description: data.description,
          price: parseFloat(data.price),
          discount: parseInt(data.discount) || 0,
          specialPrice: parseFloat(data.specialPrice || 0),
          quantity: parseInt(data.quantity),
          categoryId: data.categoryId,
        }
        dispatch(updateProduct(product.productId, productData, toast, setOpen))
      } else {
        // Create FormData for new product (with image)
        const formData = new FormData()
        formData.append('productName', data.productName)
        formData.append('description', data.description)
        formData.append('price', parseFloat(data.price))
        formData.append('discount', parseInt(data.discount) || 0)
        formData.append('specialPrice', parseFloat(data.specialPrice || 0))
        formData.append('quantity', parseInt(data.quantity))
        formData.append('categoryId', data.categoryId)

        // Add image if provided
        if (imageFile) {
          formData.append('image', imageFile)
        }

        dispatch(addProduct(formData, toast, setOpen))
        reset()
        setImageFile(null)
        setImagePreview(null)
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
              Fill in the product details to add a new item to your inventory.
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
        {/* Product Image Upload - Only for new products, not for editing */}
        {!update && (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer">
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-32 w-32 mx-auto object-cover rounded-lg"
                  />
                  <p className="text-sm text-slate-600">Click to change image</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-4xl text-slate-400">📷</div>
                  <p className="text-sm font-medium text-slate-700">Click to upload product image</p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF, WebP up to 5MB</p>
                </div>
              )}
            </label>
          </div>
        )}

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
                required: 'Category is required',
              })}
              disabled={categoryLoading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">Select a category</option>
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
              onClick={() => {
                reset()
                setImageFile(null)
                setImagePreview(null)
              }}
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