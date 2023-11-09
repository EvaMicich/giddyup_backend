/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tripRouter = require('./routes/tripRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) MIDDLESWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS for all routes
app.use(cors());

// Middleware to accept json on POST requests
app.use(express.json());

// Middleware to serve static images
app.use('/dev-data', express.static(path.join(__dirname, 'dev-data')));

// 2) Routes
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/users', userRouter);

// Error middleware for handling all undefined routes routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
