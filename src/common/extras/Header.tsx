"use client";

import Image from "next/image";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Paper,
  Autocomplete,
  IconButton,
  Popover,
  Fab,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SearchIcon from "@mui/icons-material/Search";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PublicIcon from "@mui/icons-material/Public";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DiamondIcon from "@mui/icons-material/Diamond";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TuneIcon from "@mui/icons-material/Tune";
import { useDrawer } from "@/src/hooks/useDrawer";
import { useHeader } from "@/src/hooks/useHeader";
import Navbar from "./Navbar";

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

const Header = () => {
  const { open: openDrawer } = useDrawer();
  const {
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
    totalPassengers,
    passengersOpen,
    handleSwapLocations,
    handleExplore,
  } = useHeader();
  return (
    <>
      <div className="">
        <Navbar />
        <div className="relative md:h-[85vh] md:min-h-150 min-h-[120vh] w-full overflow-visible flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/flights.jpg"
              alt="Adventure Background"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
          </div>
          <div className="relative z-10 w-full max-w-4xl px-4 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-up">
              Discover Your Journey
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight shadow-sm">
              Where do you want to <br />
              <span className="italic text-blue-200">go next?</span>
            </h1>
            <Paper
              elevation={24}
              className="rounded-5xl backdrop-blur-sm bg-white/95"
              sx={{
                borderRadius: 4,
                overflow: "visible",
                position: "relative",
              }}
            >
              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-8">
                  <Select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 130,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused": { bgcolor: "#f8fafc" },
                    }}
                    renderValue={(value) => {
                      const options = {
                        roundtrip: {
                          icon: <SyncAltIcon fontSize="small" />,
                          label: "Round Trip",
                        },
                        oneway: {
                          icon: <TrendingFlatIcon fontSize="small" />,
                          label: "One Way",
                        },
                        multicity: {
                          icon: <PublicIcon fontSize="small" />,
                          label: "Multi-City",
                        },
                      };
                      const selected = options[value as keyof typeof options];
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {selected.icon} {selected.label}
                        </Box>
                      );
                    }}
                  >
                    <MenuItem value="roundtrip">
                      <SyncAltIcon fontSize="small" sx={{ mr: 1 }} /> Round Trip
                    </MenuItem>
                    <MenuItem value="oneway">
                      <TrendingFlatIcon fontSize="small" sx={{ mr: 1 }} /> One
                      Way
                    </MenuItem>
                    <MenuItem value="multicity">
                      <PublicIcon fontSize="small" sx={{ mr: 1 }} /> Multi-City
                    </MenuItem>
                  </Select>

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
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
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

                  <Select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 120,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused": { bgcolor: "#f8fafc" },
                    }}
                    renderValue={(value) => {
                      const options = {
                        economy: {
                          icon: (
                            <AirlineSeatReclineNormalIcon fontSize="small" />
                          ),
                          label: "Economy",
                        },
                        business: {
                          icon: <BusinessCenterIcon fontSize="small" />,
                          label: "Business",
                        },
                        first: {
                          icon: <DiamondIcon fontSize="small" />,
                          label: "First",
                        },
                      };
                      const selected = options[value as keyof typeof options];
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {selected.icon} {selected.label}
                        </Box>
                      );
                    }}
                  >
                    <MenuItem value="economy">
                      <AirlineSeatReclineNormalIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                      />{" "}
                      Economy
                    </MenuItem>
                    <MenuItem value="business">
                      <BusinessCenterIcon fontSize="small" sx={{ mr: 1 }} />{" "}
                      Business
                    </MenuItem>
                    <MenuItem value="first">
                      <DiamondIcon fontSize="small" sx={{ mr: 1 }} /> First
                      Class
                    </MenuItem>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 relative">
                  <div className="grid col-span-2 grid-cols-2 gap-5 relative">
                    <Autocomplete
                      options={airports}
                      value={isSwapped ? destination : origin}
                      onChange={(_, newValue) =>
                        isSwapped
                          ? setDestination(newValue)
                          : setOrigin(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={isSwapped ? "To" : "From"}
                          placeholder={isSwapped ? "Where to" : "Where from"}
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  {isSwapped ? (
                                    <FlightLandIcon
                                      sx={{
                                        color: "#ec4899",
                                        mr: 1.5,
                                        ml: 1,
                                      }}
                                    />
                                  ) : (
                                    <FlightTakeoffIcon
                                      sx={{
                                        color: "#6366f1",
                                        mr: 1.5,
                                        ml: 1,
                                      }}
                                    />
                                  )}
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: isSwapped ? "#ec4899" : "#6366f1",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: isSwapped ? "#ec4899" : "#6366f1",
                              },
                            },
                          }}
                        />
                      )}
                    />

                    <Button
                      onClick={handleSwapLocations}
                      sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        minWidth: "auto",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "white",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        opacity: 1,
                        "&:hover": {
                          bgcolor: "#f3f4f6",
                          transform: "translate(-50%, -50%) rotate(180deg)",
                          transition: "transform 0.3s ease",
                          opacity: 1,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <SwapHorizIcon sx={{ color: "#6366f1" }} />
                    </Button>

                    <Autocomplete
                      options={airports}
                      value={isSwapped ? origin : destination}
                      onChange={(_, newValue) =>
                        isSwapped
                          ? setOrigin(newValue)
                          : setDestination(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={isSwapped ? "From" : "To"}
                          placeholder={isSwapped ? "Where from" : "Where to"}
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  {isSwapped ? (
                                    <FlightTakeoffIcon
                                      sx={{
                                        color: "#6366f1",
                                        mr: 1.5,
                                        ml: 1,
                                      }}
                                    />
                                  ) : (
                                    <FlightLandIcon
                                      sx={{
                                        color: "#ec4899",
                                        mr: 1.5,
                                        ml: 1,
                                      }}
                                    />
                                  )}
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: isSwapped ? "#6366f1" : "#ec4899",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: isSwapped ? "#6366f1" : "#ec4899",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-1">
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
                                "&:hover fieldset": {
                                  borderColor: "#6366f1",
                                },
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
                </div>
              </div>
              <Box sx={{ position: "relative", pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  // disabled={
                  //   origin?.code === "" ||
                  //   destination?.code === "" ||
                  //   origin?.code === destination?.code
                  // }
                  startIcon={<SearchIcon />}
                  onClick={handleExplore}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: -24,
                    transform: "translateX(-50%)",
                    bgcolor: "#6366f1",
                    color: "white",
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
                    "&:hover": {
                      bgcolor: "#4f46e5",
                      transform: "translateX(-50%) translateY(-2px)",
                      boxShadow: "0 12px 24px rgba(99, 102, 241, 0.4)",
                    },
                    transition: "all 0.3s ease",
                    "&:disabled": {
                      bgcolor: "#4f46e5",
                      opacity: 0.9,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Paper>
          </div>
        </div>
      </div>
      <Fab
        color="primary"
        onClick={() => openDrawer("filter", true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { xs: "flex", lg: "none" },
          background:
            "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          "&:hover": {
            background:
              "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
          },
          zIndex: 1000,
        }}
      >
        <TuneIcon />
      </Fab>
    </>
  );
};

export default Header;
