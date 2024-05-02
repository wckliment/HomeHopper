// Import required modules
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const { ValidationError } = require('sequelize'); // Import ValidationError from Sequelize
const isProduction = environment === 'production';

// Initialize the app
const app = express();

// Use morgan for logging
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  app.use(cors());  // Enable CORS only in development
}

app.use(helmet.crossOriginResourcePolicy({  // Set helmet security headers
  policy: "cross-origin"
}));

app.use(csurf({  // CSRF protection
  cookie: {
    secure: isProduction,
    sameSite: isProduction && "Lax",
    httpOnly: true
  }
}));

// Import routes
const routes = require('./routes');

// Use imported routes
app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Sequelize Error Handler
app.use((err, _req, _res, next) => {
  // Check if error is a Sequelize error
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Error',
    message: err.message,
    errors: err.errors,
  });
});

// Export the app
module.exports = app;
