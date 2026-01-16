import { Box, Drawer, IconButton, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDrawer } from "@/src/hooks/useDrawer";
import Filters from "../extras/Filters";

const airlines = ["Delta", "United", "American", "Southwest", "JetBlue"];

const FiltersDrawer = () => {
  const { openState, close } = useDrawer();
  return (
    <Drawer
      anchor="bottom"
      open={openState.isOpen}
      onClose={() => close()}
      sx={{ display: { xs: "block", lg: "none" } }}
    >
      <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Filters
          </Typography>
          <IconButton onClick={() => close()}>
            <ExpandLessIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          <Filters airlines={airlines} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default FiltersDrawer;
