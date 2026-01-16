"use client";

import { Paper } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Filters from "@/src/common/extras/Filters";
import Header from "@/src/common/extras/Header";
import PriceTrends from "./price-trends/PriceTrends";
import Flights from "./flights/Flights";

const Overview = () => {
  //   const [travelClass, setTravelClass] = useState("economy");

  const airlines = ["Delta", "United", "American", "Southwest", "JetBlue"];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile Filter Button */}

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-72 shrink-0 hidden lg:block">
            <Paper
              elevation={3}
              className="rounded-2xl overflow-hidden sticky top-6"
            >
              <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-5">
                <div className="flex items-center gap-2 text-white">
                  <FilterAltIcon />
                  <h3 className="text-xl font-bold">Filters</h3>
                </div>
              </div>
              <Filters airlines={airlines} />
            </Paper>
          </aside>

          {/* Price Trends Chart */}
          <main className="flex-1 min-w-0 flex gap-3 flex-col">
            <PriceTrends />
            <Flights />
          </main>
        </div>
      </div>
    </>
  );
};

export default Overview;
