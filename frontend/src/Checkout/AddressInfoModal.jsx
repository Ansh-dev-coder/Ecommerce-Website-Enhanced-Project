import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-lg bg-white p-8 shadow-xl rounded-[32px] max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="sticky top-0 right-0 float-right mb-4 inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <FaTimes size={20} />
          </button>
          <div className="pt-2">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
export default AddressInfoModal