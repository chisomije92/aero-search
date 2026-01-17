import { IFlightFilters, INormalizedFlightOffer } from "../types/offers";
import {
  extractHourFromISO,
  extractMinutesFromISO,
  getHourFromISO,
  isWithinPrice,
  isWithinTime,
  parseHourRange,
  parseHourRangeToMinutes,
  timeStringToHour,
} from "./dateHelper";

function parseStops(stopsString: string): number {
  if (stopsString === "Direct") {
    return 0;
  }
  const match = stopsString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function filterFlights(
  flights: INormalizedFlightOffer[],
  filters: IFlightFilters,
): INormalizedFlightOffer[] {
  return flights.filter((flight) => {
    const {
      departureDate,
      returnDate,
      travelClass,
      departureTime,
      returnTime,
      maxNumberOfStops,
      priceRange,
      includedAirlineCodes,
      nonStop,
      tripType,
      maxDuration,
      bookableSeats,
    } = filters;

    if (tripType === "ONE_WAY" && flight.isRoundTrip) {
      return false;
    }

    if (tripType === "ROUND_TRIP" && !flight.isRoundTrip) {
      return false;
    }

    if (departureDate && flight.outbound.departureDate !== departureDate) {
      return false;
    }

    if (
      tripType === "ROUND_TRIP" &&
      returnDate &&
      flight.return &&
      flight.return.departureDate !== returnDate
    ) {
      return false;
    }

    if (travelClass && flight.travelClass !== travelClass) {
      console.log("travelClass", travelClass);
      return false;
    }

    if (typeof maxNumberOfStops === "number") {
      const outboundStops = parseStops(flight.outbound.stops);
      if (outboundStops > maxNumberOfStops) {
        return false;
      }

      if (flight.return) {
        const returnStops = parseStops(flight.return.stops);
        if (returnStops > maxNumberOfStops) {
          return false;
        }
      }
    }

    if (nonStop === true) {
      if (parseStops(flight.outbound.stops) !== 0) return false;
      if (flight.return && parseStops(flight.return.stops) !== 0) return false;
    }

    const departureRange = parseHourRangeToMinutes(departureTime);

    if (departureRange) {
      const minutes = extractMinutesFromISO(flight.outbound.departureTime);

      if (minutes < departureRange.start || minutes > departureRange.end) {
        return false;
      }
    }

    const returnRange = parseHourRangeToMinutes(returnTime);

    if (returnRange) {
      if (!flight.return) return false;

      const minutes = extractMinutesFromISO(flight.outbound.arrivalTime);

      if (minutes < returnRange.start || minutes > returnRange.end) {
        return false;
      }
    }

    if (maxDuration) {
      const maxMinutes = Number(maxDuration) * 60;

      if (flight.outbound.durationMinutes > maxMinutes) {
        return false;
      }

      if (flight.return && flight.return.durationMinutes > maxMinutes) {
        return false;
      }
    }
    if (
      includedAirlineCodes &&
      includedAirlineCodes.length > 0 &&
      !includedAirlineCodes.includes(flight.outbound.airline)
    ) {
      return false;
    }
    if (!isWithinPrice(flight.price, priceRange)) {
      return false;
    }

    if (!bookableSeats || bookableSeats === 1) return true;

    if (typeof flight.numberOfBookableSeats === "undefined") return false;

    if (flight.numberOfBookableSeats <= bookableSeats) return false;

    return true;
  });
}
