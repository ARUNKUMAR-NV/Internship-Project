import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import AuthPage from "./components/AuthPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Checkout from "./components/Checkout";
import CartPage from "./components/CartPage";
import Products from "./components/products";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

function App() {
    const navigate = useNavigate();

    // ✅ Load session from localStorage before setting state
    const getInitialLoginState = () => {
        return localStorage.getItem("isLoggedIn") === "true";
    };

    const getInitialAdminState = () => {
        return localStorage.getItem("isAdmin") === "true";
    };

    const getInitialCartState = () => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    };

    // ✅ Define states
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);
    const [isAdmin, setIsAdmin] = useState(getInitialAdminState);
    const [cart, setCart] = useState(getInitialCartState);

    // ✅ Update localStorage whenever login/cart state changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [isLoggedIn, isAdmin, cart]);

    // ✅ Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
    };

    return (
        <>
            <Navbar 
                isLoggedIn={isLoggedIn} 
                isAdmin={isAdmin} 
                setIsLoggedIn={setIsLoggedIn} 
                setIsAdmin={setIsAdmin} 
                handleLogout={handleLogout} 
            />
            
            <Routes>

                <Route path="/" element={<ProductPage isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} isAdmin={isAdmin} />} />
                <Route path="/login" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />


                <Route 
                    path="/admin-dashboard" 
                    element={isAdmin ? <AdminDashboard /> : <AdminLogin setIsAdmin={setIsAdmin} />} 
                />


                <Route 
                    path="/checkout" 
                    element={isLoggedIn ? <Checkout cart={cart} /> : <AuthPage setIsLoggedIn={setIsLoggedIn} />} 
                />

                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage/>} />

                <Route path="/products" element={<Products isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} isAdmin={isAdmin} />} />
            </Routes>
        </>
    );
}

export default App;
