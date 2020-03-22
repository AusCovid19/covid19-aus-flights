import React from "react";

import { useApi } from "./hooks/useApi";
import AirlineTail from "./airlines/AirlineTail";
import {
  CircularProgress,
  IconButton,
  InputBase,
  Link,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";
import useAppStyles from "./AppStyles";
import GitHubIcon from "./icons/GitHub.js";

function App() {
  const {
    isLoading,
    data,
    toggleArrivalDateSort,
    arrivalDateSort,
    handleSearch
  } = useApi();

  const classes = useAppStyles();
  return (
    <div style={{ maxHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            COVID-19 Australian Flight Tracker
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search (i.e. Flight Destination, Origin, Airline, Flight Number)"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e: any) => {
                handleSearch(e.target.value as string);
              }}
            />
          </div>
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          marginTop: "1rem"
        }}
      >
        <div style={{ width: "80%", maxWidth: "800", flex: 1 }}>
          <TableContainer style={{ maxHeight: "80vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableCell>Airline</TableCell>
                <TableCell>Flight Number</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Arrival Date</TableCell>
                <TableCell>Symptoms Onset Date</TableCell>
                <TableCell>Flight Rows (Close Contact)</TableCell>
                <TableCell>Reporting State</TableCell>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem"
                    }}
                  >
                    <CircularProgress />
                    <Typography>Loading...</Typography>
                  </div>
                )}
                {data.map((flight, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <div style={{ display: "flex" }}>
                          <AirlineTail airline={flight.airline} />{" "}
                          <Typography
                            variant="body2"
                            style={{ marginLeft: 10 }}
                          >
                            {flight.airline}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>{flight.flight_number}</TableCell>
                      <TableCell>{flight.origin}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>
                        {flight.arrival_date.format("Do MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {flight.symptoms_onset_date.format("Do MMM YYYY")}
                      </TableCell>
                      <TableCell>{flight.close_contact_rows}</TableCell>
                      <TableCell>{flight.reporting_state}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          background: grey[900],
          color: "white"
        }}
      >
        <div style={{ alignItems: "left", width: "80%", marginTop: "0.25rem" }}>
          <Link
            color="primary"
            href="https://paypal.me/lorderikir"
            target="_blank"
            rel="noreferrer noopener"
          >
            Donate to keep the service alive
          </Link>
          <Typography>
            Data Sourced from{" "}
            <Link href="https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus-flights.aspx">
              NSW Department of Health
            </Link>
            ,{" "}
            <Link href="https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+topics/health+topics+a+-+z/covid+2019/latest+updates/known+flights+with+confirmed+cases+of+covid-19">
              SA Department of Health
            </Link>
            ,{" "}
            <Link href="https://healthywa.wa.gov.au/Articles/A_E/Coronavirus/Locations-visited-by-confirmed-cases">
              WA Department of Health
            </Link>
            . In addition to media releases by{" "}
            <Link href="https://www.health.act.gov.au/about-our-health-system/novel-coronavirus-covid-19/latest-news">
              ACT Department of Health
            </Link>{" "}
            and{" "}
            <Link href="https://www2.health.vic.gov.au/about/media-centre/mediareleases">
              Victorian Department of Health and Human Services.
            </Link>
          </Typography>
        </div>
        <div style={{ alignItems: "left", width: "80%", marginTop: "0.25rem" }}>
          <Typography gutterBottom>
            Copyright &copy; Eric Jiang 2020. Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            and{" "}
            <span role="img" aria-label="coffee">
              ☕
            </span>{" "}
            in Melbourne, Victoria, Australia.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default App;
