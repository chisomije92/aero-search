import {
  Box,
  Typography,
  Button,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDrawer } from "@/src/hooks/useDrawer";
import { INormalizedFlightOffer } from "@/src/types/offers";

const SelectFlightDrawer = () => {
  const { close, openState } = useDrawer();
  const drawerData = openState.data as INormalizedFlightOffer;

  if (!drawerData) {
    return null;
  }

  const { outbound, return: returnFlight, currency, price, isRoundTrip } =
    drawerData;

  return (
    <Drawer anchor="right" open={openState.isOpen} onClose={() => close()}>
      <Box sx={{ width: { xs: "100vw", sm: 400 }, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Flight Details
          </Typography>
          <IconButton onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Outbound Flight */}
        <Box sx={{ mb: 3, p: 2, bgcolor: "#f9fafb", borderRadius: 2 }}>
          <Typography fontWeight={700} fontSize={18} color="#1f2937" mb={1}>
            {outbound.airline}
          </Typography>
          <Typography variant="body2" color="#6b7280">
            Flight {outbound.flightNumber}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FlightTakeoffIcon sx={{ color: "#6366f1" }} />
            <Box>
              <Typography fontWeight={600}>Departure</Typography>
              <Typography variant="h6" fontWeight={700}>
                {outbound.departureTime}
              </Typography>
              <Typography variant="body2" color="#6b7280">
                {outbound.origin}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ pl: 2.5, py: 1, borderLeft: "2px dashed #d1d5db" }}>
            <Typography variant="body2" color="#6b7280">
              Duration: {outbound.duration}
            </Typography>
            <Typography
              variant="body2"
              color={outbound.stops === "Direct" ? "#10b981" : "#f59e0b"}
              fontWeight={600}
            >
              {outbound.stops}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <FlightLandIcon sx={{ color: "#ec4899" }} />
            <Box>
              <Typography fontWeight={600}>Arrival</Typography>
              <Typography variant="h6" fontWeight={700}>
                {outbound.arrivalTime}
              </Typography>
              <Typography variant="body2" color="#6b7280">
                {outbound.destination}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Return Flight (if round trip) */}
        {isRoundTrip && returnFlight && (
          <>
            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3, p: 2, bgcolor: "#f9fafb", borderRadius: 2 }}>
              <Typography fontWeight={700} fontSize={18} color="#1f2937" mb={1}>
                {returnFlight.airline}
              </Typography>
              <Typography variant="body2" color="#6b7280">
                Flight {returnFlight.flightNumber}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <FlightTakeoffIcon sx={{ color: "#6366f1" }} />
                <Box>
                  <Typography fontWeight={600}>Departure</Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {returnFlight.departureTime}
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    {returnFlight.origin}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ pl: 2.5, py: 1, borderLeft: "2px dashed #d1d5db" }}>
                <Typography variant="body2" color="#6b7280">
                  Duration: {returnFlight.duration}
                </Typography>
                <Typography
                  variant="body2"
                  color={
                    returnFlight.stops === "Direct" ? "#10b981" : "#f59e0b"
                  }
                  fontWeight={600}
                >
                  {returnFlight.stops}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <FlightLandIcon sx={{ color: "#ec4899" }} />
                <Box>
                  <Typography fontWeight={600}>Arrival</Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {returnFlight.arrivalTime}
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    {returnFlight.destination}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Price Summary */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700} fontSize={18}>
              Total Price
            </Typography>
            <Typography fontWeight={700} fontSize={18} color="#6366f1">
              {currency} {price}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={{
            background:
              "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: 16,
            fontWeight: 600,
            "&:hover": {
              background:
                "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
            },
          }}
        >
          Confirm Booking
        </Button>
      </Box>
    </Drawer>
  );
};

export default SelectFlightDrawer;
