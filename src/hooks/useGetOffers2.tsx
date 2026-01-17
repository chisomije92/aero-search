import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../services/aeroServices";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useQueryParams } from "./useQueryParams";
import { cleanRecord, toQueryString } from "../lib/utils";
import { IAmadeusFlightOfferResponse } from "../types/offers";
import { useEffect, useMemo, useRef } from "react";
import { normalizeFlightOffer } from "../lib/normalization";
import { usePagination } from "./usePagination";

export const useGetOffers = () => {
  const flightsRef = useRef<HTMLDivElement>(null);
  const { getQueryParam } = useQueryParams();
  const origin = getQueryParam("origin");
  const destination = getQueryParam("destination");
  const paramsObj = {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: getQueryParam("startDate"),
    returnDate: getQueryParam("endDate"),
    adults: getQueryParam("adults"),
    // max: "20",
    travelClass: getQueryParam("travelClass"),
    children: getQueryParam("children"),
    infants: getQueryParam("infants"),
    departureTime: getQueryParam("departureTime"),
    returnTime: getQueryParam("arrivalTime"),
    maxNumberOfStops: getQueryParam("maxStops"),
    priceRange: getQueryParam("priceRange")?.replace(",", "-"),
    includedAirlineCodes: getQueryParam("airlines"),
    nonStop: getQueryParam("nonStop"),
    tripType: getQueryParam("tripType"),
  };
  const queryString = toQueryString(paramsObj);
  const query = useQuery<IAmadeusFlightOfferResponse>({
    queryFn: async () => await getOffers(cleanRecord(paramsObj)),
    queryKey: [...QUERY_KEYS.getOffersKey(queryString)],
    enabled: !!origin && !!destination,
  });

  const normalizedDataOffers = useMemo(
    () => [
      ...(query.data?.data?.map((offer) => normalizeFlightOffer(offer)) || []),
    ],
    [query.data?.data],
  );

  const {
    currentPage,
    currentPageSize,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination({
    initialPage: 1,
    pageSize: 10,
  });

  const totalPages = useMemo(
    () => Math.ceil(normalizedDataOffers.length / currentPageSize),
    [normalizedDataOffers.length, currentPageSize],
  );

  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return normalizedDataOffers.slice(startIndex, endIndex);
  }, [normalizedDataOffers, currentPage, currentPageSize]);

  useEffect(() => {
    flightsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, currentPageSize]);

  return {
    ...query,
    normalizedDataOffers: paginatedOffers,
    allOffers: normalizedDataOffers,
    currentPage,
    currentPageSize,
    totalPages,
    flightsRef,

    handlePageChange,
    handlePageSizeChange,
  };
};
