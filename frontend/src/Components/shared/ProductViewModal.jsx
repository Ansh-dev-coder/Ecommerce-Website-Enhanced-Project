import { Description, Dialog, DialogPanel, DialogTitle,DialogBackdrop } from '@headlessui/react'
import {Divider} from '@mui/material'
import Status from './Status';
import {MdDone} from 'react-icons/md'
import { MdClose } from 'react-icons/md';
import { useState } from 'react'

function ProductViewModal({open,setOpen,product,isAvailable}) {
 
  const {id ,
                productName ,
                image ,
                description ,
                quantity,
                price ,
                discount ,
                specialPrice}=product;
    const handleClickOpen=()=>{
      setOpen(true);
    }

  return (
    <>
      
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full">
               
            {image && (
               <div className='flex justify-center aspect-[3/1.5]'>
                <img 
                src={image} 
                alt={productName}>
                </img></div>
                
            )}
            <div className='px-6 pt-10 pb-2'>
               <DialogTitle as='h1' className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                {productName}
               </DialogTitle>
            </div>

            <div className='space-y-2 text-gray-700 pb-4'>

                 <div className="flex items-center justify-between gap-2">
                {specialPrice ? (
                    <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                    </span>
                    <span className="text-x1 font-bold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                    </span>
                </div>
                ) : (
                    <span className="text-x1 font-bold text-slate-700">
                        {" "}
                        ${Number(price).toFixed(2)}
                    </span>
                )}

                  {isAvailable ? (
                   
                    <Status
                    text= 'In Stock'
                    icon={MdDone}
                    bg="bg-teal-200"
                    color="text-black-200"
                    />
                  )
                     : (
                     
                      <Status text="Out Of Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="tex=rose-700"
                      />
                     )}

                </div>

                <Divider/>
                <p>{description}</p>

              </div>


               <div className="px-6 py-4 flex justify-end gap-4">
              <button onClick={() => setOpen(false)}
                type='button'
                className='px-4 py-2 text-sm font-semibold text-slate-700 border hover:text-slate-800 hover:border-slate-800 rounded-md'
                >Close</button>
             
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
export default ProductViewModal