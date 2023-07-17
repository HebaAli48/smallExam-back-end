// Importing required modules
const express = require("express");
const cors = require("cors");
const wordsRouter = require("./src/routes/wordsRoutes");
const scoresRouter = require("./src/routes/scoreRoutes");
require("express-async-errors");

// Creating an instance of the express application
const app = express();

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mounting the wordList and scoresList routers on their respective base paths
app.use("/wordList", wordsRouter);
app.use("/scoresList", scoresRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || [],
  });
});

// Starting the server and listening on port 4000
app.listen(4000, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port 4000"
    );
  else console.log("Error occurred, server can't start", error);
});
