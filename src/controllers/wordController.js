// Importing the fs module to read and write files
const fs = require("fs").promises;
// Importing the custom AppError class to handle errors
const AppError = require("../utils/AppError");

// This function gets all the required words from the TestData.json file and sends them as a response
const getAllWords = async (req, res, next) => {
  try {
    // Reading the JSON file from the file system
    const data = await fs.readFile("./data/TestData.json", "utf8");

    // Parsing the JSON data into a JavaScript object
    const parsedData = JSON.parse(data);

    // Filtering the wordList array to include at least one adjective, one adverb, one noun, and one verb
    // seprate  adjectives,  adverbs,  nouns, and  verbs each in seprate array ,
    //  retrive{id,word} only from original word
    const adjectives = parsedData.wordList
      .filter((word) => word.pos === "adjective")
      .map(({ id, word }) => ({ id, word }));
    const adverbs = parsedData.wordList
      .filter((word) => word.pos === "adverb")
      .map(({ id, word }) => ({ id, word }));
    const nouns = parsedData.wordList
      .filter((word) => word.pos === "noun")
      .map(({ id, word }) => ({ id, word }));
    const verbs = parsedData.wordList
      .filter((word) => word.pos === "verb")
      .map(({ id, word }) => ({ id, word }));

    // Randomly select one word of each type
    const adjectiveWord =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const adverbWord = adverbs[Math.floor(Math.random() * adverbs.length)];
    const nounWord = nouns[Math.floor(Math.random() * nouns.length)];
    const verbWord = verbs[Math.floor(Math.random() * verbs.length)];

    // Select six more words from the wordList array that are not already selected
    const restOfWords = parsedData.wordList
      .filter(
        (word) =>
          word.id !== adjectiveWord.id &&
          word.id !== adverbWord.id &&
          word.id !== nounWord.id &&
          word.id !== verbWord.id
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .map(({ id, word }) => ({ id, word }));

    // Combine all the selected words and shuffle them randomly
    const words = [
      adjectiveWord,
      adverbWord,
      nounWord,
      verbWord,
      ...restOfWords,
    ].sort(() => Math.random() - 0.5);

    // Send the selected words as a response
    res.send(words);
  } catch (err) {
    // If there is an error, throw a 500 error using the AppError class
    next(new AppError("Internal Server Error!", 500, [err]));
  }
};

// This function will be used to check if the user's answer is correct
const getAnswer = async (req, res, next) => {
  // Reading the JSON file
  const data = await fs.readFile("./data/TestData.json", "utf8");
  // Parsing the JSON data
  const parsedData = JSON.parse(data);
  // Getting the id and choice properties from the request body
  const { id, choice } = req.body;

  // Finding the word object with the given id
  const word = parsedData.wordList.find((word) => word.id === +id);
  // If the word object does not exist, throw a 404 error using the AppError class
  if (!word) return next(new AppError("Word Not Found!", 404));

  // Checking if the user's choice matches the word's part of speech
  if (word.pos.toLowerCase() == choice.toLowerCase()) {
    // Sending the "correct" answer and the current score as a response
    res.send({ answer: "correct" });
  } else {
    // Sending "wrong" as a response if the answer is incorrect
    res.send({ answer: "wrong" });
  }
};

// Exporting the getAllWords and getAnswer functions
module.exports = {
  getAllWords,
  getAnswer,
};
