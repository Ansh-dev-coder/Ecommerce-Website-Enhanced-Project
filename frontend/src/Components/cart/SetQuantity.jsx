const btnStyles = "inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-300 bg-white text-slate-900 text-base font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"

const SetQuantity = ({
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
    return (
        <div className="flex items-center gap-3">
            {!cardCounter && (
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Quantity
                </div>
            )}

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                <button
                    type="button"
                    onClick={handleQtyDecrease}
                    disabled={quantity <= 1}
                    className={btnStyles}
                >
                    -
                </button>

                <div className="min-w-[2rem] text-center text-sm font-semibold text-slate-700">
                    {quantity}
                </div>

                <button
                    type="button"
                    onClick={handleQtyIncrease}
                    className={btnStyles}
                >
                    +
                </button>
            </div>
        </div>
    )
}
export default SetQuantity