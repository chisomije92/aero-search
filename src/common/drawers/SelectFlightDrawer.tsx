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

const SelectFlightDrawer = () => {
  const { close, open, openState } = useDrawer();
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

        <Box sx={{ mb: 3, p: 2, bgcolor: "#f9fafb", borderRadius: 2 }}>
          <Typography fontWeight={700} fontSize={18} color="#1f2937" mb={1}>
            Lufthansa
          </Typography>
          <Typography variant="body2" color="#6b7280">
            Flight LH408
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <FlightTakeoffIcon sx={{ color: "#6366f1" }} />
            <Box>
              <Typography fontWeight={600}>Departure</Typography>
              <Typography variant="h6" fontWeight={700}>
                08:40
              </Typography>
              <Typography variant="body2" color="#6b7280">
                JFK
              </Typography>
            </Box>
          </Box>

          <Box sx={{ pl: 2.5, py: 1, borderLeft: "2px dashed #d1d5db" }}>
            <Typography variant="body2" color="#6b7280">
              Duration: 7h 15m
            </Typography>
            <Typography
              variant="body2"
              //   color={stops === "Direct" ? "#10b981" : "#f59e0b"}
              fontWeight={600}
            >
              {/* {stops} */}1 Stop
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <FlightLandIcon sx={{ color: "#ec4899" }} />
            <Box>
              <Typography fontWeight={600}>Arrival</Typography>
              <Typography variant="h6" fontWeight={700}>
                15:55
              </Typography>
              <Typography variant="body2" color="#6b7280">
                LHR
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="#6b7280">Base Fare</Typography>
            <Typography fontWeight={600}>$548</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="#6b7280">Taxes & Fees</Typography>
            <Typography fontWeight={600}>$52</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700} fontSize={18}>
              Total
            </Typography>
            <Typography fontWeight={700} fontSize={18} color="#6366f1">
              $548
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
