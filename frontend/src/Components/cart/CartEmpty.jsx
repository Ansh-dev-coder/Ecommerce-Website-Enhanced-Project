import {MdShoppingCart, MdArrowBack} from "react-icons/md"
import { Link } from "react-router-dom"

const CartEmpty = ()=>{
    return (
        <div className='lg:px-14 sm:px-8 px-4 py-10'>
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-8">
                <div className="flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
                        <MdShoppingCart size={80} className="text-slate-400"/>
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-600 text-center max-w-md">
                        Looks like you haven't added any items to your cart yet. 
                        Start shopping to add products!
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <Link to="/">
                        <button className="rounded-2xl bg-slate-900 px-8 py-3 text-white transition hover:bg-slate-800 font-semibold flex items-center gap-2">
                            <MdArrowBack size={20}/>
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default CartEmpty