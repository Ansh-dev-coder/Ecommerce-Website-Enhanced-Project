import { formatPriceCalculation } from "../utils/FormatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 space-y-4">
        <section className="checkout-card p-6 sm:p-7">
          <h2 className="checkout-section-title text-xl font-semibold text-slate-900">Billing address</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p><span className="font-semibold text-slate-800">Building Name:</span> {address?.buildingName}</p>
            <p><span className="font-semibold text-slate-800">Street:</span> {address?.street}</p>
            <p><span className="font-semibold text-slate-800">City:</span> {address?.city}</p>
            <p><span className="font-semibold text-slate-800">State:</span> {address?.state}</p>
            <p><span className="font-semibold text-slate-800">Pincode:</span> {address?.pincode}</p>
            <p><span className="font-semibold text-slate-800">Country:</span> {address?.country}</p>
          </div>
        </section>

        <section className="checkout-card p-6 sm:p-7">
          <h2 className="checkout-section-title text-xl font-semibold text-slate-900">Payment method</h2>
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Method:</span> {paymentMethod}
          </p>
        </section>

        <section className="checkout-card p-6 sm:p-7">
          <h2 className="checkout-section-title text-xl font-semibold text-slate-900">Order items</h2>

          <div className="mt-4 flex flex-col gap-4">
            {cart?.map((item) => (
              <div
                key={item?.productId}
                className="flex items-center gap-4 border-b border-slate-200 pb-4 last:border-none last:pb-0"
              >
                <img
                  src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                  alt={item?.productName}
                  className="h-20 w-20 rounded-2xl border border-slate-200 object-cover"
                />

                <div>
                  <p className="font-semibold text-slate-800">{item?.productName}</p>
                  <p className="text-sm text-slate-600">{item?.quantity} × ₹{item?.specialPrice}</p>
                  <p className="font-medium text-slate-800">₹{formatPriceCalculation(item?.quantity, item?.specialPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="w-full lg:w-[320px]">
        <div className="checkout-card sticky top-5 p-6 sm:p-7">
          <h2 className="checkout-section-title text-xl font-semibold text-slate-900">Order summary</h2>

          <div className="mt-4">
            <div className="checkout-summary-row">
              <span className="text-slate-600">Products</span>
              <span className="font-medium text-slate-800">₹{formatPriceCalculation(totalPrice, 1)}</span>
            </div>

            <div className="checkout-summary-row">
              <span className="text-slate-600">Tax (0%)</span>
              <span className="font-medium text-slate-800">₹0</span>
            </div>

            <div className="checkout-summary-total">
              <span>Subtotal</span>
              <span>₹{formatPriceCalculation(totalPrice, 1)}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default OrderSummary;