"use client";

import Header from "@/src/common/extras/Header";
import FlightResults from "./flight-results/FlightResults";
import Landing from "./landing/Landing";
import { useQueryParams } from "@/src/hooks/useQueryParams";

const Overview = () => {
  const { getQueryParam } = useQueryParams();
  const destination = getQueryParam("destination");
  const origin = getQueryParam("origin");
  const showFlightResults = destination && origin;

  //   const [travelClass, setTravelClass] = useState("economy");

  //   const filteredFlights = useMemo(() => {
  //     return mockFlights.filter((flight) => {
  //       const matchesAirline = selectedAirlines.includes(flight.airline);
  //       const matchesPrice =
  //         flight.price >= priceRange[0] && flight.price <= priceRange[1];
  //       const matchesStops = flight.stops <= maxStops;
  //       const matchesClass =
  //         travelClass === "economy"
  //           ? flight.class === "Economy"
  //           : flight.class === "Business";
  //       return matchesAirline && matchesPrice && matchesStops && matchesClass;
  //     });
  //   }, [selectedAirlines, priceRange, maxStops, travelClass]);

  return (
    <>
      <Header />

      {showFlightResults ? <FlightResults /> : <Landing />}
    </>
  );
};

export default Overview;
