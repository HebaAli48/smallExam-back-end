// Importing the express module to create a router
const express = require("express");
// Creating an instance of the router
const router = express.Router();
// Importing the getAllWords and getAnswer functions from the wordController module
const { getAllWords, getAnswer } = require("../controllers/wordController");

// This endpoint will be used to get 10 random words from the JSON file
router.get("/", getAllWords);
// This endpoint will be used to check if the user's answer is correct
router.post("/", getAnswer);

// Exporting the router
module.exports = router;
