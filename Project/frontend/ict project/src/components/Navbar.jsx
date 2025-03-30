import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiShoppingBag className="navbar-logo-icon" />
          <span>Electro Shop</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/products" className={`navbar-item ${location.pathname === '/products' ? 'active' : ''}`}>
            Products
          </Link>
          <Link to="/about" className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/contact" className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </div>

        <div className="navbar-actions">
          {isLoggedIn && (
            <button className="cart-button" onClick={() => navigate('/cart')}>
              <FiShoppingCart className="icon" />
              <span className="cart-label">Cart</span>
            </button>
          )}

          {isAdmin && (
          <button 
            className="auth-button admindashboard"
            color="inherit" 
            onClick={() => navigate('/admin-dashboard')}
          >
            Admin Dashboard
          </button>
        )}

          {isAdmin ? (
            <button className="auth-button admin" onClick={handleLogout}>
              <FiUser className="icon" />
              <span>Admin Logout</span>
            </button>
          ) : isLoggedIn ? (
            <button className="auth-button" onClick={handleLogout}>
              <FiUser className="icon" />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <button className="auth-button" onClick={() => navigate('/login')}>
                <FiUser className="icon" />
                <span>User Login</span>
              </button>
              <button className="auth-button admin" onClick={() => navigate('/admin-login')}>
                <FiUser className="icon" />
                <span>Admin Login </span>
              </button>
            </>
          )}
        </div>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
