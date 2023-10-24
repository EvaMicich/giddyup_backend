/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const tripRouter = require('./routes/tripRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) MIDDLESWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to accept json on POST requests
app.use(express.json());

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
