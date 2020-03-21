import { useState, useEffect } from "react";
import moment from "moment";
import { Flight, FlightsResponse } from "../types";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Flight[]>([]);

  const timeout = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await timeout(2000);
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
    }
    getData();
  }, []);

  return { isLoading, data };
};
