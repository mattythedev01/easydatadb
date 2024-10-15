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

// Import the EasyDataDB package
const EasyDataDB = require("@mattythedev01/easydatadb");

// Create an instance of EasyDataDB
const db = new EasyDataDB("json/mydatabase.json");

// Set some data
db.set("username", "mattythedev01");
db.setUserData("user123", "age", 30);
db.setGuildData("guild456", "name", "My Guild");

// Get data
const username = db.get("username");
const userAge = db.getUserData("user123", "age");
const guildName = db.getGuildData("guild456", "name");

console.log(`Username: ${username}`); // Output: Username: mattythedev01
console.log(`User Age: ${userAge}`); // Output: User Age: 30
console.log(`Guild Name: ${guildName}`); // Output: Guild Name: My Guild

// Check if a key exists
const hasUser = db.has("username"); // true

// Delete a key
db.delete("username");

// Clear all data
db.clear();
```
