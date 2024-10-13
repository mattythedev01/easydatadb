# @mattythedev01/easydatadb Documentation

## Overview

"@mattythedev01/easydatadb", is a easy way to store data for your discord bot or any other projects outside of discord. It'll make a json folder & file in your current directory, and those files will store the data you input (Mainly used for discord bots).

## Features

- Works with the Discord Latest API Version
- Simple and intuitive API
- Automatic data persistence
- Timestamp tracking for each entry
- Support for various data types (strings, numbers, arrays, objects)
- File-based storage for easy backup and portability

## Installation

`npm install @mattythedev01/easydatadb`

## Example Usage

```js
// Example usage of easydatadb

const EasyDataDB = require("@mattythedev01/easydatadb"); // Adjust the path as necessary

// Create an instance of the database
const db = new EasyDataDB();

// Set user data
db.setUserData("user123", "name", "John Doe");
db.setUserData("user123", "age", 30);
db.setUserData("user123", "hobbies", ["reading", "gaming"]);

// Retrieve and log user data
const userName = db.getUserData("user123", "name");
const userAge = db.getUserData("user123", "age");
const userHobbies = db.getUserData("user123", "hobbies");

console.log(`User Name: ${userName}`); // Output: User Name: John Doe
console.log(`User Age: ${userAge}`); // Output: User Age: 30
console.log(`User Hobbies: ${userHobbies.join(", ")}`); // Output: User Hobbies: reading, gaming

// Add a hobby to the user's hobbies array
db.addToArray("users", "user123", "hobbies", "coding");

// Retrieve and log updated hobbies
const updatedHobbies = db.getUserData("user123", "hobbies");
console.log(`Updated Hobbies: ${updatedHobbies.join(", ")}`); // Output: Updated Hobbies: reading, gaming, coding

// Increment a value (e.g., user score)
db.incrementValue("users", "user123", "score");

// Retrieve and log the updated score
const userScore = db.getData("users", "user123", "score");
console.log(`User Score: ${userScore}`); // Output: User Score: 1

// Clear all data
db.clear();
console.log("All data cleared.");
```
