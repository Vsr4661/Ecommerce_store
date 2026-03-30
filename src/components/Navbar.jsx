import { ShoppingCart, Home, Search, User, Settings, LogOut } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const query = searchParams.get("q") || "";

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500">
      <header className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl">
        <nav className="h-16 px-4 sm:px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-linear-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-md transition-all duration-300">
              <ShoppingCart size={20} className="stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 tracking-tight">
              TechZone
            </h1>
          </Link>

          {/* Links & Search (Desktop) */}
          <div className="hidden sm:flex items-center gap-6 grow justify-center px-8">
            <ul className="flex gap-1 p-1 bg-slate-100/60 border border-slate-200/60 rounded-full shrink-0">
              <li>
                <Link 
                  to="/" 
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center ${location.pathname === '/' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center ${location.pathname === '/cart' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                >
                  Cart
                </Link>
              </li>
            </ul>

            {/* Premium Search Bar */}
            <div className="relative w-full max-w-sm group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 rounded-full text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Cart Icon & Account / Action */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Account Dropdown (Desktop) */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 hover:text-blue-600 focus:outline-none">
                <User size={22} className="stroke-2" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-3 group-hover:translate-y-0 z-50">
                <div className="px-4 py-3 mb-2 bg-slate-50/80 rounded-xl">
                  <p className="text-sm font-bold text-slate-800">Welcome User,</p>
                  <p className="text-xs text-slate-500 font-medium truncate">user@techzone.com</p>
                </div>
                
                <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors">
                  <User size={16} /> Account Details
                </Link>
                <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors">
                  <Settings size={16} /> Settings
                </Link>
                
                <div className="h-px bg-slate-100 my-1 mx-2"></div>
                
                <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                  <LogOut size={16} /> Logout
                </Link>
              </div>
            </div>

            <Link 
              to="/cart" 
              className="group relative flex items-center gap-3 px-4 py-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-full transition-all duration-300 shadow-sm active:scale-95"
            >
              <ShoppingCart size={20} className="text-slate-700 group-hover:text-blue-600 transition-colors stroke-2" />
              <span className="hidden sm:inline font-bold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">Cart</span>
              
              {/* Cart Count Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-[11px] font-bold rounded-full border-2 border-white shadow-md animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
        </nav>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/60 border border-slate-200/60 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300"
            />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center h-16">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 w-full py-2 transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Home size={22} className={location.pathname === '/' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">Home</span>
          </Link>
          
          <Link 
            to="/login" 
            className={`flex flex-col items-center gap-1 w-full py-2 transition-colors ${location.pathname === '/login' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <User size={22} className={location.pathname === '/login' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>

          <Link 
            to="/cart" 
            className={`relative flex flex-col items-center gap-1 w-full py-2 transition-colors ${location.pathname === '/cart' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <ShoppingCart size={22} className={location.pathname === '/cart' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute top-1 right-[calc(50%-20px)] w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-[9px] font-bold rounded-full border border-white shadow-sm animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;