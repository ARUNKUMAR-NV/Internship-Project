import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import "./Products.css";

const Products = ({ isLoggedIn, cart, setCart,isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products from your MongoDB backend
      const resp = await axios.get("https://backend-livid-delta-17.vercel.app/getpro");
      setProducts(resp.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(resp.data.map(product => product.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<span>${product.title} added to cart!</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }, 100);
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { cartItems: [{ ...product, quantity: 1 }] } });
  };

  const handleAction = (action, product) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      if (action === 'buy') {
        handleBuyNow(product);
      } else {
        addToCart(product);
      }
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="products-page">
      <div className="products-page-header">
        <h1 className="products-page-title">Our Products</h1>
        <p className="products-page-subtitle">Discover our collection of amazing products</p>
      </div>

      <div className="category-filter">
        <button 
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Products
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-rating">
                    <div className="product-rating-stars">
                      <FiStar className={product.rating.rate >= 1 ? "star-filled" : ""} />
                      <FiStar className={product.rating.rate >= 2 ? "star-filled" : ""} />
                      <FiStar className={product.rating.rate >= 3 ? "star-filled" : ""} />
                      <FiStar className={product.rating.rate >= 4 ? "star-filled" : ""} />
                      <FiStar className={product.rating.rate >= 5 ? "star-filled" : ""} />
                    </div>
                    <span className="product-rating-count">({product.rating.count} reviews)</span>
                  </div>
                  <p className="product-price">${product.price}</p>
                  <div className="product-buttons">
                  {!isAdmin && (
                    <button
                      className="product-button buy-now-button"
                      onClick={() => handleAction('buy', product)}
                    >
                      Buy Now
                    </button>
                  )}
                  {!isAdmin && (
                    <button
                      className="product-button add-to-cart-button"
                      onClick={() => handleAction('cart', product)}
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
