const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-4">
        
        {/* Address */}
        <section className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Billing Address</h2>

          <p><span className="font-semibold">Building Name:</span> {address?.buildingName}</p>
          <p><span className="font-semibold">Street:</span> {address?.street}</p>
          <p><span className="font-semibold">City:</span> {address?.city}</p>
          <p><span className="font-semibold">State:</span> {address?.state}</p>
          <p><span className="font-semibold">Pincode:</span> {address?.pincode}</p>
          <p><span className="font-semibold">Country:</span> {address?.country}</p>
        </section>

        {/* Payment */}
        <section className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <p>
            <span className="font-semibold">Method:</span> {paymentMethod}
          </p>
        </section>

        {/* Items */}
        <section className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>

          <div className="flex flex-col gap-4">
            {cart?.map((item) => (
              <div
                key={item?.productId}
                className="flex items-center gap-4 border-b pb-4 last:border-none"
              >
                <img
                  src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                  alt={item?.productName}
                  className="w-20 h-20 object-cover rounded-xl border"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    {item?.productName}
                  </p>

                  <p className="text-slate-600">
                    {item?.quantity} × ₹{item?.specialPrice}
                  </p>

                  <p className="font-medium text-slate-800">
                    ₹{item?.quantity * item?.specialPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Section */}
      <aside className="w-full lg:w-[320px]">
        <div className="bg-white p-5 rounded-2xl shadow-md sticky top-5">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Products</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Tax (0%)</span>
            <span>₹0</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default OrderSummary;