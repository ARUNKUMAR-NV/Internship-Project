import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Container, 
  Paper, 
  TextField, 
  Grid, 
  Button, 
  Box, 
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from "@mui/material";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const discount = location.state?.discount || 0;
  
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "Credit Card",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userDetails.fullName.trim()) newErrors.fullName = "Name is required";
    if (!userDetails.email.trim()) newErrors.email = "Email is required";
    if (!userDetails.address.trim()) newErrors.address = "Address is required";
    if (!userDetails.city.trim()) newErrors.city = "City is required";
    if (!userDetails.state.trim()) newErrors.state = "State is required";
    if (!userDetails.zip.trim()) newErrors.zip = "ZIP code is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userDetails.email && !emailRegex.test(userDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validateForm()) {
      return;
    }
    
    alert("Order placed successfully!");
    navigate("/");
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  if (cartItems.length === 0) {
    return (
      <Container className="checkout-container">
        <Paper elevation={3} className="empty-checkout">
          <h2>No items in checkout</h2>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/products")}
            className="shop-now-btn"
          >
            Shop Now
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <p className="product-page-subtitl">Review your items and proceed to checkout</p>
      <br></br>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="checkout-form">
            <h2 className="section-title">Shipping Information</h2>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={userDetails.fullName}
                  onChange={handleInputChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={userDetails.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={userDetails.state}
                  onChange={handleInputChange}
                  error={!!errors.state}
                  helperText={errors.state}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zip"
                  value={userDetails.zip}
                  onChange={handleInputChange}
                  error={!!errors.zip}
                  helperText={errors.zip}
            
                />
              </Grid>
            </Grid>
            
            <h2 className="section-title payment-title">Payment Method</h2>
            
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                value={userDetails.paymentMethod}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Credit Card"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="Bank Transfer"
                  control={<Radio />}
                  label="Bank Transfer"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            <Divider />
            
            <Box className="cart-items">
              {cartItems.map((item) => (
                <Box key={item.id} className="cart-item">
                  <Box className="item-info">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </Box>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </Box>
              ))}
            </Box>
            
            <Divider />
            
            <Box className="summary-row">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </Box>
            
            <Box className="summary-row">
              <p>Shipping</p>
              <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
            </Box>
            
            <Box className="summary-row">
              <p>Tax (8%)</p>
              <p>${tax.toFixed(2)}</p>
            </Box>
            
            {discount > 0 && (
              <Box className="summary-row discount">
                <p>Discount</p>
                <p>-${discount.toFixed(2)}</p>
              </Box>
            )}
            
            <Divider />
            
            <Box className="summary-row total">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleOrder}
              className="place-order-btn"
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
