import { MdArrowBack, MdShoppingCart } from "react-icons/md"
import { Link } from "react-router-dom"
import ItemContent from "./ItemContent"
import { useDispatch, useSelector } from "react-redux"
import CartEmpty from "./CartEmpty"
import { FormatPrice } from "../../utils/FormatPrice"



const Cart =()=>{

    const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.carts)
    const newCart={...cart}
    newCart.totalPrice=cart?.reduce(
        (acc,cur)=>acc + Number(cur?.specialPrice) * Number(cur?.quantity),0
    )
    if(!cart || cart.length===0){
        return <CartEmpty/>
    }

    return(

        <div className='lg:px-14 sm:px-8 px-4 py-10'>
            <div className="flex flex-col items-center mb-12 gap-3">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                    <MdShoppingCart size={30} className="text-gray-700" />
                    Your Cart
                </h1>
                <p className="text-sm text-gray-600">
                    All your selected items will appear here.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 border border-slate-200 mb-6">
                <div>Product</div>
                <div className="hidden md:flex items-center justify-center">Quantity</div>
                <div className="hidden md:flex items-center justify-center">Price</div>
                <div className="hidden md:flex items-center justify-end">Total</div>
            </div>

            <div>
                {cart && cart.length > 0 && cart.map((item,i)=> <ItemContent  key={i} {...item}/>)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                        <span className="font-semibold">Subtotal</span>
                        <span className="text-slate-500">{FormatPrice(newCart?.totalPrice)}</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        Taxes and shipping calculated at checkout.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link to="/checkout" className="w-full">
                            <button className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800">
                                <div className="flex items-center justify-center gap-2">
                                    <MdShoppingCart size={20}/>
                                    Checkout
                                </div>
                            </button>
                        </Link>

                        <div className="flex justify-center">
                            <Link to="/products">
                                <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-900 text-sm transition hover:bg-slate-100 flex items-center gap-2">
                                    <MdArrowBack size={18}/>
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Cart