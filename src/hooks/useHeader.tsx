import { useState, useCallback, useMemo } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useQueryParams } from "./useQueryParams";
import { toast } from "mui-sonner";
import { useGetLocations } from "./useGetLocations";
import { useDebounce } from "./useDebounce";
import { ILocation } from "@/src/types/locations";
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from "@mui/material";

const DEFAULT_HEADER = {
  origin: null as ILocation | null,
  destination: null as ILocation | null,
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

  const [originSearchInput, setOriginSearchInput] = useState(
    getQueryParam("originName") || "",
  );
  const [destinationSearchInput, setDestinationSearchInput] = useState(
    getQueryParam("destinationName") || "",
  );

  const debouncedOriginSearch = useDebounce(originSearchInput, 300);
  const debouncedDestinationSearch = useDebounce(destinationSearchInput, 300);

  const {
    data: originLocationsResponse,
    isPending: isSearchingOrigins,
    isFetching: isFetchingOrigins,
    // isLoading: isLoadingOrigins,
  } = useGetLocations(debouncedOriginSearch);
  const {
    data: destinationLocationsResponse,
    isPending: isSearchingDestinations,
    isFetching: isFetchingDestinations,
    // isLoading: isLoadingDestinations,
  } = useGetLocations(debouncedDestinationSearch);

  const originLocations = useMemo(() => {
    if (!originLocationsResponse?.data) return [];
    return originLocationsResponse.data;
  }, [originLocationsResponse]);

  const destinationLocations = useMemo(() => {
    if (!destinationLocationsResponse?.data) return [];
    return destinationLocationsResponse.data;
  }, [destinationLocationsResponse]);

  const [origin, setOriginState] = useState<ILocation | null>(() => {
    const originCode = getQueryParam("origin");
    if (originCode) {
      return originLocations.find((a) => a.iataCode === originCode) || null;
    }
    return DEFAULT_HEADER.origin;
  });

  const [destination, setDestinationState] = useState<ILocation | null>(() => {
    const destinationCode = getQueryParam("destination");
    if (destinationCode) {
      return (
        destinationLocations.find((a) => a.iataCode === destinationCode) || null
      );
    }
    return DEFAULT_HEADER.destination;
  });

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

  const setOrigin = useCallback((value: ILocation | null) => {
    setOriginState(value);
    // setQueryParam("origin", value?.code || null);
  }, []);

  const setDestination = useCallback((value: ILocation | null) => {
    setDestinationState(value);
    // setQueryParam("destination", value?.code || null);
  }, []);

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

  const totalPassengers = adults + children + infantsSeat;
  const passengersOpen = Boolean(passengersAnchor);

  const handleSwapLocations = useCallback(() => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setIsSwapped((prev) => !prev);
  }, [origin, destination, setOrigin, setDestination]);

  const handleExplore = useCallback(() => {
    const params: Record<string, string | null> = {
      origin: origin?.iataCode || null,
      destination: destination?.iataCode || null,
      originName: originSearchInput || null,
      destinationName: destinationSearchInput || null,
      startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
      tripType,
      adults: adults.toString(),
      children: children.toString(),
      // infantsLap: infantsLap.toString(),
      infantsSeat: infantsSeat.toString(),
      travelClass,
    };

    if (!params?.origin && !originSearchInput) {
      toast.warning("Please select an origin airport.");
      return;
    } else {
      params.origin =
        origin?.iataCode ||
        getQueryParam("origin") ||
        originLocations.find((loc) => loc.name === originSearchInput)
          ?.iataCode ||
        null;
    }

    if (!params?.destination && !destinationSearchInput) {
      toast.warning("Please select a destination airport.");
      return;
    } else {
      params.destination =
        destination?.iataCode ||
        getQueryParam("destination") ||
        destinationLocations.find((loc) => loc.name === destinationSearchInput)
          ?.iataCode ||
        null;
    }

    if (!params?.startDate) {
      toast.warning("Please select a start date.");
      return;
    }

    if (tripType === "roundtrip" && !params?.endDate) {
      toast.warning("Please select an end date.");
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
    // infantsLap,
    infantsSeat,
    travelClass,
    originSearchInput,
    destinationSearchInput,
    originLocations,
    destinationLocations,
    getQueryParam,
    setMultipleQueryParams,
  ]);
  const handleChangeOrigin = useCallback(
    (newValue: ILocation | null, reason: AutocompleteChangeReason) => {
      if (reason === "clear") {
        setOrigin(null);
        setOriginSearchInput("");
      }
      if (!newValue) return;
      if (isSwapped) {
        setDestination(newValue);
        setDestinationSearchInput(newValue.name);
      } else {
        setOrigin(newValue);
        setOriginSearchInput(newValue.name);
      }
    },
    [isSwapped, setDestination, setOrigin],
  );

  const handleChangeDestination = useCallback(
    (newValue: ILocation | null, reason: AutocompleteChangeReason) => {
      if (reason === "clear") {
        setDestination(null);
        setDestinationSearchInput("");
      }
      if (!newValue) return;
      if (isSwapped) {
        setOrigin(newValue);
        setOriginSearchInput(newValue.name);
      } else {
        setDestination(newValue);
        setDestinationSearchInput(newValue.name);
      }
    },
    [isSwapped, setDestination, setOrigin],
  );

  const handleChangeOriginInput = useCallback(
    (newValue: string, reason: AutocompleteInputChangeReason) => {
      if (reason === "input") {
        if (isSwapped) {
          setDestinationSearchInput(newValue);
        } else {
          setOriginSearchInput(newValue);
        }
      }
    },
    [isSwapped],
  );

  const handleChangeDestinationInput = useCallback(
    (newValue: string, reason: AutocompleteInputChangeReason) => {
      if (reason === "input") {
        if (isSwapped) {
          setOriginSearchInput(newValue);
        } else {
          setDestinationSearchInput(newValue);
        }
      }
    },
    [isSwapped],
  );

  const isSearching = isFetchingDestinations || isFetchingOrigins;

  return useMemo(
    () => ({
      origin,
      setOrigin,
      destination,
      setDestination,
      originLocations,
      destinationLocations,
      originSearchInput,
      setOriginSearchInput,
      destinationSearchInput,
      setDestinationSearchInput,
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
      handleChangeOrigin,
      handleChangeDestination,
      handleChangeOriginInput,
      handleChangeDestinationInput,
      loadingLocations: isSearchingOrigins || isSearchingDestinations,

      hasNotTypedEnough:
        (isSwapped ? originSearchInput : destinationSearchInput).length < 1,
      isSearching,
      noResults:
        (isFetchingDestinations || isFetchingOrigins) &&
        (isSwapped ? originLocations : destinationLocations).length === 0,
    }),
    [
      origin,
      destination,
      originLocations,
      destinationLocations,
      originSearchInput,
      destinationSearchInput,
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
      isSearchingOrigins,
      isSearchingDestinations,
      isFetchingDestinations,
      isFetchingOrigins,
      isSearching,
      setAdults,
      setChildren,
      setInfantsLap,
      setInfantsSeat,
      setTravelClass,
      setOrigin,
      setDestination,
      setOriginSearchInput,
      setDestinationSearchInput,
      setStartDate,
      setEndDate,
      setTripType,
      handleSwapLocations,
      handleExplore,
      handleChangeOrigin,
      handleChangeDestination,
      handleChangeOriginInput,
      handleChangeDestinationInput,
    ],
  );
};
