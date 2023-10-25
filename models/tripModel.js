const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A trip must have a name'],
    trim: true,
    maxlength: [40, 'A trip name must have less or equal then 40 characters'],
    minlength: [2, 'A trip name must have more or equal then 2 characters'],
  },
  rideBooked: {
    type: Boolean, 
    default: false,
  },
  origin: {
    type: String,
    required: [true, 'Trip must have an origin'],
    trim: true,
    maxlength: [40, 'Trip origin must be less than or equal to 40 chars'],
    minlength: [1, 'Trip origin must be greater than or equal to 1 chars'],
  },
  destination: {
    type: String,
    required: [true, 'Trip must have a destination'],
    trim: true,
    maxlength: [40, 'Trip destination must be less than or equal to 40 chars'],
    minlength: [1, 'Trip destination must be greater than or equal to 1 chars'],
  },
  deptDateTime: {
    type: Date,
    required: [true, 'Trip must have a date and time']
  },
  tripLength: {
    type: Number,
    min: [1, 'Trip length must be at least 1 km'],
    max: [1000, 'Trip length must be less than or equal to 1000 km'],
    required: [true, 'Trip length is required'],
  },
  pickUpCoords: {
    type: String,
    required: [false],
  },
  driver:  {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Driver is required'],
  }, 
  passenger:  {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [false],
  }, 
  

  // }



});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
