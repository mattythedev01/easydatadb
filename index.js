/**
 * @author: mattythedev01
 * @description: A Just a simple package for storing data in a JSON file.
 */

const fs = require("fs");
const path = require("path");

class easydatadb {
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
        throw error;
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
      throw error;
    }
  }

  set(key, value) {
    try {
      this.data[key] = value;
      this.save();
    } catch (error) {
      console.error("Error setting data:", error);
      throw error;
    }
  }

  get(key) {
    try {
      return this.data[key];
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  has(key) {
    try {
      return key in this.data;
    } catch (error) {
      console.error("Error checking data:", error);
      throw error;
    }
  }

  delete(key) {
    try {
      delete this.data[key];
      this.save();
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }

  clear() {
    try {
      this.data = {};
      this.save();
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  }

  all() {
    try {
      return Object.entries(this.data);
    } catch (error) {
      console.error("Error retrieving all data:", error);
      throw error;
    }
  }

  // Discord-specific methods

  setData(type, id, key, value) {
    try {
      if (!this.data[type]) {
        this.data[type] = {};
      }
      if (!this.data[type][id]) {
        this.data[type][id] = {};
      }
      this.data[type][id][key] = value;
      this.save();
    } catch (error) {
      console.error("Error setting data:", error);
      throw error;
    }
  }

  getData(type, id, key) {
    try {
      return this.data[type] && this.data[type][id]
        ? this.data[type][id][key]
        : undefined;
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  setUserData(userId, key, value) {
    try {
      this.setData("users", userId, key, value);
    } catch (error) {
      console.error("Error setting user data:", error);
      throw error;
    }
  }

  getUserData(userId, key) {
    try {
      return this.getData("users", userId, key);
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  }

  setGuildData(guildId, key, value) {
    try {
      this.setData("guilds", guildId, key, value);
    } catch (error) {
      console.error("Error setting guild data:", error);
      throw error;
    }
  }

  getGuildData(guildId, key) {
    try {
      return this.getData("guilds", guildId, key);
    } catch (error) {
      console.error("Error getting guild data:", error);
      throw error;
    }
  }

  setChannelData(channelId, key, value) {
    try {
      this.setData("channels", channelId, key, value);
    } catch (error) {
      console.error("Error setting channel data:", error);
      throw error;
    }
  }

  getChannelData(channelId, key) {
    try {
      return this.getData("channels", channelId, key);
    } catch (error) {
      console.error("Error getting channel data:", error);
      throw error;
    }
  }

  addToArray(type, id, key, value) {
    try {
      if (!this.data[type]) {
        this.data[type] = {};
      }
      if (!this.data[type][id]) {
        this.data[type][id] = {};
      }
      if (!Array.isArray(this.data[type][id][key])) {
        this.data[type][id][key] = [];
      }
      this.data[type][id][key].push(value);
      this.save();
    } catch (error) {
      console.error("Error adding to array:", error);
      throw error;
    }
  }

  removeFromArray(type, id, key, value) {
    try {
      if (
        this.data[type] &&
        this.data[type][id] &&
        Array.isArray(this.data[type][id][key])
      ) {
        this.data[type][id][key] = this.data[type][id][key].filter(
          (item) => item !== value
        );
        this.save();
      }
    } catch (error) {
      console.error("Error removing from array:", error);
      throw error;
    }
  }

  incrementValue(type, id, key) {
    try {
      if (!this.data[type]) {
        this.data[type] = {};
      }
      if (!this.data[type][id]) {
        this.data[type][id] = {};
      }
      if (typeof this.data[type][id][key] !== "number") {
        this.data[type][id][key] = 0;
      }
      this.data[type][id][key]++;
      this.save();
      return this.data[type][id][key];
    } catch (error) {
      console.error("Error incrementing value:", error);
      throw error;
    }
  }

  decrementValue(type, id, key) {
    try {
      if (!this.data[type]) {
        this.data[type] = {};
      }
      if (!this.data[type][id]) {
        this.data[type][id] = {};
      }
      if (typeof this.data[type][id][key] !== "number") {
        this.data[type][id][key] = 0;
      }
      this.data[type][id][key]--;
      this.save();
      return this.data[type][id][key];
    } catch (error) {
      console.error("Error decrementing value:", error);
      throw error;
    }
  }

  storeData(type, id, key, value) {
    try {
      const timestamp = Date.now();
      this.setData(type, id, key, { value, timestamp });
    } catch (error) {
      console.error("Error storing data:", error);
      throw error;
    }
  }
}

module.exports = easydatadb;
