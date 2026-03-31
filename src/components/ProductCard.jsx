import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";

function ProductCard({ product }) {

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useContext(CartContext);

  const cartItem = cartItems?.find(
    (item) => item.id === product.id
  );

  const handleDecrease = () => {

    if (cartItem.quantity === 1) {

      removeFromCart(product.id);

    } else {

      decreaseQty(product.id);

    }

  };

  return (

    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">

      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-square overflow-hidden bg-white p-6 block"
      >

        {/* ✅ FIXED IMAGE FIELD */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />

      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow">

        <Link
          to={`/product/${product.id}`}
          className="grow group/link"
        >

          <h2 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug group-hover/link:text-blue-600 transition-colors">

            {product.title}

          </h2>

          <p className="text-xl font-extrabold text-blue-600 mt-2">

            ${product.price?.toFixed(2)}

          </p>

        </Link>

        {/* Cart Controls */}
        <div className="mt-5 h-[48px]">

          {cartItem ? (

            <div className="h-full flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-1.5">

              <button
                onClick={handleDecrease}
                className="px-4 h-9 flex items-center justify-center rounded-lg hover:bg-white text-blue-600"
              >

                <Minus size={18} strokeWidth={2.5} />

              </button>

              <span className="font-bold text-slate-800">

                {cartItem.quantity}

              </span>

              <button
                onClick={() => increaseQty(product.id)}
                className="px-4 h-9 flex items-center justify-center rounded-lg hover:bg-white text-blue-600"
              >

                <Plus size={18} strokeWidth={2.5} />

              </button>

            </div>

          ) : (

            <button
              onClick={() => addToCart(product)}
              className="w-full h-full bg-slate-900 hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
            >

              <ShoppingCart size={18} />

              Add to Cart

            </button>

          )}

        </div>

      </div>

    </div>

  );

}

export default ProductCard;