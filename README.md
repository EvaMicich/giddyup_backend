# GiddyUp

## Table of Contents
1. [Introduction](#introduction)
2. [Technology Stack](#technology-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Application Structure](#application-structure)
5. [API Endpoints](#api-endpoints)
   - [Trips](#trips)
   - [Users](#users)
6. [Error Handling](#error-handling)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact/Support](#contactsupport)

## Introduction

GiddyUp is the end-of-course project for Holberton School, inspired by the observation of traffic congestion in Melbourne, where most cars have only a single occupant. The aim of this project is to address this issue with a technological solution, facilitating carpooling and potentially reducing traffic and environmental impact.

## Technology Stack

The backend of GiddyUp is built using the MERN stack:
- **MongoDB**: NoSQL database to store application data.
- **Express.js**: Web application framework for Node.js.
- **Node.js**: JavaScript runtime environment for executing the server code.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Postman**: Used for API testing and interaction.
- **MongoDB Compass and Atlas**: GUIs for MongoDB for database management and visualization.

## Setup and Installation

1. **Prerequisites**:
   - Ensure you have Node.js and MongoDB installed on your system.
   - Clone the repository to your local machine.

2. **Configuration**:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     - `DATABASE`: Your MongoDB connection string.
     - `DB_PASSWORD`: Password for the database (if applicable).
     - `PORT`: The port number for the server (default is 5000).

3. **Installation**:
   - Run `npm install` to install the required dependencies.

4. **Running the Application**:
   - Execute `npm start` to start the server.
   - The server will be accessible on `http://localhost:[PORT]`, where `[PORT]` is the port you configured in your `.env` file.

## Application Structure

- **`server.js`**: Entry point for the application. Sets up the MongoDB connection using Mongoose and starts the Express server.
- **`app.js`**: Contains the middleware and route definitions for the application.
- **`controllers/`**: This folder contains controller files which handle the logic for various routes.
- **`models/`**: Contains Mongoose models for the application's data structures.
- **`routes/`**: Defines the Express routes for the application.
- **`utils/`**: Utility functions and classes used throughout the application.

## API Endpoints

### Trips

#### 1. Booked Trips
- **Method**: `GET`
- **Endpoint**: `/api/v1/trips/booked`
- **Description**: Retrieves all trips booked by a specific user.
- **Query Parameters**:
  - `passenger`: User ID of the passenger.
- **Response**: A list of booked trips with details of the driver.

#### 2. Booking a Trip
- **Method**: `POST`
- **Endpoint**: `/api/v1/trips/book`
- **Description**: Books a trip for a user.
- **Request Body**:
  - `_id`: Trip ID.
  - `passenger`: Passenger ID.
- **Response**: Confirmation of the booked trip with trip details.

#### 3. Cancel Trip
- **Method**: `POST`
- **Endpoint**: `/api/v1/trips/cancel`
- **Description**: Cancels a booked trip.
- **Request Body**:
  - `_id`: Trip ID.
- **Response**: Confirmation of the trip cancellation.

#### 4. Search Trips
- **Method**: `GET`
- **Endpoint**: `/api/v1/trips/search`
- **Description**: Searches for trips based on given criteria.
- **Query Parameters**:
  - `origin`: Origin of the trip.
  - `destination`: Destination of the trip.
  - `deptDate`: Departure date.
- **Response**: List of trips matching the criteria.

#### 5. List All Trips
- **Method**: `GET`
- **Endpoint**: `/api/v1/trips`
- **Description**: Retrieves all trips with filtering, sorting, and pagination capabilities.
- **Query Parameters**: Various (for filtering, sorting, pagination).
- **Response**: List of trips.

#### 6. Create a Trip
- **Method**: `POST`
- **Endpoint**: `/api/v1/trips`
- **Description**: Creates a new trip.
- **Request Body**: Trip details (origin, destination, time, etc.).
- **Response**: Details of the created trip.

#### 7. Update a Trip
- **Method**: `PATCH`
- **Endpoint**: `/api/v1/trips/:id`
- **Description**: Updates the details of a specific trip.
- **Path Parameters**:
  - `id`: Trip ID.
- **Request Body**: Updated trip details.
- **Response**: Details of the updated trip.

#### 8. Delete a Trip
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/trips/:id`
- **Description**: Deletes a specific trip.
- **Path Parameters**:
  - `id`: Trip ID.
- **Response**: Confirmation of deletion.

#### 9. Get Trip Details
- **Method**: `GET`
- **Endpoint**: `/api/v1/trips/:id`
- **Description**: Retrieves details of a specific trip.
- **Path Parameters**:
  - `id`: Trip ID.
- **Response**: Details of the requested trip.

### Users

#### 1. List All Users
- **Method**: `GET`
- **Endpoint**: `/api/v1/users`
- **Description**: Retrieves all users with filtering, sorting, and pagination capabilities.
- **Query Parameters**: Various (for filtering, sorting, pagination).
- **Response**: List of users.

#### 2. Get User by Email
- **Method**: `GET`
- **Endpoint**: `/api/v1/users/email`
- **Description**: Retrieves a user by their email.
- **Query Parameters**:
  - `email`: The email of the user.
- **Response**: Details of the user with the specified email.

#### 3. Get User Details
- **Method**: `GET`
- **Endpoint**: `/api/v1/users/:id`
- **Description**: Retrieves details of a specific user.
- **Path Parameters**:
  - `id`: User ID.
- **Response**: Details of the requested user.

#### 4. Create a User
- **Method**: `POST`
- **Endpoint**: `/api/v1/users`
- **Description**: Creates a new user.
- **Request Body**: User details (name, email, etc.).
- **Response**: Details of the created user.

#### 5. Update a User
- **Method**: `PATCH`
- **Endpoint**: `/api/v1/users/:id`
- **Description**: Updates the details of a specific user.
- **Path Parameters**:
  - `id`: User ID.
- **Request Body**: Updated user details.
- **Response**: Details of the updated user.

#### 6. Delete a User
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/users/:id`
- **Description**: Deletes a specific user.
- **Path Parameters**:
  - `id`: User ID.
- **Response**: Confirmation of deletion.

## Error Handling

GiddyUp's backend implements a robust error handling system to ensure consistency and clarity in error responses. This system includes a centralized error controller, utility functions, and a custom error class for enhanced error management.

### Custom Error Class (`AppError`)

- **Purpose**: To create custom error objects with additional properties like `statusCode`, `status`, and `isOperational`.
- **Implementation**:
  - Extends the native JavaScript `Error` class.
  - `statusCode`: HTTP status code for the error.
  - `status`: 'fail' for 4xx codes and 'error' for 5xx codes.
  - `isOperational`: Indicates if the error is a known, expected error.
  - Captures the stack trace without including the constructor call.

### Error Controller (`errorController.js`)

- **Purpose**: To intercept and format errors thrown in the application.
- **Implementation**:
  - Captures errors and assigns a default status code and message if not already set.
  - Sends a JSON response with the error status and message.

### Asynchronous Error Handling (`catchAsync`)

- **Purpose**: To catch errors in asynchronous route handlers and pass them to the error controller.
- **Implementation**:
  - Wraps asynchronous functions and forwards any uncaught errors to the next middleware (usually the error controller).

#### Usage Example

Here's how these components work together in a route handler:

```javascript
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.someRouteHandler = catchAsync(async (req, res, next) => {
  // Some logic...
  if (someConditionNotMet) {
    throw new AppError('Specific error message', 400);
  }
  // Rest of the function...
});
```

In this setup, `AppError` is used to create informative and structured error objects. The `catchAsync` function ensures that these and other uncaught errors in asynchronous operations are forwarded to the `errorController` for a consistent response format. This approach provides clarity and maintainability in handling errors throughout the application.


## Contributing

Thank you for your interest in contributing to GiddyUp. However, this project is the end-of-course project for Holberton School and is not currently open for public contributions. Additionally, the project will not be actively monitored or updated post-completion. We appreciate your understanding.

## License

GiddyUp is made available under the MIT License. This means that you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided that the following conditions are met:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
- In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Full details of the license can be found in the [LICENSE](LICENSE) file located in the root directory of this project.

## Contact/Support

If you have any questions, feedback, or need support regarding the GiddyUp project, please feel free to reach out to the authors:

- **Bryan Field**
- **Eva Micich**
- **Kathryn Kelly**
- **Bryce Knight**

For direct inquiries or support, please contact [author's email or professional profile link]. We appreciate your interest in GiddyUp and will do our best to assist you.
