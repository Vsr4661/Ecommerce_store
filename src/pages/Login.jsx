import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, UserCircle } from "lucide-react";

function Login() {
  return (
    <div className="max-w-md mx-auto my-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Login Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-2xl shadow-blue-900/5 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        
        {/* Top Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="mx-auto w-16 h-16 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
            <UserCircle size={32} className="stroke-2" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
        </div>

        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 hover:border-blue-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-slate-800 placeholder:text-slate-400 font-medium outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-sm font-bold text-blue-600 hover:text-indigo-600 transition-colors">Forgot password?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 hover:border-blue-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl text-slate-800 placeholder:text-slate-400 font-medium tracking-widest outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 group">
              Sign In
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </form>

        <p className="text-center mt-8 text-slate-500 font-medium">
          Don't have an account? <Link to="/login" className="text-blue-600 font-bold hover:text-indigo-600 transition-colors">Sign up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
