/**
 * @author: mattythedev01
 * @description: A simple and easy-to-use package for storing data in a JSON file.
 */

const fs = require("fs");
const path = require("path");

class EasyDataDB {
  constructor(filePath = "json/datadb.json") {
    this.filePath = filePath;
    this.data = {};
    this.load();
  }

  load() {
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      this.data = JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        this.save();
      } else {
        console.error("Error loading data:", error);
      }
    }
  }

  save() {
    try {
      const dirPath = path.dirname(this.filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
    return this;
  }

  get(key, defaultValue = undefined) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  has(key) {
    return key in this.data;
  }

  delete(key) {
    delete this.data[key];
    this.save();
    return this;
  }

  clear() {
    this.data = {};
    this.save();
    return this;
  }

  all() {
    return Object.entries(this.data);
  }

  // Simplified data methods

  setData(type, id, key, value) {
    if (!this.data[type]) this.data[type] = {};
    if (!this.data[type][id]) this.data[type][id] = {};
    this.data[type][id][key] = value;
    this.save();
    return this;
  }

  getData(type, id, key, defaultValue = undefined) {
    return this.data[type]?.[id]?.[key] ?? defaultValue;
  }

  // User, Guild, and Channel specific methods

  setUserData(userId, key, value) {
    return this.setData("users", userId, key, value);
  }

  getUserData(userId, key, defaultValue = undefined) {
    return this.getData("users", userId, key, defaultValue);
  }

  setGuildData(guildId, key, value) {
    return this.setData("guilds", guildId, key, value);
  }

  getGuildData(guildId, key, defaultValue = undefined) {
    return this.getData("guilds", guildId, key, defaultValue);
  }

  setChannelData(channelId, key, value) {
    return this.setData("channels", channelId, key, value);
  }

  getChannelData(channelId, key, defaultValue = undefined) {
    return this.getData("channels", channelId, key, defaultValue);
  }

  // Array operations

  addToArray(type, id, key, value) {
    if (!this.data[type]) this.data[type] = {};
    if (!this.data[type][id]) this.data[type][id] = {};
    if (!Array.isArray(this.data[type][id][key])) {
      this.data[type][id][key] = [];
    }
    this.data[type][id][key].push(value);
    this.save();
    return this;
  }

  removeFromArray(type, id, key, value) {
    if (this.data[type]?.[id]?.[key]) {
      this.data[type][id][key] = this.data[type][id][key].filter(
        (item) => item !== value
      );
      this.save();
    }
    return this;
  }

  // Value operations

  incrementValue(type, id, key, amount = 1) {
    if (!this.data[type]) this.data[type] = {};
    if (!this.data[type][id]) this.data[type][id] = {};
    if (typeof this.data[type][id][key] !== "number") {
      this.data[type][id][key] = 0;
    }
    this.data[type][id][key] += amount;
    this.save();
    return this.data[type][id][key];
  }

  decrementValue(type, id, key, amount = 1) {
    return this.incrementValue(type, id, key, -amount);
  }

  // Timestamped data storage

  storeData(type, id, key, value) {
    const timestamp = Date.now();
    return this.setData(type, id, key, { value, timestamp });
  }

  getStoredData(type, id, key) {
    const data = this.getData(type, id, key);
    return data ? { ...data, age: Date.now() - data.timestamp } : null;
  }
}

module.exports = EasyDataDB;
