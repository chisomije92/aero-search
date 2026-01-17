"use client";

import FlightResults from "./flight-results/FlightResults";
import Landing from "./landing/Landing";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import Hero from "@/src/common/extras/Hero";

const Overview = () => {
  const { getQueryParam } = useQueryParams();
  const destination = getQueryParam("destination");
  const origin = getQueryParam("origin");
  const showFlightResults = destination && origin;

  return (
    <>
      <Hero />
      {showFlightResults ? <FlightResults /> : <Landing />}
    </>
  );
};

export default Overview;
