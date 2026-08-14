import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import Spinners from '../../shared/Spinners'

const ORDER_STATUS_OPTIONS = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
]

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader }) => {
  const [status, setStatus] = useState(selectedItem?.status || 'PENDING')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (selectedItem?.status) {
      setStatus(selectedItem.status)
    }
  }, [selectedItem])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedId) {
      toast.error('Order not selected')
      return
    }

    setLoader(true)

    try {
      console.log('Updating order status:', {
        orderId: selectedId,
        status,
        notes,
      })

      toast.success('Order status updated successfully')
      setOpen(false)
    } catch (error) {
      toast.error(error?.message || 'Failed to update order status')
    } finally {
      setLoader(false)
    }
  }

  return (
    <div className='w-full'>
      <div className='mb-6 space-y-2'>
        <h2 className='text-2xl font-bold text-slate-800'>Update Order Status</h2>
        <p className='text-sm text-slate-500'>Change the status for this order.</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-xl bg-slate-50 p-4'>
            <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Order ID</p>
            <p className='mt-2 text-lg font-semibold text-slate-800'>{selectedId}</p>
          </div>

          <div className='rounded-xl bg-slate-50 p-4'>
            <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Customer</p>
            <p className='mt-2 text-lg font-semibold text-slate-800'>{selectedItem?.email || 'N/A'}</p>
          </div>
        </div>

        <div>
          <label htmlFor='order-status' className='mb-2 block text-sm font-medium text-slate-700'>Status</label>
          <select
            id='order-status'
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          >
            {ORDER_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='order-notes' className='mb-2 block text-sm font-medium text-slate-700'>Notes</label>
          <textarea
            id='order-notes'
            rows='4'
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder='Add notes for this status update...'
            className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          />
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <button
            type='button'
            onClick={() => setOpen(false)}
            className='rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100'
          >
            Cancel
          </button>

          <button
            type='submit'
            disabled={loader}
            className='rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300'
          >
            {loader ?
             <div>
                <Spinners  /> Loading...
            </div> : 
            'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateOrderForm