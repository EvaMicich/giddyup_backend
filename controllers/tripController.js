const Trip = require('../models/tripModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTrips = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-departureTime, -ratingsAverage';
  req.query.fields = 'name, departureTime, ratingsAverage';
  next();
};

exports.bookedTrips = async (req, res) => {
  try {
    // Retrieve the user's ID from the request (assuming it's available after authentication)
    //console.log(req.body);
    const userId = req.body.passenger;

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
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.bookingButton = async (req, res) => {
  try {
    console.log(req);
    const tripId = req.body._id;
    const passengerId = req.body.passenger;
    console.log(tripId);
    console.log(passengerId);

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
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.searchAllTrips = async (req, res) => {
  try {
    // console.log(req);
    const { origin, destination, deptDate } = req.query;
    const deptDateObject = new Date(deptDate);

    // Perform a database query to find trips matching the criteria
    const trips = await Trip.find({
      origin,
      destination,
      deptDate: deptDateObject,
    })
      .sort({ deptTime: 1 })
      .limit(5);

    res.status(200).json({
      status: 'success',
      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTrip = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        trip: newTrip,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
