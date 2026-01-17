import { IMeta } from "./meta";

export interface IAmadeusFlightOffer {
  id: string;
  numberOfBookableSeats: number;
  price: {
    currency: string;
    grandTotal: string;
    total: string;
    base: string;
  };
  travelerPricings: {
    travelerId: string;
    fareOption: string;
    fareDetailsBySegment: {
      segmentId: string;
      cabin: TTravelClass;
      fareBasis: string;
    }[];
  }[];
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
    }[];
  }[];
}

export interface IAmadeusFlightOfferResponse {
  data: IAmadeusFlightOffer[];
  carriers: {
    F9: string;
    NK: string;
  };
  meta: IMeta;
  currencies: {
    [key: string]: string;
  };
}

export interface IFlightLeg {
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  departureTimeLabel: string;
  arrivalTimeLabel: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  durationMinutes: number;

  stops: string;
}

export interface INormalizedFlightOffer {
  id: string;
  price: number;
  currency: string;
  isRoundTrip: boolean;
  outbound: IFlightLeg;
  return?: IFlightLeg;
  numberOfBookableSeats: number;
  travelClass: TTravelClass;
}

export type TTripType = "ONE_WAY" | "ROUND_TRIP";
export type TTravelClass = "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";

export interface IFlightFilters {
  departureDate?: string; // YYYY-MM-DD
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  travelClass?: TTravelClass | null;
  departureTime?: string;
  returnTime?: string;
  maxDuration?: string;
  maxNumberOfStops?: number;
  priceRange?: string;
  includedAirlineCodes?: string[];
  nonStop?: boolean;
  tripType?: TTripType;
  bookableSeats?: number;
}

export type TPriceStats = {
  price: number;
  currency: string;
  label: string;
};
