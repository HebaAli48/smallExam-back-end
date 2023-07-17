// This is a custom AppError class that extends the built-in Error class in JavaScript.
// It is used to create custom error objects with a status code and an array of errors.

class AppError extends Error {
  // The constructor takes in three parameters: message, statusCode, and errors.
  constructor(message, statusCode, errors) {
    // Calling the constructor of the parent class (Error) and passing in the error message
    super(message);
    // Setting the status code and errors properties of the object
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Exporting the AppError class to be used in other modules
module.exports = AppError;
