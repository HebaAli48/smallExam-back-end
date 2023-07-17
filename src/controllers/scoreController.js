// Importing the fs module to read and write files
const fs = require("fs").promises;
// Importing the custom AppError class to handle errors
const AppError = require("../utils/AppError");

// This function will be used to get the rank of the user's score
const getRank = async (req, res, next) => {
  try {
    // Reading the JSON file
    const data = await fs.readFile("./data/TestData.json", "utf8");
    // Parsing the JSON data
    const parsedData = JSON.parse(data);
    // Getting the scoresList array from the parsed data
    const scores = parsedData.scoresList;
    // Getting the score property from the request body
    const { score } = req.body;
    // Filtering the scores below the user's score
    const scoresBelow = scores.filter((s) => +s < +score);
    // Calculating the final rank as a percentage
    const finalRank = (scoresBelow.length / scores.length) * 100;
    // Sending the rank as a response
    res.send({ rank: finalRank });
  } catch (err) {
    // If there is an error, throw a 500 error using the AppError class
    next(new AppError("Internal Server Error!", 500, [err]));
  }
};

// Exporting the getRank function
module.exports = {
  getRank,
};
