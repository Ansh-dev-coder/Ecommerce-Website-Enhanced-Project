import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaImage, FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Spinners from '../../shared/Spinners'
import { updateProductImage } from '../../../store/actions'

const ProductImageUpdate = ({ product, setOpen, queryString, integrationPending = false }) => {
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(product?.image || '')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    setSelectedImage(null)
    setPreviewImage(product?.image || '')
    setError('')
    setIsUploading(false)
  }, [product])

  useEffect(() => {
    return () => {
      if (previewImage && previewImage !== product?.image) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage, product?.image])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if (!allowedImageTypes.includes(file.type)) {
      setSelectedImage(null)
      setPreviewImage(product?.image || '')
      setError('Please select a valid image file in JPG, JPEG, or PNG format.')
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(file)
    setPreviewImage(imageUrl)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedImage) {
      setError('Please select a new product image before updating.')
      return
    }

    if (!product?.productId) {
      setError('Product details are missing. Please try again.')
      return
    }

    if (integrationPending) {
      toast.success('Seller product image API integration point is ready. Backend connection pending.')
      setOpen?.(false)
      return
    }

    dispatch(updateProductImage(
      product.productId,
      selectedImage,
      toast,
      setOpen,
      setIsUploading,
      queryString
    ))
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <FaImage size={26} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {product?.productName || 'Product Image'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Select a new product image and preview it before updating.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt={product?.productName || 'Product preview'}
              className="h-64 w-64 rounded-lg border border-slate-200 bg-white object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-64 w-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-500">
              <FaImage size={34} />
              <span className="mt-3 text-sm font-medium">No image available</span>
            </div>
          )}
        </div>

        <label
          htmlFor="productImage"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-purple-400 hover:bg-purple-50"
        >
          <FaUpload className="text-purple-600" size={22} />
          <span className="mt-3 text-sm font-semibold text-slate-800">
            Select product image
          </span>
          <span className="mt-1 text-xs text-slate-500">
            JPG, JPEG, or PNG files only
          </span>
          <input
            id="productImage"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
            disabled={isUploading}
            className="sr-only"
          />
        </label>

        {selectedImage && (
          <p className="text-center text-sm font-medium text-slate-600">
            Selected: {selectedImage.name}
          </p>
        )}

        {error && <p className="text-center text-sm font-medium text-red-500">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!selectedImage || isUploading}
            className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
          >
            {isUploading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinners />
                <span>Uploading...</span>
              </span>
            ) : (
              'Update Image'
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={isUploading}
            className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductImageUpdate
