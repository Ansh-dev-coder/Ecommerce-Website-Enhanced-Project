import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaTimes, FaTrash } from 'react-icons/fa'
import Spinners from './Spinners'

const DeleteModal = ({
  open,
  setOpen,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this product? This action cannot be undone.',
  onDelete,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition duration-300 ease-in-out data-closed:scale-95 data-closed:opacity-0"
        >
          <div className="flex items-start justify-between gap-4 border-b pb-4">
            <DialogTitle className="font-montserrat text-xl font-bold text-slate-800">
              {title}
            </DialogTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="text-slate-500 transition hover:text-slate-800"
            >
              <FaTimes />
            </button>
          </div>

          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FaTrash size={22} />
            </div>
            <p className="text-sm leading-6 text-slate-600">
              {message}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={isLoading}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Spinners />
                  <span>Deleting...</span>
                </span>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DeleteModal
