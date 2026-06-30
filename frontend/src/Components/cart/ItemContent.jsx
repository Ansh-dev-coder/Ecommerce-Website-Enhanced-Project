import { useState } from "react"
import { HiOutlineTrash } from "react-icons/hi"
import SetQuantity from "./SetQuantity"
import { useDispatch } from "react-redux"
import { increaseCartQuantity, decreaseCartQuantity, removeCartItem } from "../../store/actions"
import toast from "react-hot-toast"
import { FormatPrice } from "../../utils/FormatPrice"
import { truncateText } from "../../utils/TruncateText"




const ItemContent = ({

    productId,
    productName,
    image,
    description,
    price,
    quantity,
    discount,
    specialPrice,
    cartId,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(Number(quantity) || 1)
    const effectivePrice = Number(specialPrice ?? price ?? 0)
    const totalPrice = effectivePrice * currentQuantity
    const dispatch = useDispatch()

    const handleQtyIncrease = () => {
        const cartItem = {
            cartId,
            productId,
            productName,
            image,
            description,
            price,
            quantity,
            discount,
            specialPrice,
        }

        dispatch(increaseCartQuantity(cartItem, toast, currentQuantity, setCurrentQuantity))
    }


    const handleQtyDecrease = () => {
        const cartItem = {
            cartId,
            productId,
            productName,
            image,
            description,
            price,
            quantity,
            discount,
            specialPrice,
        }

        dispatch(decreaseCartQuantity(cartItem, toast, currentQuantity, setCurrentQuantity))
    }


    const removeItemFromCart = () => {
        dispatch(removeCartItem(productId, toast, productName))
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 rounded-xl bg-white p-4 text-slate-700 border border-slate-200 mb-4 items-center">
            <div className="flex flex-col md:flex-row items-start gap-4 min-w-0">
                <div className="flex flex-col items-center gap-3 min-w-0">
                    <img
                        src={image}
                        alt={productName}
                        className="w-24 h-24 rounded-lg border border-slate-200 object-cover"
                    />
                    <button onClick={removeItemFromCart}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white px-4 py-2 text-slate-900 text-sm font-medium transition hover:bg-slate-100">
                        <HiOutlineTrash size={16} className="text-rose-500" />
                        Remove
                    </button>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-600">{truncateText(productName)}</h3>
                    <p className="text-sm text-slate-500 max-w-xl overflow-hidden">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-start md:justify-center text-sm font-medium text-slate-700 min-w-0">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}
                />
            </div>

            <div className="flex items-center justify-start md:justify-center gap-3 text-sm text-slate-700 min-w-0">
                <span className="font-semibold">{FormatPrice(effectivePrice)}</span>
                {specialPrice && (
                    <span className="text-xs text-slate-400 line-through">
                        {FormatPrice(price)}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between md:justify-end text-sm font-semibold text-slate-900">
                <span>{FormatPrice(totalPrice)}</span>
            </div>
        </div>
    )
}
export default ItemContent