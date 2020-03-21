import moment from "moment";

export default interface _Flights {
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  arrival_date: string | moment.Moment;
  symptoms_onset_date: string | moment.Moment;
  close_contact_rows: string;
  reporting_state: "NSW" | "VIC" | "ACT" | "WA" | "SA";
}

export interface FlightsResponse extends _Flights {
  arrival_date: string;
  symptoms_onset_date: string;
}

export interface Flight extends _Flights {
  arrival_date: moment.Moment;
  symptoms_onset_date: moment.Moment;
}
