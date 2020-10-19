const path = require("path-browserify");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "main.js",
  },
};
