import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";
import { ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, Truck, RotateCcw } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const { cartItems, addToCart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

  // Parse ID since params are strings and product IDs in data are likely numbers.
  const product = products.find((p) => p.id === parseInt(id));
  const cartItem = cartItems?.find((item) => item.id === product?.id);

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQty(product.id);
    }
  };

  if (!product) {
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
        <div className="w-full lg:w-1/2 shrink-0 relative overflow-hidden rounded-4xl bg-slate-50 shadow-inner group">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full min-h-[400px] object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Right Side: Product Information */}
        <div className="w-full lg:w-1/2 flex flex-col pt-8 lg:pt-4 pb-4">
          <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 font-bold rounded-full text-xs tracking-widest uppercase mb-6 self-start">
            Premium Choice
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            {product.title}
          </h1>
          
          <p className="text-4xl font-black text-blue-600 mb-6 drop-shadow-sm">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
            Immerse yourself in exceptional quality and stunning design. This product has been meticulously engineered to deliver top-tier performance to effortlessly compliment your premium lifestyle. Highly recommended for enthusiasts and professionals alike.
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
