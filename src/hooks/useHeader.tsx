import { useState, useCallback, useMemo } from "react";
import { Dayjs } from "dayjs";

export const useHeader = () => {
  const [origin, setOrigin] = useState<{ label: string; code: string } | null>(
    null
  );
  const [destination, setDestination] = useState<{
    label: string;
    code: string;
  } | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [tripType, setTripType] = useState("roundtrip");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infantsLap, setInfantsLap] = useState(0);
  const [infantsSeat, setInfantsSeat] = useState(0);
  const [travelClass, setTravelClass] = useState("economy");
  const [passengersAnchor, setPassengersAnchor] = useState<null | HTMLElement>(
    null
  );
  const [isSwapped, setIsSwapped] = useState(false);

  const totalPassengers = adults + children + infantsLap + infantsSeat;
  const passengersOpen = Boolean(passengersAnchor);

  const handleSwapLocations = useCallback(() => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setIsSwapped((prev) => !prev);
  }, [origin, destination]);

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
      handleSwapLocations,
    ]
  );
};
