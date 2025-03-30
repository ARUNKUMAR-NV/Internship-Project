import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Typography, 
  IconButton, 
  Container,
  Paper,
  Grid,
  Box,
  TextField,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CartPage.css";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = React.useState("");

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Calculate total price
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPrice = subtotal.toFixed(2);

  // Proceed to checkout with cart items
  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems: cart } });
  };

  // Apply coupon code
  const handleApplyCoupon = () => {
    // You can implement coupon logic here
    alert("Coupon applied!");
  };

  return (
    <Container className="cart-page">
      <h1 className= "page-titl">
        <b> Your Shopping Cart </b>
      </h1>
      <p >Review your items and proceed to checkout</p>
      <br></br>
      {cart.length === 0 ? (
        <Paper className="empty-cart">
          <Typography variant="h6">Your cart is empty</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/products")}
            className="continue-shopping"
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className="cart-items-container">
              {cart.map((item) => (
                <Box key={item.id} className="cart-item">
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={3} sm={2}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="product-image" 
                      />
                    </Grid>
                    <Grid item xs={9} sm={5}>
                      <Typography variant="h6" className="product-title">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="product-category">
                        Category: {item.category}
                      </Typography>
                      <Typography variant="body2" className="product-price-each">
                        ${item.price} each
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} className="quantity-control">
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography className="quantity">
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={2} className="item-total">
                      <Typography variant="subtitle1" className="total-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={1} className="remove-item">
                      <IconButton 
                        color="error" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Paper>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
              className="continue-shopping"
            >
              CONTINUE SHOPPING
            </Button>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper className="order-summary">
              <Typography variant="h6" className="summary-title">
                Order Summary
              </Typography>
              <Divider />
              
              <Box className="summary-row">
                <Typography>Subtotal ({cart.length} items)</Typography>
                <Typography>${totalPrice}</Typography>
              </Box>
              
              <Box className="summary-row">
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Divider />
              
              <Box className="summary-row total">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${totalPrice}</Typography>
              </Box>
              
              <Box className="coupon-section">
                <Typography variant="body2">Have a coupon code?</Typography>
                <Box className="coupon-input-group">
                  <TextField
                    size="small"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleApplyCoupon}
                    className="apply-button"
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                className=" checkout-button "
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
