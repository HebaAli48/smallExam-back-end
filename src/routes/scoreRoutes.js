// Importing the express module to create a router
const express = require("express");
// Creating an instance of the router
const router = express.Router();
// Importing the getRank function from the scoreController module
const { getRank } = require("../controllers/scoreController");

// This endpoint will be used to get the rank of the user's score
router.post("/", getRank);

// Exporting the router
module.exports = router;
