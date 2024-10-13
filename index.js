const fs = require("fs");
const path = require("path");

class datadb {
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

  // method to store data with a timestamp
  storedata(key, value) {
    const timestamp = Date.now();
    this.set(key, { value, timestamp });
  }
}

module.exports = datadb;
