import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../services/aeroServices";
import { QUERY_KEYS } from "../constants/queryKeys";
import { cleanRecord, toQueryString } from "../lib/utils";
import { ILocationResponse } from "../types/locations";

export const useGetLocations = (keywords: string = "") => {
  const paramsObj = {
    keywords: keywords,
  };
  const queryString = toQueryString(paramsObj);
  return useQuery<ILocationResponse>({
    queryFn: async () => await getLocations(cleanRecord(paramsObj)),
    queryKey: [...QUERY_KEYS.getLocationsKey(queryString)],
    enabled: !!keywords,
  });
};
