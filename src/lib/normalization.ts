import {
  IAmadeusFlightOffer,
  IFlightLeg,
  INormalizedFlightOffer,
} from "../types/offers";
import {
  extractDate,
  formatDuration,
  formatTime,
  parseDurationToMinutes,
} from "./dateHelper";
import { extractTravelClass } from "./extract";

export function normalizeFlightOffer(
  offer: IAmadeusFlightOffer,
): INormalizedFlightOffer {
  const buildLeg = (
    itinerary: IAmadeusFlightOffer["itineraries"][0],
  ): IFlightLeg => {
    const segments = itinerary.segments;
    const first = segments[0];
    const last = segments[segments.length - 1];

    return {
      airline: first.carrierCode,
      flightNumber: `${first.carrierCode} ${first.number}`,
      origin: first.departure.iataCode,
      destination: last.arrival.iataCode,

      departureDate: extractDate(first.departure.at),

      returnDate: extractDate(last.arrival.at),
      departureTime: first.departure.at,
      arrivalTime: last.arrival.at,
      departureTimeLabel: formatTime(first.departure.at),
      arrivalTimeLabel: formatTime(last.arrival.at),
      duration: formatDuration(itinerary.duration),
      durationMinutes: parseDurationToMinutes(
        formatDuration(itinerary.duration),
      ),

      stops:
        segments.length === 1 ? "Direct" : `${segments.length - 1} stop(s)`,
    };
  };

  const outbound = buildLeg(offer.itineraries[0]);
  const returnLeg = offer.itineraries[1]
    ? buildLeg(offer.itineraries[1])
    : undefined;

  return {
    id: offer.id,
    price: Number(offer.price.grandTotal),
    currency: offer.price.currency,
    isRoundTrip: Boolean(returnLeg),
    numberOfBookableSeats: offer.numberOfBookableSeats,
    outbound,
    return: returnLeg,
    travelClass: extractTravelClass(offer),
  };
}
