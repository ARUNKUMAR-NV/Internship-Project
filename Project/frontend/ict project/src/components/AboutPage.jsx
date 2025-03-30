import React from "react";
import { Container, Grid, Paper, Box, Button } from "@mui/material";
import { FiShoppingBag, FiUsers, FiTruck, FiHeadphones } from "react-icons/fi";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <Container className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Electro Shop</h1>
        <div className="about-subtitle">Your Trusted Shopping Destination</div>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className="about-content">
            <h2>Our Story</h2>
            <p >
              Founded in 2023, Electro Shop started with a simple mission: to make quality products accessible to everyone. What began as a small online store has grown into a comprehensive e-commerce platform offering thousands of products across multiple categories.
            </p>
            <p>
              We believe in creating a shopping experience that's not just about transactions, but about building relationships with our customers. Every product we offer is carefully selected to ensure quality, value, and satisfaction.
            </p>
            <p>
              Our team is dedicated to continuous improvement, constantly seeking new ways to enhance your shopping experience and bring you the products you love at prices you'll appreciate.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="about-image-container">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
              alt="Team working together" 
              className="about-image"
            />
          </div>
        </Grid>
      </Grid>

      <div className="values-section">
        <h2 className="section-title">Our Values</h2>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="value-card">
              <FiUsers className="value-icon" />
              <h3>Customer First</h3>
              <p>We prioritize customer satisfaction in everything we do, making your experience our top concern.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="value-card">
              <FiShoppingBag className="value-icon" />
              <h3>Quality Products</h3>
              <p>We carefully select each product to ensure it meets our high standards for quality and value.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="value-card">
              <FiTruck className="value-icon" />
              <h3>Fast Delivery</h3>
              <p>We understand the excitement of receiving your purchase, so we ensure quick and reliable shipping.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="value-card">
              <FiHeadphones className="value-icon" />
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is always available to assist you with any questions or concerns.</p>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div className="team-section">
        <h2 className="section-title">Our Team</h2>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper className="team-card">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                alt="CEO" 
                className="team-image"
              />
              <h3>John Doe</h3>
              <p className="team-role">Founder & CEO</p>
              <p>With over 15 years of experience in retail and e-commerce, John leads our company with vision and passion.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="team-card">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80" 
                alt="COO" 
                className="team-image"
              />
              <h3>Jane Smith</h3>
              <p className="team-role">Chief Operations Officer</p>
              <p>Jane ensures our operations run smoothly, from inventory management to order fulfillment and delivery.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="team-card">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                alt="CTO" 
                className="team-image"
              />
              <h3>Michael Johnson</h3>
              <p className="team-role">Chief Technology Officer</p>
              <p>Michael leads our tech team, ensuring our platform provides a seamless and secure shopping experience.</p>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div className="cta-section">
        <Paper className="cta-container">
          <h2>Ready to Start Shopping?</h2>
          <p>Discover our wide range of products and experience the Electro Shop difference today.</p>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => window.location.href = '/products'}
            className="cta-button"
          >
            Shop Now
          </Button>
        </Paper>
      </div>
    </Container>
  );
};

export default AboutPage;
