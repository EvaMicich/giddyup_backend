const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A trip must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A trip name must have less or equal then 40 characters'],
    minlength: [10, 'A trip name must have more or equal then 10 characters'],
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
