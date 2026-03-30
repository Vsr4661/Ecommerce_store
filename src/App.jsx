import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route, useSearchParams } from "react-router-dom";

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen relative text-slate-800 font-sans selection:bg-blue-200 overflow-x-hidden">
      {/* Nice Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50">
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
      </div>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 sm:pb-8">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <div className="animate-in fade-in duration-500 relative z-10">
                
                {/* Hero Section */}
                <div className="mb-12 py-12 sm:py-16 px-8 sm:px-12 bg-linear-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-1000 mix-blend-overlay" style={{backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')"}}></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        Elevate Your Lifestyle with Premium Tech.
                      </h1>
                      <p className="text-lg sm:text-xl text-blue-100 mb-8 font-medium leading-relaxed">
                        Discover our curated collection of premium accessories designed for those who appreciate quality, power, and stunning aesthetics.
                      </p>
                      <button className="bg-white text-indigo-600 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95">
                        Explore Collection
                      </button>
                    </div>

                    {/* Right Side Tech Image */}
                    <div className="hidden md:block w-full max-w-sm lg:max-w-md relative group-hover:scale-105 transition-transform duration-700">
                      {/* Decorative Glow */}
                      <div className="absolute inset-0 bg-blue-300/40 blur-[50px] rounded-full"></div>
                      
                      <img 
                        src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop" 
                        alt="Premium Headphones" 
                        className="relative z-10 w-full h-auto object-cover rounded-4xl shadow-2xl -rotate-6 group-hover:rotate-0 transition-transform duration-500 border border-white/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Latest Arrivals ✨
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 animate-in fade-in zoom-in duration-500">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-6xl text-slate-300 drop-shadow-sm">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">No products found</h3>
                        <p className="text-slate-500 font-medium text-lg">We couldn't find anything matching "<span className="text-indigo-600">{(query.length > 20 ? query.substring(0, 20) + '...' : query)}</span>".</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            }
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Product Details (Dynamic Route) */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;