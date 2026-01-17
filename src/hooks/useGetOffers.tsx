import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../services/aeroServices";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useQueryParams } from "./useQueryParams";
import { cleanRecord, toQueryString } from "../lib/utils";
import {
  IAmadeusFlightOfferResponse,
  TTravelClass,
  TTripType,
} from "../types/offers";
import { normalizeFlightOffer } from "../lib/normalization";
import { filterFlights } from "../lib/filters";
import { useMemo } from "react";
import {
  buildPriceProfile,
  buildSpacedDayOffsets,
  priceForDay,
} from "../lib/trends";

export const useGetOffers = () => {
  const { getQueryParam } = useQueryParams();
  const origin = getQueryParam("origin");
  const destination = getQueryParam("destination");
  const tripType =
    getQueryParam("tripType") === "roundtrip"
      ? "ROUND_TRIP"
      : ("ONE_WAY" as TTripType);

  const paramsObj = {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: getQueryParam("startDate"),
    returnDate: getQueryParam("endDate"),
  };

  const clientFilters = {
    departureDate: getQueryParam("startDate") || "",
    returnDate: tripType !== "ROUND_TRIP" ? "" : getQueryParam("endDate") || "",
    departureTime: getQueryParam("departureTime") || "",
    returnTime: getQueryParam("arrivalTime") || "",
    maxNumberOfStops: getQueryParam("maxStops")
      ? Number(getQueryParam("maxStops"))
      : undefined,
    maxDuration: getQueryParam("maxDuration") || "",
    priceRange: getQueryParam("priceRange")?.replace(",", "-"),
    includedAirlineCodes: getQueryParam("airlines")?.split(","),
    nonStop: getQueryParam("nonStop") === "true",
    travelClass: getQueryParam("travelClass") as TTravelClass,
    bookableSeats:
      Number(getQueryParam("adults")) +
      Number(getQueryParam("children")) +
      Number(getQueryParam("infants")) +
      Number(getQueryParam("infantsSeat")),
    tripType: tripType,
  };
  const queryString = toQueryString(paramsObj);

  const query = useQuery({
    queryFn: async () =>
      await getOffers(
        cleanRecord({ ...paramsObj, adults: getQueryParam("adults") }),
      ),
    queryKey: [...QUERY_KEYS.getOffersKey(queryString)],
    enabled: !!origin && !!destination,
    select: (response: IAmadeusFlightOfferResponse) => {
      const normalized = response.data?.map(normalizeFlightOffer) ?? [];

      const offersAirlines = new Set<string>(
        normalized.map((offer) => offer.outbound.airline),
      );
      return {
        normalizeFlightOffers: filterFlights(normalized, clientFilters),
        normalizedDataOffers: normalized,
        airlinesCarriers: Array.from(offersAirlines).join(","),
        ...response,
      };
    },
  });

  const simulatedTrendData = useMemo(() => {
    if (!query.data?.normalizeFlightOffers.length) return [];

    const currency = query.data?.normalizeFlightOffers[0].currency;
    const profile = buildPriceProfile(query.data?.normalizeFlightOffers);
    const offsets = buildSpacedDayOffsets(10, 4);

    return offsets.map((daysAgo, index) => ({
      date: daysAgo,
      label: daysAgo === 0 ? "Today" : `${daysAgo}d ago`,
      price: priceForDay(profile, index),
      currency,
    }));
  }, [query.data?.normalizeFlightOffers]);

  const priceStats = useMemo(() => {
    if (!simulatedTrendData.length) return null;

    const prices = simulatedTrendData.map((d) => d.price);
    const currency = simulatedTrendData[0].currency;

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const latest = prices[prices.length - 1];
    const average = prices.reduce((a, b) => a + b, 0) / prices.length;

    let status: "cheap" | "typical" | "expensive";

    if (latest < average * 0.9) status = "cheap";
    else if (latest > average * 1.1) status = "expensive";
    else status = "typical";

    return {
      min,
      max,
      latest,
      average,
      currency,
      status,
    };
  }, [simulatedTrendData]);

  return {
    ...query,
    normalizedDataOffers: query.data?.normalizeFlightOffers || [],
    // priceTrendData: priceTrendData || [],
    simulatedTrendData: simulatedTrendData || [],
    priceStats: priceStats || null,
    airlinesCarriers: query.data?.airlinesCarriers || "",
  };
};
