import React from "react";
import { Pane, Button, Spinner, Text, Heading, Table } from "evergreen-ui";
import { useApi } from "./hooks/useApi";
import AirlineTail from "./airlines/AirlineTail";

function App() {
  const { isLoading, data, toggleArrivalDateSort, arrivalDateSort } = useApi();
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>COVID-19 Australian Flight Tracker</Heading>
        </Pane>
        <Pane>
          {/* Below you can see the marginRight property on a Button. */}
          <Button marginRight={16}>Button</Button>
          <Button appearance="primary">Primary Button</Button>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex={1}
      >
        {isLoading && (
          <>
            <Spinner />
            <Text>Loading...</Text>
          </>
        )}
        {!isLoading && (
          <Table width="80%" flex={1}>
            <Table.Head>
              <Table.TextHeaderCell>Airline</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Number</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Origin</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Destination</Table.TextHeaderCell>
              <Table.TextHeaderCell
                onClick={() => toggleArrivalDateSort()}
                icon={
                  arrivalDateSort === "ascending" ? "caret-up" : "caret-down"
                }
              >
                Flight Arrival Date
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>Symptoms Onset Date</Table.TextHeaderCell>
              <Table.TextHeaderCell flexBasis={300} flexShrink={0} flexGrow={0}>
                Flight Rows (Close Contact)
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>State Reporting</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height="40vh">
              {data.map((flight, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <AirlineTail airline={flight.airline} />{" "}
                      <Text>{flight.airline}</Text>
                    </Table.Cell>
                    <Table.TextCell>{flight.flight_number}</Table.TextCell>
                    <Table.TextCell>{flight.origin}</Table.TextCell>
                    <Table.TextCell>{flight.destination}</Table.TextCell>
                    <Table.TextCell>
                      {flight.arrival_date.format("Do MMM YYYY")}
                    </Table.TextCell>
                    <Table.TextCell>
                      {flight.symptoms_onset_date.format("Do MMM YYYY")}
                    </Table.TextCell>
                    <Table.TextCell flexBasis={300} flexShrink={0} flexGrow={0}>
                      {flight.close_contact_rows}
                    </Table.TextCell>
                    <Table.TextCell>{flight.reporting_state}</Table.TextCell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Pane>
      <Pane>Footer</Pane>
    </div>
  );
}

export default App;
