import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";

function ProductCard({ product }) {
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

  const cartItem = cartItems?.find((item) => item.id === product.id);

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQty(product.id);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Image Container linked to Details Page */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-white p-6 block focus:outline-none">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <Link to={`/product/${product.id}`} className="grow group/link focus:outline-none">
          <h2 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug group-hover/link:text-blue-600 transition-colors">
            {product.title}
          </h2>
          <p className="text-xl font-extrabold text-blue-600 mt-2">
            ${product.price?.toFixed(2)}
          </p>
        </Link>

        {/* Action Button/Controls */}
        <div className="mt-5 h-[48px]">
          {cartItem ? (
             <div className="h-full flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-xl px-1.5 transition-all">
              <button
                onClick={handleDecrease}
                className="w-auto px-4 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-blue-600 transition-all active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>
              
              <span className="font-bold text-slate-800 tabular-nums">
                {cartItem.quantity}
              </span>
              
              <button
                onClick={() => increaseQty(product.id)}
                className="w-auto px-4 h-9 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-blue-600 transition-all active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-full h-full bg-slate-900 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-500/25 group/btn"
            >
              <ShoppingCart size={18} className="transition-transform group-hover/btn:-rotate-12" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;