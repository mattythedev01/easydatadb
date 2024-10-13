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
        throw error;
      }
    }
  }

  save() {
    const dirPath = path.dirname(this.filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  get(key) {
    return this.data[key];
  }

  has(key) {
    return key in this.data;
  }

  delete(key) {
    delete this.data[key];
    this.save();
  }

  clear() {
    this.data = {};
    this.save();
  }

  all() {
    return Object.entries(this.data);
  }

  // Discord-specific methods

  setData(type, id, key, value) {
    if (!this.data[type]) {
      this.data[type] = {};
    }
    if (!this.data[type][id]) {
      this.data[type][id] = {};
    }
    this.data[type][id][key] = value;
    this.save();
  }

  getData(type, id, key) {
    return this.data[type] && this.data[type][id]
      ? this.data[type][id][key]
      : undefined;
  }

  setUserData(userId, key, value) {
    this.setData("users", userId, key, value);
  }

  getUserData(userId, key) {
    return this.getData("users", userId, key);
  }

  setGuildData(guildId, key, value) {
    this.setData("guilds", guildId, key, value);
  }

  getGuildData(guildId, key) {
    return this.getData("guilds", guildId, key);
  }

  setChannelData(channelId, key, value) {
    this.setData("channels", channelId, key, value);
  }

  getChannelData(channelId, key) {
    return this.getData("channels", channelId, key);
  }

  addToArray(type, id, key, value) {
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
  }

  removeFromArray(type, id, key, value) {
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
  }

  incrementValue(type, id, key) {
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
  }

  decrementValue(type, id, key) {
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
  }

  storeData(type, id, key, value) {
    const timestamp = Date.now();
    this.setData(type, id, key, { value, timestamp });
  }
}

module.exports = easydatadb;
