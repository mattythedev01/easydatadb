# @mattythedev01/easydatadb Documentation

## Overview

"@mattythedev01/easydatadb", is a easy way to store data for your discord bot or any other projects outside of discord. It'll make a json folder & file in your current directory, and those files will store the data you input (Mainly used for discord bots).

## Features

- Simple and intuitive API
- Automatic data persistence
- Timestamp tracking for each entry
- Support for various data types (strings, numbers, arrays, objects)
- File-based storage for easy backup and portability

## Installation

`npm install @mattythedev01/easydatadb`

## Example bot code

```js
const { Client, Intents } = require("discord.js");
const easydatadb = require("@mattythedev01/easydatadb"); // Adjust the path as necessary

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const db = new easydatadb();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!set")) {
    const [command, key, value] = message.content.split(" ");
    db.set(key, value);
    message.reply(`Set ${key} to ${value}`);
  }

  if (message.content.startsWith("!get")) {
    const [command, key] = message.content.split(" ");
    const value = db.get(key);
    message.reply(`Value of ${key} is ${value}`);
  }
});

client.login("YOUR_DISCORD_BOT_TOKEN");
```
