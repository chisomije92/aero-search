import { useState, useCallback, useMemo } from "react";
import { useQueryParams } from "./useQueryParams";

const DEFAULT_FILTERS = {
  selectedAirlines: [],
  priceRange: [0, 1000] as [number, number],
  maxStops: "all",
  departureTime: [0, 24] as [number, number],
  arrivalTime: [0, 24] as [number, number],
  maxDuration: 48,
};

export const useFilters = () => {
  const {
    getQueryParamArray,
    setQueryParamArray,
    getQueryParam,
    setQueryParam,
    setMultipleQueryParams,
  } = useQueryParams();

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>(
    getQueryParamArray("airlines").length > 0
      ? getQueryParamArray("airlines")
      : DEFAULT_FILTERS.selectedAirlines,
  );

  const [priceRange, setPriceRange] = useState<number[]>(
    getQueryParamArray("priceRange").length > 0
      ? getQueryParamArray("priceRange").map(Number)
      : DEFAULT_FILTERS.priceRange,
  );

  const [maxStops, setMaxStops] = useState<number | string>(
    getQueryParam("maxStops")
      ? Number(getQueryParam("maxStops"))
      : DEFAULT_FILTERS.maxStops,
  );

  const [departureTime, setDepartureTime] = useState<number[]>(
    getQueryParamArray("departureTime").length > 0
      ? getQueryParamArray("departureTime").map(Number)
      : DEFAULT_FILTERS.departureTime,
  );

  const [arrivalTime, setArrivalTime] = useState<number[]>(
    getQueryParamArray("arrivalTime").length > 0
      ? getQueryParamArray("arrivalTime").map(Number)
      : DEFAULT_FILTERS.arrivalTime,
  );

  const [maxDuration, setMaxDuration] = useState<number>(
    getQueryParam("maxDuration")
      ? Number(getQueryParam("maxDuration"))
      : DEFAULT_FILTERS.maxDuration,
  );

  const [airlinesOpen, setAirlinesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [stopsOpen, setStopsOpen] = useState(true);
  const [departureOpen, setDepartureOpen] = useState(
    getQueryParamArray("departureTime").length > 0,
  );
  const [arrivalOpen, setArrivalOpen] = useState(
    getQueryParamArray("arrivalTime").length > 0,
  );
  const [durationOpen, setDurationOpen] = useState(
    getQueryParam("maxDuration") ? true : false,
  );

  const handleAirlineToggle = useCallback(
    (airline: string) => {
      const updated = selectedAirlines.includes(airline)
        ? selectedAirlines.filter((a) => a !== airline)
        : [...selectedAirlines, airline];
      setSelectedAirlines(updated);
      setQueryParamArray("airlines", updated);
    },
    [selectedAirlines, setQueryParamArray],
  );

  const handlePriceChange = useCallback(
    (newValue: number[]) => {
      setPriceRange(newValue);
      setQueryParamArray("priceRange", newValue.map(String));
    },
    [setQueryParamArray],
  );

  const handleMaxStopsChange = useCallback(
    (newValue: number | string) => {
      setMaxStops(newValue);
      setQueryParam("maxStops", String(newValue));
    },
    [setQueryParam],
  );

  const handleDepartureTimeChange = useCallback(
    (newValue: number[]) => {
      setDepartureTime(newValue);
      setQueryParamArray("departureTime", newValue.map(String));
    },
    [setQueryParamArray],
  );

  const handleArrivalTimeChange = useCallback(
    (newValue: number[]) => {
      setArrivalTime(newValue);
      setQueryParamArray("arrivalTime", newValue.map(String));
    },
    [setQueryParamArray],
  );

  const handleMaxDurationChange = useCallback(
    (newValue: number) => {
      setMaxDuration(newValue);
      setQueryParam("maxDuration", String(newValue));
    },
    [setQueryParam],
  );

  const resetFilters = useCallback(() => {
    setSelectedAirlines(DEFAULT_FILTERS.selectedAirlines);
    setPriceRange(DEFAULT_FILTERS.priceRange);
    setMaxStops(DEFAULT_FILTERS.maxStops);
    setDepartureTime(DEFAULT_FILTERS.departureTime);
    setArrivalTime(DEFAULT_FILTERS.arrivalTime);
    setMaxDuration(DEFAULT_FILTERS.maxDuration);

    setMultipleQueryParams({
      airlines: [],
      priceRange: [],
      maxStops: "",
      departureTime: [],
      arrivalTime: [],
      maxDuration: "",
    });
  }, [setMultipleQueryParams]);

  return useMemo(
    () => ({
      selectedAirlines,
      priceRange,
      maxStops,
      departureTime,
      arrivalTime,
      maxDuration,

      // Collapse states
      airlinesOpen,
      priceOpen,
      stopsOpen,
      departureOpen,
      arrivalOpen,
      durationOpen,

      // Handlers
      handleAirlineToggle,
      handlePriceChange,
      handleMaxStopsChange,
      handleDepartureTimeChange,
      handleArrivalTimeChange,
      handleMaxDurationChange,
      setAirlinesOpen,
      setPriceOpen,
      setStopsOpen,
      setDepartureOpen,
      setArrivalOpen,
      setDurationOpen,

      // Reset
      resetFilters,
    }),
    [
      selectedAirlines,
      priceRange,
      maxStops,
      departureTime,
      arrivalTime,
      maxDuration,
      airlinesOpen,
      priceOpen,
      stopsOpen,
      departureOpen,
      arrivalOpen,
      durationOpen,
      handleAirlineToggle,
      handlePriceChange,
      handleMaxStopsChange,
      handleDepartureTimeChange,
      handleArrivalTimeChange,
      handleMaxDurationChange,
      resetFilters,
    ],
  );
};
