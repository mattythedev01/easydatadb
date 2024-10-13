# DataDB Documentation

## Overview

"datadb", is a easy way to store data for your discord bot or any other projects outside of discord. It'll make a json folder & file in your current directory, and those files will store the data you input (Mainly used for discord bots).

## Features

- Simple and intuitive API
- Automatic data persistence
- Timestamp tracking for each entry
- Support for various data types (strings, numbers, arrays, objects)
- File-based storage for easy backup and portability

## Installation

`npm install datadb`

## Example Code

```js
const DataDB = require("datadb"); // Adjust the path
const datadb = new DataDB();

// Log a simple string
datadb.storedata("Bot status", "Running");

// Log a number
datadb.storedata("Total users", 1500);

// Log an array
datadb.storedata("Active channels", ["general", "support", "gaming"]);
```
