"use client";

import { Card, Box, Typography, Button, Divider } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDrawer } from "@/src/hooks/useDrawer";

type FlightCardProps = {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stops: string;
  price: string;
};

export default function FlightCard({
  airline,
  flightNumber,
  departureTime,
  arrivalTime,
  origin,
  destination,
  duration,
  stops,
  price,
}: FlightCardProps) {
  const { open } = useDrawer();
  return (
    <>
      <Card
        sx={{
          mb: 2,
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(99, 102, 241, 0.15)",
            borderColor: "#6366f1",
            transform: "translateY(-2px)",
            "& .select-btn": {
              background:
                "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
              color: "#fff",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: { xs: 2, md: 0 },
          }}
        >
          {/* Airline */}
          <Box sx={{ flex: { md: 2 }, mb: { xs: 2, md: 0 } }}>
            <Typography
              fontWeight={700}
              fontSize={{ xs: 16, sm: 18 }}
              color="#1f2937"
            >
              {airline}
            </Typography>
            <Typography
              variant="body2"
              color="#6b7280"
              fontSize={{ xs: 12, sm: 14 }}
            >
              {flightNumber}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: { md: 5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Box sx={{ textAlign: { xs: "left", sm: "center" }, flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  justifyContent: { xs: "flex-start", sm: "center" },
                }}
              >
                <FlightTakeoffIcon
                  sx={{ fontSize: { xs: 16, sm: 18 }, color: "#6366f1" }}
                />
                <Typography
                  fontWeight={700}
                  fontSize={{ xs: 18, sm: 20 }}
                  color="#1f2937"
                >
                  {departureTime}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="#6b7280"
                fontSize={{ xs: 11, sm: 12 }}
              >
                {origin}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                flex: { xs: 1.5, sm: 2 },
                px: { xs: 1, sm: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <Box sx={{ height: "1px", flex: 1, bgcolor: "#d1d5db" }} />
                <ArrowForwardIcon
                  sx={{ fontSize: { xs: 14, sm: 16 }, color: "#9ca3af" }}
                />
                <Box sx={{ height: "1px", flex: 1, bgcolor: "#d1d5db" }} />
              </Box>
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={{ xs: 11, sm: 13 }}
                color="#6b7280"
              >
                {duration}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: 10, sm: 11 },
                  color: stops === "Direct" ? "#10b981" : "#f59e0b",
                  fontWeight: 600,
                }}
              >
                {stops}
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: "right", sm: "center" }, flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  justifyContent: { xs: "flex-end", sm: "center" },
                }}
              >
                <FlightLandIcon
                  sx={{ fontSize: { xs: 16, sm: 18 }, color: "#ec4899" }}
                />
                <Typography
                  fontWeight={700}
                  fontSize={{ xs: 18, sm: 20 }}
                  color="#1f2937"
                >
                  {arrivalTime}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="#6b7280"
                fontSize={{ xs: 11, sm: 12 }}
              >
                {destination}
              </Typography>
            </Box>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: { md: 2 }, display: { xs: "none", md: "block" } }}
          />
          <Divider sx={{ my: 1, display: { xs: "block", md: "none" } }} />

          {/* Price & Button */}
          <Box
            sx={{
              flex: { md: 2 },
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: { xs: "center", md: "flex-end" },
              justifyContent: { xs: "space-between", md: "center" },
              gap: { xs: 2, md: 1 },
            }}
          >
            <Typography
              fontWeight={700}
              fontSize={{ xs: 22, sm: 24 }}
              color="#6366f1"
            >
              {price}
            </Typography>

            <Button
              variant="outlined"
              className="select-btn"
              onClick={() => open("selectFlight", true)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.25 },
                fontWeight: 600,
                fontSize: { xs: 14, sm: 15 },
                borderColor: "#6366f1",
                color: "#6366f1",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#6366f1",
                },
              }}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
}
