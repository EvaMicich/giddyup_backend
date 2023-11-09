const mongoose = require('mongoose');
const Trip = require('../models/tripModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.bookedTrips = catchAsync(async (req, res, next) => {
  const userId = req.query.passenger;
  // Find all trips where the user's ID is the passenger and ride is booked
  const bookedTrips = await Trip.find({
    passenger: userId,
    rideBooked: true,
  });

  res.status(200).json({
    status: 'success',
    results: bookedTrips.length,
    data: {
      trips: bookedTrips,
    },
  });
});

exports.bookingButton = catchAsync(async (req, res, next) => {
  const tripId = req.body._id;
  const passengerId = req.body.passenger;
  // Find the trip document by ID
  const trip = await Trip.findById(tripId);

  if (!trip) {
    return res.status(404).json({
      status: 'fail',
      message: 'Trip not found',
    });
  }
  // Check if the trip is already booked
  if (trip.rideBooked) {
    return res.status(400).json({
      status: 'fail',
      message: 'Trip is already booked',
    });
  }
  // Update the trip document
  trip.rideBooked = true;
  trip.passenger = passengerId;

  // Save the updated trip document
  await trip.save();
  res.status(200).json({
    status: 'success',
    message: 'Trip booked successfully',
    data: {
      trip,
    },
  });
});

exports.cancelTrip = catchAsync(async (req, res, next) => {
  const tripId = req.body._id;
  // Check if the tripId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid trip ID',
    });
  }
  // Find the trip document by ID
  const trip = await Trip.findById(tripId);

  if (!trip) {
    return res.status(404).json({
      status: 'fail',
      message: 'Trip not found or already cancelled',
    });
  }

  // Check if the trip is NOT already booked
  if (!trip.rideBooked) {
    return res.status(400).json({
      status: 'fail',
      message: 'Trip is not booked, you cant cancel',
    });
  }

  // Update the trip document to reflect the cancellation
  trip.rideBooked = false;
  trip.passenger = undefined; // This will remove the passenger field

  // Save the updated trip document
  await trip.save();

  res.status(200).json({
    status: 'success',
    message: 'Trip cancelled successfully',
    data: {
      trip,
    },
  });
});

exports.searchAllTrips = catchAsync(async (req, res, next) => {
  const { origin, destination, deptDate } = req.query;
  const deptDateObject = new Date(deptDate);

  // Perform a database query to find trips matching the criteria
  const trips = await Trip.find({
    origin,
    destination,
    deptDate: deptDateObject,
    rideBooked: false,
  })
    .sort({ deptTime: 1 })
    .limit(5);

  // If no trips are found, return an error response
  if (trips.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'No trips found with the specified criteria',
    });
  }

  res.status(200).json({
    status: 'success',
    results: trips.length,
    data: {
      trips,
    },
  });
});

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Trip.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const trips = await features.query;

  res.status(200).json({
    status: 'success',
    results: trips.length,
    data: {
      trips,
    },
  });
});

exports.createTrip = catchAsync(async (req, res, next) => {
  const newTrip = await Trip.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      trip: newTrip,
    },
  });
});

exports.updateTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      trip,
    },
  });
});

exports.deleteTrip = catchAsync(async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id)
    .populate({
      path: 'driver',
      select: ['firstName', 'lastName', 'profileImage', 'ratingsAverage'],
    })
    .populate({
      path: 'passenger',
      select: ['firstName', 'lastName', 'profileImage', 'ratingsAverage'],
    });

  res.status(200).json({
    status: 'success',
    data: {
      trip,
    },
  });
});
