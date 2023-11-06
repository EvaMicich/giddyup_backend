/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

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

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.staus || 'error';
});

module.exports = app;
