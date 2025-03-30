import React, { useState } from "react";
import { 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Box,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiSend
} from "react-icons/fi";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    // Show success message
    setSnackbar({
      open: true,
      message: "Your message has been sent! We'll get back to you soon.",
      severity: "success"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "general"
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-subtitle">We'd love to hear from you</div>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper className="contact-info-container">
            <h2>Get In Touch</h2>
            <p className="info-text">
              Have questions about our products or services? Need help with an order?
              Our team is ready to assist you.
            </p>
            
            <div className="contact-info-item">
            <br></br>
              <FiMapPin className="contact-icon" /> 
              <div>
                <h3>Our Location</h3>
                <p>123 E-Commerce Street, Digital City, 10001</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <FiPhone className="contact-icon" />
              <div>
                <h3>Phone Number</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <FiMail className="contact-icon" />
              <div>
                <h3>Email Address</h3>
                <p>support@ElecroShop.com</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <FiClock className="contact-icon" />
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper className="contact-form-container">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Inquiry Type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="order">Order Status</MenuItem>
                    <MenuItem value="product">Product Information</MenuItem>
                    <MenuItem value="return">Returns & Refunds</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className="submit-button"
                    startIcon={<FiSend />}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      
      <div className="map-container">
        <h2 className="map-title">Find Us</h2>
        <Paper className="map-paper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1630597543261!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Electro Shop Location"
          ></iframe>
        </Paper>
      </div>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;
