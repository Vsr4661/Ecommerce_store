import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-center">
          Looks like you haven't added anything to your cart yet. Discover great products and start shopping!
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-md hover:shadow-blue-500/30 flex items-center gap-2"
        >
          Start Shopping
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-6 border border-slate-100 shadow-sm transition-all hover:shadow-md"
            >
              {/* Product Info */}
              <div className="flex items-center gap-5 w-full sm:w-auto grow">
                <div className="w-24 h-24 sm:w-20 sm:h-20 shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grow">
                  <h2 className="font-bold text-slate-800 text-lg leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-blue-600 font-extrabold mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                {/* Quantity */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  aria-label="Remove item"
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-800">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="text-slate-800">₹0</span>
              </div>
            </div>
            
            <div className="border-t border-slate-200 mt-6 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl font-extrabold text-slate-900">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-blue-500/30 flex justify-center items-center gap-2 active:scale-[0.98]">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;