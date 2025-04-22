import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tab,
  Tabs
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userLogOpen, setUserLogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const emptyProduct = {
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
    rating: { rate: 0, count: 0 }
  };
  
  const [newProduct, setNewProduct] = useState(emptyProduct);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get("https://backend-livid-delta-17.vercel.app/getpro");
      setProducts(resp.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://backend-livid-delta-17.vercel.app/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleOpenUserLog = () => {
    fetchUsers();
    setUserLogOpen(true);
  };

  const handleBlockUnblockUser = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active";
      await axios.put(`https://backend-livid-delta-17.vercel.app/${id}`, { status: newStatus });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://backend-livid-delta-17.vercel.app/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setNewProduct({
        ...newProduct,
        rating: { ...newProduct.rating, [name]: value }
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleOpenAddModal = () => {
    setNewProduct(emptyProduct);
    setOpen(true);
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("https://backend-livid-delta-17.vercel.app/product", newProduct);
      alert("Product added successfully!");
      setOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      ...product,
      rating: { rate: product.rating.rate, count: product.rating.count }
    });
    setUpdateOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`https://backend-livid-delta-17.vercel.app/${selectedProduct._id}`, newProduct);
      alert("Product updated successfully!");
      setUpdateOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://backend-livid-delta-17.vercel.app/${id}`);
        alert("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Users</div>
          <div className="stat-value">
            {users.filter(user => user.status === "active").length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Blocked Users</div>
          <div className="stat-value">
            {users.filter(user => user.status === "blocked").length}
          </div>
        </div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab 
          label="Product Management" 
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500', fontSize: '1 rem' }} 
        />
        <Tab 
          label="User Management" 
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500', fontSize: '1 rem' }} 
        />
      </Tabs>
    </Box>

      {activeTab === 0 ? (
        <>
          <div className="section-header">
            <h2>Product Management</h2>
            <button className="add-button" onClick={handleOpenAddModal}>
              <AddIcon /> Add Product
            </button>
          </div>

          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.rating.rate} ⭐ ({product.rating.count} reviews)
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdateClick(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <div className="section-header">
            <h2>User Management</h2>
          </div>

          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={user.status === "active" ? "error" : "success"}
                        onClick={() => handleBlockUnblockUser(user._id, user.status)}
                        sx={{ mr: 1 }}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Add Product Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="modal-container">
          <Typography variant="h6" className="modal-title">
            Add New Product
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            label="Rating"
            name="rate"
            type="number"
            value={newProduct.rating.rate}
            onChange={handleChange}
            sx={{ width: "48%", mr: 1 }}
          />
          <TextField
            margin="normal"
            label="Review Count"
            name="count"
            type="number"
            value={newProduct.rating.count}
            onChange={handleChange}
            sx={{ width: "48%" }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpen(false)} 
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Update Product Modal */}
      <Modal open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <Box className="modal-container">
          <Typography variant="h6" className="modal-title">
            Update Product
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            label="Rating"
            name="rate"
            type="number"
            value={newProduct.rating.rate}
            onChange={handleChange}
            sx={{ width: "48%", mr: 1 }}
          />
          <TextField
            margin="normal"
            label="Review Count"
            name="count"
            type="number"
            value={newProduct.rating.count}
            onChange={handleChange}
            sx={{ width: "48%" }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button 
              variant="outlined" 
              onClick={() => setUpdateOpen(false)} 
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
