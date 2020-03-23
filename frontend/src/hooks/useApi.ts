import { useState, useEffect } from "react";
import moment from "moment";
import { Flight, FlightsResponse } from "../types";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Flight[]>([]);

  const getData = async () => {
    const data: FlightsResponse[] = await fetch("/api").then(resp =>
      resp.json()
    );

    const newData: Flight[] = data.map(flight => {
      return {
        ...flight,
        arrival_date: moment(new Date(flight.arrival_date)),
        symptoms_onset_date: moment(new Date(flight.symptoms_onset_date))
      };
    });
    setData(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  return {
    isLoading,
    data
  };
};
