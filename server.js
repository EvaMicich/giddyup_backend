/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('DB_PASSWORD', process.env.DB_PASSWORD);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(DB, mongooseOptions)
  .then(() => {
    console.log('DB connection success!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Giddyup is galloping on port ${port}`);
});
