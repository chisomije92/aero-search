"use client";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Collapse,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useFilters } from "@/src/hooks/useFilters";
import { useGetAirlines } from "@/src/hooks/useGetAirlines";

const Filters = () => {
  const { data: airlinesData } = useGetAirlines();
  const airlines = airlinesData?.data || [];

  const {
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
    setAirlinesOpen,
    setPriceOpen,
    setStopsOpen,
    setDepartureOpen,
    setArrivalOpen,
    setDurationOpen,
    resetFilters,
  } = useFilters();

  return (
    <div className="p-6">
      {/* Reset Button */}
      <Button
        variant="outlined"
        size="small"
        onClick={resetFilters}
        sx={{
          mb: 4,
          width: "100%",
          borderColor: "#6366f1",
          color: "#6366f1",
          "&:hover": {
            borderColor: "#4f46e5",
            bgcolor: "rgba(99, 102, 241, 0.04)",
          },
        }}
      >
        Reset Filters
      </Button>

      <div className="mb-6 max-h-[40vh] overflow-y-auto">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setAirlinesOpen(!airlinesOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Airlines
          </h4>
          {airlinesOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={airlinesOpen}>
          <FormGroup className="">
            {airlines.map((airline) => (
              <FormControlLabel
                key={airline?.iataCode}
                control={
                  <Checkbox
                    checked={selectedAirlines.includes(airline?.iataCode)}
                    onChange={() => handleAirlineToggle(airline?.iataCode)}
                    size="small"
                    sx={{
                      "&.Mui-checked": { color: "#6366f1" },
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.04)",
                      },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-gray-700">
                    {airline?.commonName ??
                      airline?.businessName ??
                      airline?.iataCode}
                  </span>
                }
              />
            ))}
          </FormGroup>
        </Collapse>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Price Range
          </h4>
          {priceOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={priceOpen}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => handlePriceChange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            valueLabelFormat={(value) => `$${value}`}
            sx={{
              color: "#6366f1",
              "& .MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
                },
              },
            }}
          />
          <div className="flex justify-between mt-3">
            <Chip
              label={`${priceRange[0]}`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
            <Chip
              label={`${priceRange[1]}`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
          </div>
        </Collapse>
      </div>

      {/* Stops */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setStopsOpen(!stopsOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Stops
          </h4>
          {stopsOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={stopsOpen}>
          <FormControl fullWidth size="small">
            <Select
              value={maxStops}
              onChange={(e) => handleMaxStopsChange(e.target.value as number)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value={0}>Non-stop</MenuItem>
              <MenuItem value={1}>1 stop or less</MenuItem>
              <MenuItem value={2}>2 stops or less</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </div>

      {/* Departure Time */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setDepartureOpen(!departureOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Departure Time
          </h4>
          {departureOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={departureOpen}>
          <Slider
            value={departureTime}
            onChange={(_, newValue) =>
              handleDepartureTimeChange(newValue as number[])
            }
            valueLabelDisplay="auto"
            min={0}
            max={24}
            valueLabelFormat={(value) => `${value}:00`}
            sx={{
              color: "#6366f1",
              "& .MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
                },
              },
            }}
          />
          <div className="flex justify-between">
            <Chip
              label={`${departureTime[0]}:00`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
            <Chip
              label={`${departureTime[1]}:00`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
          </div>
        </Collapse>
      </div>

      {/* Arrival Time */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setArrivalOpen(!arrivalOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Arrival Time
          </h4>
          {arrivalOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={arrivalOpen}>
          <Slider
            value={arrivalTime}
            onChange={(_, newValue) =>
              handleArrivalTimeChange(newValue as number[])
            }
            valueLabelDisplay="auto"
            min={0}
            max={24}
            valueLabelFormat={(value) => `${value}:00`}
            sx={{
              color: "#6366f1",
              "& .MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
                },
              },
            }}
          />
          <div className="flex justify-between ">
            <Chip
              label={`${arrivalTime[0]}:00`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
            <Chip
              label={`${arrivalTime[1]}:00`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
          </div>
        </Collapse>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => setDurationOpen(!durationOpen)}
        >
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Max Duration
          </h4>
          {durationOpen ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </div>
        <Collapse in={durationOpen}>
          <Slider
            value={maxDuration}
            onChange={(_, newValue) =>
              handleMaxDurationChange(newValue as number)
            }
            valueLabelDisplay="auto"
            min={1}
            max={48}
            valueLabelFormat={(value) => `${value}h`}
            sx={{
              color: "#6366f1",
              "& .MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
                },
              },
            }}
          />
          <div className="flex justify-center">
            <Chip
              label={`${maxDuration}h`}
              size="small"
              sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
            />
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Filters;
