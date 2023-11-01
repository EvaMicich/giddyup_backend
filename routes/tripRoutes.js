const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/top-5-cheap')
//   .get(tripController.aliasTopTours, tripController.getAllTours);

// router.route('/tour-stats').get(tripController.getTourStats);
// router.route('/monthly-plan/:year').get(tripController.getMonthlyPlan);

router
  .route('/')
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router.route('/search').get(tripController.searchAllTrips);
router.route('/booking-button').patch(tripController.bookingButton);
router.route('/booked-trips').get(tripController.bookedTrips);

router
  .route('/:id')
  .get(tripController.getTrip)
  .patch(tripController.updateTrip)
  .delete(tripController.deleteTrip);

module.exports = router;
