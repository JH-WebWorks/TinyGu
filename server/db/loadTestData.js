const fs = require("fs");

module.exports = function loadTestData(filestring) {
  const data = fs
    .readFileSync(filestring)
    .toString()
    .split("\n")
    .map((x) => x.split(","))
    .map((x) => {
      return {
        keyword: x[0],
        url: x[1],
        // title: x[2],
        // timestamp: x[3],
        // ip: x[4],
        clicks: Number(x[5]),
      };
    });
  data.shift();
  data.pop();
  return data;
};
