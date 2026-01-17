import { useQuery } from "@tanstack/react-query";
import { getAirlines } from "../services/aeroServices";
import { QUERY_KEYS } from "../constants/queryKeys";
import { cleanRecord, toQueryString } from "../lib/utils";
import { IAirlinesResponse } from "../types/airlines";
import { useGetOffers } from "./useGetOffers";

export const useGetAirlines = () => {
  const { airlinesCarriers } = useGetOffers();

  const paramsObj = {
    airlineCodes: airlinesCarriers,
  };
  const queryString = toQueryString(paramsObj);
  return useQuery<IAirlinesResponse>({
    queryFn: async () => await getAirlines(cleanRecord(paramsObj)),
    queryKey: [...QUERY_KEYS.getOffersKey(queryString)],
    enabled: !!airlinesCarriers,
  });
};
