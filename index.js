const express = require("express");
const moment = require("moment");
const path = require("path");
const app = express();
const helmet = require("helmet");
const fuse = require("fuse.js");

let jsonFile = require("./data/json/all/latest.json");

const search = new fuse(jsonFile, {
  keys: [
    { name: "destination", weight: 0.9 },
    { name: "origin", weight: 0.7 },
    { name: "airline", weight: 0.6 },
    { name: "flight_number", weight: 0.6 },
    { name: "reporting_state", weight: 0.4 }
  ]
});

app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));
app.disable("x-powered-by");

const port = process.env.PORT || 4000;

app.get("/api", (req, res) => {
  let { reporting_state, before_arrival_date, after_arrival_date } = req.query;

  if (reporting_state) {
    return res.send(
      jsonFile.filter(flight => {
        return flight.reporting_state === reporting_state.toUpperCase();
      })
    );
  }

  if (before_arrival_date && after_arrival_date) {
    return res.send(
      jsonFile.filter(flight => {
        let moment_before_arrival_date = new moment(before_arrival_date);
        let moment_after_arrival_date = new moment(after_arrival_date);
        return moment(new moment(new Date(flight.arrival_date))).isBetween(
          moment_after_arrival_date,
          moment_before_arrival_date
        );
      })
    );
  }

  return res.send(jsonFile);
});

app.get("/api/search", (req, res) => {
  return res.send(search.search(req.query.query).map(item => item.item));
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
