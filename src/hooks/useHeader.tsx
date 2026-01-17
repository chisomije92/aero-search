import { useState, useCallback, useMemo } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useQueryParams } from "./useQueryParams";
import { toast } from "mui-sonner";
import { useGetLocations } from "./useGetLocations";

const airports = [
  { label: "New York (JFK)", code: "JFK" },
  { label: "Los Angeles (LAX)", code: "LAX" },
  { label: "London (LHR)", code: "LHR" },
  { label: "Paris (CDG)", code: "CDG" },
  { label: "Tokyo (NRT)", code: "NRT" },
  { label: "Dubai (DXB)", code: "DXB" },
  { label: "Singapore (SIN)", code: "SIN" },
  { label: "Hong Kong (HKG)", code: "HKG" },
  { label: "Chicago (ORD)", code: "ORD" },
  { label: "San Francisco (SFO)", code: "SFO" },
  { label: "Miami (MIA)", code: "MIA" },
  { label: "Toronto (YYZ)", code: "YYZ" },
  { label: "Sydney (SYD)", code: "SYD" },
  { label: "Frankfurt (FRA)", code: "FRA" },
  { label: "Amsterdam (AMS)", code: "AMS" },
];

const DEFAULT_HEADER = {
  origin: null as { label: string; code: string } | null,
  destination: null as { label: string; code: string } | null,
  startDate: null as Dayjs | null,
  endDate: null as Dayjs | null,
  tripType: "roundtrip",
  adults: 1,
  children: 0,
  infantsLap: 0,
  infantsSeat: 0,
  travelClass: "ECONOMY",
};

export const useHeader = () => {
  const { getQueryParam, setMultipleQueryParams, setQueryParam } =
    useQueryParams();

  const [origin, setOriginState] = useState<{
    label: string;
    code: string;
  } | null>(() => {
    const originCode = getQueryParam("origin");
    if (originCode) {
      return airports.find((a) => a.code === originCode) || null;
    }
    return DEFAULT_HEADER.origin;
  });

  const [destination, setDestinationState] = useState<{
    label: string;
    code: string;
  } | null>(() => {
    const destinationCode = getQueryParam("destination");
    if (destinationCode) {
      return airports.find((a) => a.code === destinationCode) || null;
    }
    return DEFAULT_HEADER.destination;
  });

  const { data: originLocations } = useGetLocations(origin?.code);
  const { data: destinationLocations } = useGetLocations();
  console.log("originLocations", originLocations);
  const [startDate, setStartDateState] = useState<Dayjs | null>(() => {
    const startDateStr = getQueryParam("startDate");
    if (startDateStr) {
      const parsedDate = dayjs(startDateStr);
      return parsedDate.isValid() ? parsedDate : null;
    }
    return DEFAULT_HEADER.startDate;
  });

  const [endDate, setEndDateState] = useState<Dayjs | null>(() => {
    const endDateStr = getQueryParam("endDate");
    if (endDateStr) {
      const parsedDate = dayjs(endDateStr);
      return parsedDate.isValid() ? parsedDate : null;
    }
    return DEFAULT_HEADER.endDate;
  });

  const [tripType, setTripTypeState] = useState(
    getQueryParam("tripType") || DEFAULT_HEADER.tripType,
  );

  const [adults, setAdultsState] = useState(
    getQueryParam("adults")
      ? parseInt(getQueryParam("adults")!, 10)
      : DEFAULT_HEADER.adults,
  );

  const [children, setChildrenState] = useState(
    getQueryParam("children")
      ? parseInt(getQueryParam("children")!, 10)
      : DEFAULT_HEADER.children,
  );

  const [infantsLap, setInfantsLapState] = useState(
    getQueryParam("infantsLap")
      ? parseInt(getQueryParam("infantsLap")!, 10)
      : DEFAULT_HEADER.infantsLap,
  );

  const [infantsSeat, setInfantsSeatState] = useState(
    getQueryParam("infantsSeat")
      ? parseInt(getQueryParam("infantsSeat")!, 10)
      : DEFAULT_HEADER.infantsSeat,
  );

  const [travelClass, setTravelClassState] = useState(
    getQueryParam("travelClass") || DEFAULT_HEADER.travelClass,
  );
  const [passengersAnchor, setPassengersAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [isSwapped, setIsSwapped] = useState(false);

  const setOrigin = useCallback(
    (value: { label: string; code: string } | null) => {
      setOriginState(value);
      // setQueryParam("origin", value?.code || null);
    },
    [],
  );

  const setDestination = useCallback(
    (value: { label: string; code: string } | null) => {
      setDestinationState(value);
      // setQueryParam("destination", value?.code || null);
    },
    [],
  );

  const setStartDate = useCallback((value: Dayjs | null) => {
    setStartDateState(value);
  }, []);

  const setEndDate = useCallback((value: Dayjs | null) => {
    setEndDateState(value);
  }, []);

  const setTripType = useCallback(
    (value: string) => {
      setTripTypeState(value);
      setQueryParam("tripType", value);
    },
    [setQueryParam],
  );

  const setAdults = useCallback(
    (value: number) => {
      setAdultsState(value);
      setQueryParam("adults", value.toString());
    },
    [setQueryParam],
  );

  const setChildren = useCallback(
    (value: number) => {
      setChildrenState(value);
      setQueryParam("children", value.toString());
    },
    [setQueryParam],
  );

  const setInfantsLap = useCallback(
    (value: number) => {
      setInfantsLapState(value);
      setQueryParam("infantsLap", value.toString());
    },
    [setQueryParam],
  );

  const setInfantsSeat = useCallback(
    (value: number) => {
      setInfantsSeatState(value);
      setQueryParam("infantsSeat", value.toString());
    },
    [setQueryParam],
  );

  const setTravelClass = useCallback(
    (value: string) => {
      setTravelClassState(value);
      setQueryParam("travelClass", value);
    },
    [setQueryParam],
  );

  const totalPassengers = adults + children + infantsLap + infantsSeat;
  const passengersOpen = Boolean(passengersAnchor);

  const handleSwapLocations = useCallback(() => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setIsSwapped((prev) => !prev);
  }, [origin, destination, setOrigin, setDestination]);

  const handleExplore = useCallback(() => {
    const params: Record<string, string | null> = {
      origin: origin?.code || null,
      destination: destination?.code || null,
      startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
      tripType,
      adults: adults.toString(),
      children: children.toString(),
      infantsLap: infantsLap.toString(),
      infantsSeat: infantsSeat.toString(),
      travelClass,
    };

    if (!params?.origin) {
      toast.warning("Please select an origin airport.");
      return;
    }
    if (!params?.destination) {
      toast.warning("Please select a destination airport.");
      return;
    }

    setMultipleQueryParams(params);
  }, [
    origin,
    destination,
    startDate,
    endDate,
    tripType,
    adults,
    children,
    infantsLap,
    infantsSeat,
    travelClass,
    setMultipleQueryParams,
  ]);

  return useMemo(
    () => ({
      origin,
      setOrigin,
      destination,
      setDestination,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      tripType,
      setTripType,
      adults,
      setAdults,
      children,
      setChildren,
      infantsLap,
      setInfantsLap,
      infantsSeat,
      setInfantsSeat,
      travelClass,
      setTravelClass,
      passengersAnchor,
      setPassengersAnchor,
      isSwapped,
      setIsSwapped,
      totalPassengers,
      passengersOpen,
      handleSwapLocations,
      handleExplore,
    }),
    [
      origin,
      destination,
      startDate,
      endDate,
      tripType,
      adults,
      children,
      infantsLap,
      infantsSeat,
      travelClass,
      passengersAnchor,
      isSwapped,
      totalPassengers,
      passengersOpen,
      setAdults,
      setChildren,
      setInfantsLap,
      setInfantsSeat,
      setTravelClass,
      setOrigin,
      setDestination,
      setStartDate,
      setEndDate,
      setTripType,
      handleSwapLocations,
      handleExplore,
    ],
  );
};
