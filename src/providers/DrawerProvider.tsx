"use client";
import { createContext } from "react";
import { useCallback, useState } from "react";

export type DrawerType = "selectFlight" | "filter" | null;
export interface DrawerState {
  isOpen: boolean;
  data: unknown;
  drawerType: DrawerType;
}

export interface DrawerContextValue {
  open(type: DrawerType, data?: unknown): void;
  close(): void;
  openState: DrawerState;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [openState, setOpenState] = useState<DrawerState>({
    isOpen: false,
    data: null,
    drawerType: null,
  });

  const open = useCallback((type: DrawerType, data?: unknown) => {
    setOpenState({ isOpen: true, data, drawerType: type });
  }, []);

  const close = useCallback(() => {
    setOpenState({ isOpen: false, data: null, drawerType: null });
  }, []);

  return (
    <DrawerContext.Provider value={{ open, close, openState }}>
      {children}
    </DrawerContext.Provider>
  );
}
