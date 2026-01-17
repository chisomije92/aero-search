import { useQuery } from "@tanstack/react-query";
import { cleanRecord, toQueryString } from "../lib/utils";
import { useQueryParams } from "./useQueryParams";
import { QUERY_KEYS } from "../constants/queryKeys";
import { getPriceMetrics } from "../services/aeroServices";

export const useGetPriceTrends = () => {
  const { getQueryParam } = useQueryParams();
  const paramsObj = {
    originLocationCode: getQueryParam("origin"),
    destinationLocationCode: getQueryParam("destination"),
    departureDate: getQueryParam("departureDate"),
  };
  const queryString = toQueryString(paramsObj);

  return useQuery({
    queryKey: [...QUERY_KEYS.getPriceMetricsKey(queryString)],
    queryFn: async () => await getPriceMetrics(cleanRecord(paramsObj)),
  });
};
