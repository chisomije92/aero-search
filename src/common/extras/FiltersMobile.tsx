import React from "react";

import { Fab, useMediaQuery, useTheme } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import { useDrawer } from "@/src/hooks/useDrawer";
const FiltersMobile = () => {
  const { open: openDrawer } = useDrawer();
  const { getQueryParam } = useQueryParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const origin = getQueryParam("origin");
  const destination = getQueryParam("destination");

  if (!isMobile || (!origin && !destination)) return null;

  return (
    <Fab
      color="primary"
      onClick={() => openDrawer("filter", true)}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
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
  );
};

export default FiltersMobile;
