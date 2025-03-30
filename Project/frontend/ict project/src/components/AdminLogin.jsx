import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Container, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./AdminLogin.css";

const AdminLogin = ({ setIsAdmin }) => {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validAdmin = { email: "admin@example.com", password: "admin123" };
    
    if (adminData.email === validAdmin.email && adminData.password === validAdmin.password) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="admin-login-container">
      <Paper elevation={3} className="admin-login-paper">
        <Box className="admin-login-icon">
          <LockOutlinedIcon fontSize="large" />
        </Box>
        <Typography component="h1" variant="h5" fontWeight={500} >
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={adminData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={adminData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="admin-login-submit"
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" className="admin-login-error">
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
