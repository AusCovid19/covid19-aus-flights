import React from "react";

import { useApi } from "./hooks/useApi";
import AirlineTail from "./airlines/AirlineTail";
import {
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Typography
} from "@material-ui/core";
import useAppStyles from "./AppStyles";
import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ApplicationBar handleSearch={searchTerm => handleSearch(searchTerm)} />
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
          <TableContainer style={{ maxHeight: "70vh" }}>
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
      <Footer />
    </div>
  );
}

export default App;
