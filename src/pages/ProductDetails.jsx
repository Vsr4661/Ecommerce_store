import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();

  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Correct API fetch
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok)
          throw new Error("Failed to fetch product");

        const data = await response.json();

        setProduct(data); // correct structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const cartItem = cartItems?.find(
    (item) => item.id === product?.id
  );

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQty(product.id);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-slate-200 border-t-blue-600 mb-4"></div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          Product Not Found
        </h2>

        <p className="text-slate-500 mb-8">
          The item you are looking for might have been removed.
        </p>

        <Link
          to="/"
          className="text-blue-600 font-bold hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8"
      >
        <ArrowLeft size={20} />
        Back to Catalog
      </Link>

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col lg:flex-row p-6 gap-8">

        {/* Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">

          {/* ✅ DummyJSON uses thumbnail */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-h-[500px] object-contain"
          />

        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">

          {/* Category */}
          <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full text-xs mb-4">
            {product.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
            {product.title}
          </h1>

          {/* Price + Rating */}
          <div className="flex items-center gap-2 mb-6">

            <span className="text-4xl font-black text-blue-600">
              ${product.price?.toFixed(2)}
            </span>

            {/* ✅ DummyJSON rating fix */}
            {product.rating && (
              <span className="ml-4 bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-sm">
                ★ {product.rating}
              </span>
            )}

          </div>

          {/* Description */}
          <p className="text-slate-600 text-lg mb-10">
            {product.description}
          </p>

          {/* Features */}
          <div className="bg-slate-50 border rounded-3xl p-6 mb-10 space-y-4">

            <div className="flex items-center gap-4">
              <ShieldCheck size={20} />
              <span className="font-semibold text-sm">
                1 Year Authenticity Guarantee
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Truck size={20} />
              <span className="font-semibold text-sm">
                Fast, Free Shipping
              </span>
            </div>

            <div className="flex items-center gap-4">
              <RotateCcw size={20} />
              <span className="font-semibold text-sm">
                30-Day Returns
              </span>
            </div>

          </div>

          {/* Cart Controls */}
          <div className="mt-auto h-[60px]">

            {cartItem ? (

              <div className="flex items-center justify-between bg-blue-50 border rounded-2xl px-3 h-full">

                <button
                  onClick={handleDecrease}
                  className="px-6 h-11 bg-white rounded-xl"
                >
                  <Minus size={22} />
                </button>

                <span className="text-2xl font-black">
                  {cartItem.quantity}
                </span>

                <button
                  onClick={() => increaseQty(product.id)}
                  className="px-6 h-11 bg-white rounded-xl"
                >
                  <Plus size={22} />
                </button>

              </div>

            ) : (

              <button
                onClick={() => addToCart(product)}
                className="w-full h-full bg-black text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3"
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>

            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;