// var csv = require("node-csv").createParser();
var csv = require("csv-parser");
var data = [];
var fs = require("fs");

const getRandomPuzzle = (req, res) => {
  fs.createReadStream("./backend/lichess_db_puzzle.csv")
    .pipe(csv())
    .on("data", function (row) {
      data.push(row);
    })
    .on("end", function () {
      console.log("Data loaded");
    });
  console.log(data.length);
  return res.status(200).json({ success: true });
};

module.exports = { getRandomPuzzle };
