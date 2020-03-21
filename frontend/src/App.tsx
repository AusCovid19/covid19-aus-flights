import React from "react";
import {
  Pane,
  Spinner,
  Text,
  Heading,
  Table,
  TextDropdownButton,
  Link,
  SearchInput
} from "evergreen-ui";
import { useApi } from "./hooks/useApi";
import AirlineTail from "./airlines/AirlineTail";

function App() {
  const {
    isLoading,
    data,
    toggleArrivalDateSort,
    arrivalDateSort,
    handleSearch
  } = useApi();
  return (
    <div style={{ maxHeight: "100vh" }}>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>COVID-19 Australian Flight Tracker</Heading>
        </Pane>
        <Pane>
          {/* Below you can see the marginRight property on a Button. */}
          <Link
            appearance="primary"
            href="https://paypal.me/lorderikir"
            target="_blank"
            rel="noreferrer noopener"
          >
            Donate to keep the service alive
          </Link>
        </Pane>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex={1}
      >
        <Pane width="80%">
          <Pane
            border="default"
            width="100%"
            marginBottom={20}
            padding={16}
            display="flex"
            flexDirection="column"
          >
            <SearchInput
              placeholder="Search (i.e. Flight Destination, Origin, Airline, Flight Number)"
              onChange={(e: any) => {
                handleSearch(e.target.value as string);
              }}
              width="100%"
            />
          </Pane>
          <Table width="100%" flex={1}>
            <Table.Head>
              <Table.TextHeaderCell>Airline</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Number</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Origin</Table.TextHeaderCell>
              <Table.TextHeaderCell>Flight Destination</Table.TextHeaderCell>
              <Table.HeaderCell>
                <TextDropdownButton
                  onClick={() => toggleArrivalDateSort()}
                  icon={
                    arrivalDateSort === "ascending" ||
                    arrivalDateSort === "none"
                      ? "arrow-up"
                      : "arrow-down"
                  }
                >
                  Flight Arrival Date
                </TextDropdownButton>
              </Table.HeaderCell>
              <Table.TextHeaderCell>Symptoms Onset Date</Table.TextHeaderCell>
              <Table.TextHeaderCell flexBasis={300} flexShrink={0} flexGrow={0}>
                Flight Rows (Close Contact)
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>State Reporting</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height="60vh">
              {isLoading && (
                <Pane
                  display="flex"
                  flexDirection="column"
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  marginTop="1rem"
                >
                  <Spinner />
                  <Text>Loading...</Text>
                </Pane>
              )}
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
        </Pane>
      </Pane>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex={1}
      >
        <Pane alignItems="left" width="80%" marginTop={"0.25rem"}>
          <Text>
            Data Sourced from{" "}
            <a href="https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus-flights.aspx">
              NSW Department of Health
            </a>
            ,{" "}
            <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+topics/health+topics+a+-+z/covid+2019/latest+updates/known+flights+with+confirmed+cases+of+covid-19">
              SA Department of Health
            </a>
            ,{" "}
            <a href="https://healthywa.wa.gov.au/Articles/A_E/Coronavirus/Locations-visited-by-confirmed-cases">
              WA Department of Health
            </a>
            . In addition to media releases by{" "}
            <a href="https://www.health.act.gov.au/about-our-health-system/novel-coronavirus-covid-19/latest-news">
              ACT Department of Health
            </a>{" "}
            and{" "}
            <a href="https://www2.health.vic.gov.au/about/media-centre/mediareleases">
              Victorian Department of Health and Human Services.
            </a>
          </Text>
        </Pane>
        <Pane alignItems width="80%" marginTop="1.25rem">
          <Text marginBottom={"0.25rem"}>
            Copyright &copy; Eric Jiang 2020. Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            and{" "}
            <span role="img" aria-label="coffee">
              ☕
            </span>{" "}
            in Melbourne, Victoria, Australia.
          </Text>
        </Pane>
      </Pane>
    </div>
  );
}

export default App;
