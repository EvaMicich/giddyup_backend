const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    //required: [true, 'User must have a first name'],
    trim: true,
    maxlength: [40, 'User first name must be less than or equal to 40 chars'],
    minlength: [1, 'User first name must be greater than or equal to 1 chars'],
  },
  lastName: {
    type: String,
    //required: [true, 'A user must have a last name'],
    trim: true,
    maxlength: [40, 'User last name must be less than or equal to 40 chars'],
    minlength: [1, 'User last name must be greater than or equal to 1 chars'],
  },
  email: {
    type: String,
    //required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18 years old'],
    max: [100, 'Age must be less than or equal to 100 years old'],
    //required: [true, 'Age is required'],
  },
  statusLevel: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    default: 'bronze',
  },
  phoneNumber: {
    type: String,
    //required: [true, 'Phone number is required'],
    unique: true,
    maxlength: [10, 'Phone number must be exactly 10 digits'],
    minlength: [10, 'Phone number must be exactly 10 digits'],
  },
  address: {
    streetAddress: {
      type: String,
      //required: [true, 'Street address is required'],
      minlength: [1, 'Street address must be at least 1 character'],
      maxlength: [40, 'Street address must be at most 40 characters'],
    },
    suburb: {
      type: String,
      //required: [true, 'Suburb is required'],
      minlength: [1, 'Suburb must be at least 1 character'],
      maxlength: [40, 'Suburb must be at most 40 characters'],
    },
    postcode: {
      type: String,
      //required: [true, 'Postcode is required'],
      minlength: [1, 'Postcode must be at least 1 character'],
      maxlength: [40, 'Postcode must be at most 40 characters'],
    },
  },
  profileImage: {
    type: String,
  },
  aboutMe: {
    type: String,
    maxlength: 200,
    default: "I'm a happy camper!",
  },
  ratingsAverage: {
    type: Number,
    min: [3.5, 'Ratings average must be at least 3.5'],
    max: [5.0, 'Ratings average must not exceed 5.0'],
    default: 0,
    get: (val) => Math.round(val * 10) / 10, // Round to one decimal place
  },
  ratingsCount: {
    type: Number,
    default: 0,
  },
  preferences: {
    type: String,
    enum: ['music', 'pets', 'talking', 'dancing', 'seahorses'],
    default: 'music',
  },
  car: {
    make: {
      type: String,
      trim: true,
      maxlength: [40, 'Car make must be less than or equal to 40 chars'],
    },
    model: {
      type: String,
      trim: true,
      maxlength: [40, 'Car model must be less than or equal to 40 chars'],
    },
    year: {
      type: Number,
      min: [1900, 'Car year must be at least 1900'],
    },
    availableSeats: {
      type: Number,
      min: [1, 'Available seats must be at least 1'],
      max: [10, 'Available seats must be at most 10'],
    },
  },
  latestActivity: {
    ridesOffered: {
      type: Number,
      default: 0,
    },
    ridesTaken: {
      type: Number,
      default: 0,
    },
    lastRide: {
      type: Date,
      default: Date.now, // This sets the default value to the current date and time
    },
  },
  userStats: {
    totalDistanceTravelled: {
      type: Number,
      default: 0,
    },
    emissionsSaved: {
      type: Number,
      default: 0,
    },
    dollarsSaved: {
      type: Number,
      deafult: 0,
    },
  },
  verified: {
    driverLicense: {
      type: Boolean,
      default: false, // Set the default value as needed
    },
    phoneVerified: {
      type: Boolean,
      default: false, // Set the default value as needed
    },
  },
  socials: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String, // LinkedIn profile link
    },
  },
});

// {
//   toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
//   toObject: { virtuals: true }, // Enable virtuals to be included in object output
// },

// // Define the virtual field for fullName
// userSchema.virtual('fullName').get(function() {
//   // eslint-disable-next-line
//   return this.firstName + ' ' + this.lastName;
// }); //prettier-ignore

const User = mongoose.model('User', userSchema);

module.exports = User;
