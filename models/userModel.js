const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'User must have a first name'],
    unique: true,
    trim: true,
    maxlength: [40, 'User first name must be less than or equal to 40 chars'],
    minlength: [10, 'User first name must be greater than or equal to 10 chars'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    unique: true,
    trim: true,
    maxlength: [40, 'User last name must be less than or equal to 40 chars'],
    minlength: [10, 'User last name must be greater than or equal to 10 chars'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
