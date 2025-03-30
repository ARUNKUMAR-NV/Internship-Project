import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container, 
  Box,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { 
  Email as EmailIcon, 
  Person as PersonIcon, 
  Phone as PhoneIcon, 
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import "./AuthPage.css";

const AuthPage = ({ isSignUpMode = false, setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle Signup/Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate form data
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          throw new Error("All fields are required");
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          throw new Error("Please enter a valid email address");
        }
        
        // Password validation (at least 6 characters)
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        const response = await axios.post("http://localhost:3019/signup", formData);
        setLoading(false);
        alert(response.data.message);
        setIsSignUp(false);
        navigate("/login");
      } else {
        const loginResponse = await axios.post("http://localhost:3019/login", {
          email: formData.email,
          password: formData.password,
        });
        
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        setLoading(false);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-paper">
        <Box className="auth-header">
          <Typography variant="h4" className="auth-title">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Typography>
          <Typography variant="body" className="auth-subtitle">
            {isSignUp ? "Sign up to get started" : "Sign in to continue"}
          </Typography>
        </Box>

        {error && (
          <Box className="error-message">
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {isSignUp && (
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <Box className="auth-footer">
          <Typography variant="body2">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              color="primary"
              className="toggle-link"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
