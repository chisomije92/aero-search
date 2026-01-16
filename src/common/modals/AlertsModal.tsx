import { useAlertsModal } from "@/src/hooks/useAlertsModal";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const AlertsModal = () => {
  const {
    alertEmail,
    targetPrice,
    priceAlerts,
    weeklySummary,
    modalData,
    close,
    open,
    setAlertEmail,
    setTargetPrice,
    setWeeklySummary,
    setPriceAlerts,
  } = useAlertsModal();
  const { origin, destination } = modalData;
  return (
    <>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 20 }}>
        Set Price Alerts
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Get notified when prices drop for flights from{" "}
            {origin?.code || "your origin"} to{" "}
            {destination?.code || "your destination"}.
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={alertEmail}
            onChange={(e) => setAlertEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Target Price"
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="e.g., 500"
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1, color: "text.secondary" }}>$</Box>
                ),
              },
            }}
            sx={{ mb: 3 }}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={priceAlerts}
                  onChange={(e) => setPriceAlerts(e.target.checked)}
                  sx={{ "&.Mui-checked": { color: "#6366f1" } }}
                />
              }
              label="Notify me when prices drop"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  sx={{ "&.Mui-checked": { color: "#6366f1" } }}
                />
              }
              label="Send weekly price summaries"
            />
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={() => close()} sx={{ color: "#6b7280" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => close()}
          sx={{
            background:
              "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #db2777 100%)",
            },
          }}
        >
          Set Alert
        </Button>
      </DialogActions>
    </>
  );
};

export default AlertsModal;
