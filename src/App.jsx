import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // ✅ Fixed API fetch
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "https://dummyjson.com/products"
        );

        if (!response.ok)
          throw new Error("Failed to fetch products");

        const data = await response.json();

        // ✅ IMPORTANT FIX
        setProducts(data.products);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  // Search Filter
  const filteredProducts = products.filter(product =>
    product.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (

    <div className="min-h-screen relative text-slate-800 font-sans selection:bg-blue-200 overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50">

        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-3xl opacity-70"></div>

        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl opacity-70"></div>

        <div className="absolute -bottom-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-3xl opacity-70"></div>

      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">

        <Routes>

          {/* Home Page */}
          <Route
            path="/"
            element={

              <div>

                {/* Hero */}
                <div className="mb-12 py-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white">

                  <h1 className="text-4xl font-extrabold mb-6">
                    Elevate Your Lifestyle with Premium Tech.
                  </h1>

                  <p className="text-lg mb-8">
                    Discover premium accessories designed for modern users.
                  </p>

                </div>

                {/* Section Title */}
                <h2 className="text-3xl font-extrabold mb-8">
                  Latest Arrivals ✨
                </h2>

                {/* Loading */}
                {loading ? (

                  <div className="flex justify-center py-20">

                    <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-slate-200 border-t-blue-600"></div>

                  </div>

                ) : error ? (

                  <div className="text-center text-red-500 py-16">

                    <p className="font-bold text-lg">Oops!</p>

                    <p>{error}</p>

                  </div>

                ) : (

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {filteredProducts.length > 0 ? (

                      filteredProducts.map(product => (

                        <ProductCard
                          key={product.id}
                          product={product}
                        />

                      ))

                    ) : (

                      <div className="col-span-full text-center py-20">

                        <h3 className="text-2xl font-bold">
                          No products found
                        </h3>

                      </div>

                    )}

                  </div>

                )}

              </div>

            }
          />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

        </Routes>

      </main>

    </div>

  );

}

export default App;