import { IAmadeusFlightOffer, TTravelClass } from "../types/offers";

export function extractTravelClass(offer: IAmadeusFlightOffer): TTravelClass {
  const traveler = offer.travelerPricings?.[0];
  const fareSegment = traveler?.fareDetailsBySegment?.[0];

  return (fareSegment?.cabin ?? "ECONOMY") as TTravelClass;
}
