import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { FaTimes, FaTrash } from 'react-icons/fa'

const DeleteModal = ({ open, setOpen, title, onDeleteHandler, loader }) => {
  const handleConfirm = () => {
    onDeleteHandler()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-md bg-white p-8 shadow-xl rounded-[20px]">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loader}
            className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-700 disabled:opacity-50 transition-colors"
          >
            <FaTimes size={18} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <FaTrash size={24} className="text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-lg font-bold text-slate-900 mb-8">
            {title || 'Confirm Delete'}
          </h2>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loader}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loader}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loader ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash size={14} />
                  Delete
                </>
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DeleteModal
