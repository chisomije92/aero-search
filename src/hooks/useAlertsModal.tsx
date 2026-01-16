import { useState } from "react";
import { useModal } from "./useModal";

interface IAlertsModal {
  origin?: { label: string; code: string } | null;
  destination: { label: string; code: string } | null;
}

export const useAlertsModal = () => {
  const [alertEmail, setAlertEmail] = useState("");
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [priceAlerts, setPriceAlerts] = useState(true);

  const { open, close, state } = useModal();
  const modalData = state.data as IAlertsModal;

  return {
    alertEmail,
    setAlertEmail,
    weeklySummary,
    setWeeklySummary,
    targetPrice,
    setTargetPrice,
    priceAlerts,
    setPriceAlerts,

    open,
    close,
    modalData,
  };
};
