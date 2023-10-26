const Trip = require('../models/tripModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTrips = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-departureTime, -ratingsAverage';
  req.query.fields = 'name, departureTime, ratingsAverage';
  next();
};

exports.searchAllTrips = async (req, res) => {
  try {
    const { origin, destination, deptDate } = req.body;
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
    // EXECUTE QUERY
    const features = new APIFeatures(Trip.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const trips = await features.query;

    // SEND RESPONSE
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
