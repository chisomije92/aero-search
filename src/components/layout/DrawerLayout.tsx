"use client";

import FiltersDrawer from "@/src/common/drawers/FiltersDrawer";
import SelectFlightDrawer from "@/src/common/drawers/SelectFlightDrawer";
import { useDrawer } from "@/src/hooks/useDrawer";

interface DrawerLayoutProps {
  children: React.ReactNode;
}
const DrawerLayout = ({ children }: DrawerLayoutProps) => {
  const { openState: state } = useDrawer();
  const drawerType = state.drawerType;
  return (
    <>
      {drawerType === "selectFlight" && <SelectFlightDrawer />}
      {drawerType === "filter" && <FiltersDrawer />}
      {children}
    </>
  );
};

export default DrawerLayout;
