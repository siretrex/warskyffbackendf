const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    trim: true,
  },
  referral_code:{
    type: String,
  },
  phone_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
