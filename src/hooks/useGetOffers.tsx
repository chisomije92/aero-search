import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../services/aeroServices";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useQueryParams } from "./useQueryParams";
import { cleanRecord, toQueryString } from "../lib/utils";

export const useGetOffers = () => {
  const { getQueryParam } = useQueryParams();
  const origin = getQueryParam("origin");
  const destination = getQueryParam("destination");
  const paramsObj = {
    originLocationCode: origin,
    destinationIataCode: destination,
    departureDate: getQueryParam("startDate"),
    returnDate: getQueryParam("endDate"),
    adults: getQueryParam("adults"),
    max: "20",
    travelClass: getQueryParam("travelClass"),
    children: getQueryParam("children"),
    infants: getQueryParam("infants"),
    departureTime: getQueryParam("departureTime"),
    returnTime: getQueryParam("arrivalTime"),
    maxNumberOfStops: getQueryParam("maxStops"),
    priceRange: getQueryParam("priceRange")?.replace(",", "-"),
    includedAirlineCodes: getQueryParam("airlines"),
    nonStop: "",
  };
  const queryString = toQueryString(paramsObj);
  return useQuery({
    queryFn: async () => await getOffers(cleanRecord(paramsObj)),
    queryKey: [...QUERY_KEYS.getOffersKey(queryString)],
    enabled: !!origin && !!destination,
  });
};
