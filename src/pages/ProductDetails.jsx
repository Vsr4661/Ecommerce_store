import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, Truck, RotateCcw } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const cartItem = cartItems?.find((item) => item.id === product?.id);

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQty(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-slate-200 border-t-blue-600 mb-4"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Product Not Found</h2>
        <p className="text-slate-500 mb-8">The item you are looking for might have been removed or does not exist.</p>
        <Link to="/" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in slide-in-from-bottom-8 fade-in duration-700 relative z-10">
      
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Catalog
      </Link>

      <div className="bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row gap-0 lg:gap-8 p-6 lg:p-10">
        
        {/* Left Side: Product Image (Takes up 50%) */}
        <div className="w-full lg:w-1/2 shrink-0 relative overflow-hidden rounded-4xl bg-white shadow-inner group p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full max-h-[500px] object-contain group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Right Side: Product Information */}
        <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-4 pb-4">
          <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 font-bold rounded-full text-xs tracking-widest uppercase mb-4 self-start">
            {product.category || "Premium Choice"}
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-4xl font-black text-blue-600 drop-shadow-sm">
              ${product.price?.toFixed(2)}
            </span>
            {product.rating && (
              <span className="ml-4 bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1">
                ★ {product.rating.rate} <span className="text-yellow-600/60 font-medium">({product.rating.count} reviews)</span>
              </span>
            )}
          </div>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium capitalize-first">
            {product.description}
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-10 space-y-4 shadow-sm">
            <div className="flex items-center gap-4 text-slate-700">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600"><ShieldCheck size={20} /></div>
              <span className="font-semibold text-sm">1 Year Authenticity Guarantee</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="p-2 bg-green-100 rounded-full text-green-600"><Truck size={20} /></div>
              <span className="font-semibold text-sm">Fast, Free Shipping on All Orders</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600"><RotateCcw size={20} /></div>
              <span className="font-semibold text-sm">30-Day Hassle Free Returns</span>
            </div>
          </div>

          <div className="mt-auto h-[60px]">
            {cartItem ? (
               <div className="h-full w-full flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-2xl px-3 transition-all">
                <button
                  onClick={handleDecrease}
                  className="w-auto px-6 h-11 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md text-blue-600 transition-all active:scale-95"
                >
                  <Minus size={22} strokeWidth={2.5} />
                </button>
                
                <span className="text-2xl font-black text-slate-800 tabular-nums">
                  {cartItem.quantity}
                </span>
                
                <button
                  onClick={() => increaseQty(product.id)}
                  className="w-auto px-6 h-11 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md text-blue-600 transition-all active:scale-95"
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="w-full h-full bg-linear-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/30 group"
              >
                <ShoppingCart size={22} className="transition-transform group-hover:-rotate-12" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
