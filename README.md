# Back-end short test

This is an Express REST API project developed using NodeJs and MongoDB.

## Main Services

- word Service: Responsible for managing the words (just getAllWords , getAnswer).
- score Service: Responsible for managing the score (getScore)

## Technology stack

- NodeJS
- ExpressJS
- MongoDB

## Used Packages

- express-async-errors:handling asynchronous errors in Express.
- cors: Enabling Cross-Origin Resource Sharing (CORS).

## Getting Started with project

- Clone to your local machine.
- NPM install dependacies.
- NPM start.

## API Endpoints:

## Words

### Get all Words

- #### GET /wordList/

### Get Answer

- #### POST /wordList
- ```
  "req":{

    "body" : {
        "id":--id--
        "choice":--choice
      }
  }

  ```

- ```
  "res":{
    "body" : {
      { answer: "correct or wrong" }
      }
  }
  ```

## Score

### Get exam score

- #### GET /scoresList
- ````
    "req":{
    "body" : {
          "score":--score--

        }
    }
    - ```
  "res":{
    "body" : {
     { "rank": --rank-- }
      }
  }
  ````
