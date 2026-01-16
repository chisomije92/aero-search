"use client";

import React, { useState, useMemo } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Box,
  Paper,
  Autocomplete,
  Popover,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import { Dayjs } from "dayjs";

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  class: string;
}

const mockFlights: Flight[] = [
  {
    id: 1,
    airline: "Delta",
    flightNumber: "DL123",
    departure: "08:00",
    arrival: "11:30",
    duration: "3h 30m",
    price: 320,
    stops: 0,
    class: "Economy",
  },
  {
    id: 2,
    airline: "United",
    flightNumber: "UA456",
    departure: "09:15",
    arrival: "13:00",
    duration: "3h 45m",
    price: 285,
    stops: 1,
    class: "Economy",
  },
  {
    id: 3,
    airline: "American",
    flightNumber: "AA789",
    departure: "10:30",
    arrival: "14:15",
    duration: "3h 45m",
    price: 410,
    stops: 0,
    class: "Business",
  },
  {
    id: 4,
    airline: "Southwest",
    flightNumber: "SW234",
    departure: "12:00",
    arrival: "15:45",
    duration: "3h 45m",
    price: 265,
    stops: 1,
    class: "Economy",
  },
  {
    id: 5,
    airline: "JetBlue",
    flightNumber: "B6567",
    departure: "14:30",
    arrival: "18:00",
    duration: "3h 30m",
    price: 295,
    stops: 0,
    class: "Economy",
  },
  {
    id: 6,
    airline: "Delta",
    flightNumber: "DL890",
    departure: "16:00",
    arrival: "19:30",
    duration: "3h 30m",
    price: 340,
    stops: 0,
    class: "Economy",
  },
  {
    id: 7,
    airline: "United",
    flightNumber: "UA234",
    departure: "18:00",
    arrival: "22:15",
    duration: "4h 15m",
    price: 450,
    stops: 0,
    class: "Business",
  },
  {
    id: 8,
    airline: "American",
    flightNumber: "AA345",
    departure: "20:00",
    arrival: "23:45",
    duration: "3h 45m",
    price: 310,
    stops: 1,
    class: "Economy",
  },
];

const mockPriceTrends = [
  { day: "Mon", price: 285 },
  { day: "Tue", price: 295 },
  { day: "Wed", price: 270 },
  { day: "Thu", price: 310 },
  { day: "Fri", price: 340 },
  { day: "Sat", price: 380 },
  { day: "Sun", price: 320 },
];

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

const Home = () => {
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

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([
    "Delta",
    "United",
    "American",
    "Southwest",
    "JetBlue",
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [maxStops, setMaxStops] = useState(2);

  const totalPassengers = adults + children + infantsLap + infantsSeat;
  const passengersOpen = Boolean(passengersAnchor);

  const airlines = ["Delta", "United", "American", "Southwest", "JetBlue"];

  const filteredFlights = useMemo(() => {
    return mockFlights.filter((flight) => {
      const matchesAirline = selectedAirlines.includes(flight.airline);
      const matchesPrice =
        flight.price >= priceRange[0] && flight.price <= priceRange[1];
      const matchesStops = flight.stops <= maxStops;
      const matchesClass =
        travelClass === "economy"
          ? flight.class === "Economy"
          : flight.class === "Business";
      return matchesAirline && matchesPrice && matchesStops && matchesClass;
    });
  }, [selectedAirlines, priceRange, maxStops, travelClass]);

  const columns: GridColDef[] = [
    { field: "airline", headerName: "Airline", flex: 1, minWidth: 120 },
    { field: "flightNumber", headerName: "Flight", width: 100 },
    { field: "departure", headerName: "Departure", width: 100 },
    { field: "arrival", headerName: "Arrival", width: 100 },
    { field: "duration", headerName: "Duration", width: 110 },
    { field: "stops", headerName: "Stops", width: 80 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <span className="font-bold text-indigo-600">${params.value}</span>
      ),
    },
  ];

  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline]
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                Discover Your Journey
              </h1>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Search thousands of flights and find the perfect one for you
              </p>
            </div>

            {/* Search Card */}
            <Paper
              elevation={24}
              className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/95"
            >
              <div className="p-8">
                {/* Trip Options */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel sx={{ fontSize: "0.875rem" }}>
                      Trip Type
                    </InputLabel>
                    <Select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      label="Trip Type"
                      sx={{
                        borderRadius: 2,
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&.Mui-focused": { bgcolor: "#f8fafc" },
                      }}
                    >
                      <MenuItem value="roundtrip">Round Trip</MenuItem>
                      <MenuItem value="oneway">One Way</MenuItem>
                      <MenuItem value="multicity">Multi-City</MenuItem>
                    </Select>
                  </FormControl>

                  <Box>
                    <Button
                      size="small"
                      onClick={(e) => setPassengersAnchor(e.currentTarget)}
                      startIcon={<PersonIcon />}
                      sx={{
                        minWidth: 130,
                        height: 40,
                        borderRadius: 2,
                        border: "none",
                        bgcolor: passengersOpen ? "#f8fafc" : "transparent",
                        color: "#374151",
                        fontSize: "0.875rem",
                        textTransform: "none",
                        justifyContent: "flex-start",
                        px: 2,
                        "&:hover": { bgcolor: "#f8fafc" },
                      }}
                    >
                      {totalPassengers}{" "}
                      {totalPassengers === 1 ? "Passenger" : "Passengers"}
                    </Button>
                    <Popover
                      open={passengersOpen}
                      anchorEl={passengersAnchor}
                      onClose={() => setPassengersAnchor(null)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    >
                      <Box sx={{ p: 3, minWidth: 280 }}>
                        {[
                          {
                            label: "Adults",
                            value: adults,
                            setter: setAdults,
                            min: 1,
                          },
                          {
                            label: "Children",
                            value: children,
                            setter: setChildren,
                            min: 0,
                          },
                          {
                            label: "Infants (on lap)",
                            value: infantsLap,
                            setter: setInfantsLap,
                            min: 0,
                          },
                          {
                            label: "Infants (on seat)",
                            value: infantsSeat,
                            setter: setInfantsSeat,
                            min: 0,
                          },
                        ].map(({ label, value, setter, min }) => (
                          <Box
                            key={label}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <span className="text-sm text-gray-700">
                              {label}
                            </span>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => setter(Math.max(min, value - 1))}
                                disabled={value <= min}
                                sx={{
                                  border: "1px solid #e5e7eb",
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <span className="w-8 text-center font-medium">
                                {value}
                              </span>
                              <IconButton
                                size="small"
                                onClick={() => setter(value + 1)}
                                sx={{
                                  border: "1px solid #e5e7eb",
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Popover>
                  </Box>

                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel sx={{ fontSize: "0.875rem" }}>Class</InputLabel>
                    <Select
                      value={travelClass}
                      onChange={(e) => setTravelClass(e.target.value)}
                      label="Class"
                      sx={{
                        borderRadius: 2,
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&.Mui-focused": { bgcolor: "#f8fafc" },
                      }}
                    >
                      <MenuItem value="economy">Economy</MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="first">First Class</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Location & Date Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-6">
                  <Autocomplete
                    options={airports}
                    value={origin}
                    onChange={(_, newValue) => setOrigin(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="From"
                        placeholder="City or airport"
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <FlightTakeoffIcon
                                  sx={{ color: "#6366f1", mr: 1.5 }}
                                />
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "&:hover fieldset": { borderColor: "#6366f1" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#6366f1",
                            },
                          },
                        }}
                      />
                    )}
                  />

                  <Autocomplete
                    options={airports}
                    value={destination}
                    onChange={(_, newValue) => setDestination(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="To"
                        placeholder="City or airport"
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <FlightLandIcon
                                  sx={{ color: "#ec4899", mr: 1.5 }}
                                />
                                {params.InputProps.startAdornment}
                              </>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": { borderColor: "#ec4899" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ec4899",
                            },
                          },
                        }}
                      />
                    )}
                  />

                  <DatePicker
                    label="Departure"
                    value={startDate}
                    onChange={setStartDate}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": { borderColor: "#6366f1" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#6366f1",
                            },
                          },
                        },
                      },
                    }}
                  />

                  {tripType === "roundtrip" && (
                    <DatePicker
                      label="Return"
                      value={endDate}
                      onChange={setEndDate}
                      minDate={startDate || undefined}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": { borderColor: "#6366f1" },
                              "&.Mui-focused fieldset": {
                                borderColor: "#6366f1",
                              },
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<SearchIcon />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 24px rgba(99, 102, 241, 0.4)",
                    },
                    py: 2,
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 3,
                    boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Search Flights
                </Button>
              </div>
            </Paper>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <Paper
                elevation={3}
                className="rounded-2xl overflow-hidden sticky top-6"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
                  <div className="flex items-center gap-2 text-white">
                    <FilterAltIcon />
                    <h3 className="text-xl font-bold">Filters</h3>
                  </div>
                </div>

                <div className="p-6">
                  {/* Airlines */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                      Airlines
                    </h4>
                    <FormGroup>
                      {airlines.map((airline) => (
                        <FormControlLabel
                          key={airline}
                          control={
                            <Checkbox
                              checked={selectedAirlines.includes(airline)}
                              onChange={() => handleAirlineToggle(airline)}
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
                              {airline}
                            </span>
                          }
                        />
                      ))}
                    </FormGroup>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                      Price Range
                    </h4>
                    <Slider
                      value={priceRange}
                      onChange={(_, newValue) =>
                        setPriceRange(newValue as number[])
                      }
                      valueLabelDisplay="auto"
                      min={0}
                      max={500}
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
                        label={`$${priceRange[0]}`}
                        size="small"
                        sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
                      />
                      <Chip
                        label={`$${priceRange[1]}`}
                        size="small"
                        sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }}
                      />
                    </div>
                  </div>

                  {/* Stops */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                      Stops
                    </h4>
                    <FormControl fullWidth size="small">
                      <Select
                        value={maxStops}
                        onChange={(e) => setMaxStops(e.target.value as number)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value={0}>Non-stop</MenuItem>
                        <MenuItem value={1}>1 stop or less</MenuItem>
                        <MenuItem value={2}>2 stops or less</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="pt-5 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Results Found
                      </p>
                      <p className="text-3xl font-bold text-indigo-600">
                        {filteredFlights.length}
                      </p>
                    </div>
                  </div>
                </div>
              </Paper>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 space-y-6">
              {/* Price Trends */}
              <Paper elevation={3} className="rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-5">
                  <div className="flex items-center gap-2 text-white">
                    <TrendingUpIcon />
                    <h3 className="text-xl font-bold">Price Trends</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Prices are currently typical for your search
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">
                      The least expensive flights for similar trips usually cost between $265–$450.
                    </p>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={mockPriceTrends}>
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366f1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="day"
                        stroke="#6b7280"
                        style={{ fontSize: "0.875rem" }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: "0.875rem" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value: number | undefined) =>
                          value !== undefined
                            ? [`$${value}`, "Price"]
                            : ["N/A", "Price"]
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Paper>

              {/* Flights Grid */}
              <Paper elevation={3} className="rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5">
                  <h3 className="text-xl font-bold text-white">
                    Available Flights
                  </h3>
                </div>
                <div className="p-6">
                  <Box sx={{ height: 600, width: "100%" }}>
                    <DataGrid
                      rows={filteredFlights}
                      columns={columns}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                        sorting: {
                          sortModel: [{ field: "price", sort: "asc" }],
                        },
                      }}
                      pageSizeOptions={[5, 10, 25]}
                      disableRowSelectionOnClick
                      sx={{
                        border: "none",
                        "& .MuiDataGrid-cell:focus": { outline: "none" },
                        "& .MuiDataGrid-row": {
                          "&:hover": {
                            bgcolor: "rgba(99, 102, 241, 0.04)",
                            cursor: "pointer",
                          },
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          bgcolor: "#f9fafb",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "#374151",
                        },
                        "& .MuiDataGrid-cell": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>
                </div>
              </Paper>
            </main>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Home;
