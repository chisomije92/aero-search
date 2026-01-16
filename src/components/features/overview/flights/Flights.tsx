import { Paper } from "@mui/material";
import FlightCard from "../flight-card/FlightCard";

const Flights = () => {
  return (
    <Paper elevation={3} className="rounded-2xl overflow-hidden ">
      <h3 className="text-xl font-bold text-black px-6 py-4">
        Available Flights
      </h3>
      <div className="p-6">
        <FlightCard
          airline="Lufthansa"
          flightNumber="LH408"
          departureTime="08:40"
          arrivalTime="15:55"
          origin="JFK"
          destination="LHR"
          duration="7h 15m"
          stops="1 Stop"
          price="$548"
        />

        <FlightCard
          airline="British Airways"
          flightNumber="BA600"
          departureTime="13:11"
          arrivalTime="00:30"
          origin="JFK"
          destination="LHR"
          duration="11h 19m"
          stops="Direct"
          price="$742"
        />
        <FlightCard
          airline="British Airways"
          flightNumber="BA600"
          departureTime="13:11"
          arrivalTime="00:30"
          origin="JFK"
          destination="LHR"
          duration="11h 19m"
          stops="Direct"
          price="$742"
        />
        <FlightCard
          airline="British Airways"
          flightNumber="BA600"
          departureTime="13:11"
          arrivalTime="00:30"
          origin="JFK"
          destination="LHR"
          duration="11h 19m"
          stops="Direct"
          price="$742"
        />
        <FlightCard
          airline="British Airways"
          flightNumber="BA600"
          departureTime="13:11"
          arrivalTime="00:30"
          origin="JFK"
          destination="LHR"
          duration="11h 19m"
          stops="Direct"
          price="$742"
        />
        <FlightCard
          airline="British Airways"
          flightNumber="BA600"
          departureTime="13:11"
          arrivalTime="00:30"
          origin="JFK"
          destination="LHR"
          duration="11h 19m"
          stops="Direct"
          price="$742"
        />
      </div>
    </Paper>
  );
};

export default Flights;
