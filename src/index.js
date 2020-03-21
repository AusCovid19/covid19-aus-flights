const express = require("express");
const moment = require("moment");
const app = express();
const helmet = require("helmet");

let jsonFile = require("../data/json/all/latest.json");

app.use(helmet());
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
