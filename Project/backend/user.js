const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const user = mongoose.model("User", userSchema);

module.exports = user;
