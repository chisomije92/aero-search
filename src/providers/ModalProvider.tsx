"use client";
import { createContext } from "react";
import { useCallback, useState } from "react";

export type ModalType = "setAlert" | null;
export interface ModalState {
  isOpen: boolean;
  data: unknown;
  modalType: ModalType;
}

export interface ModalContextValue {
  open(type: ModalType, data?: unknown): void;
  close(): void;
  state: ModalState;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    data: null,
    modalType: null,
  });

  const open = useCallback((type: ModalType, data?: unknown) => {
    setState({ isOpen: true, data, modalType: type });
  }, []);

  const close = useCallback(() => {
    setState({ isOpen: false, data: null, modalType: null });
  }, []);

  return (
    <ModalContext.Provider value={{ open, close, state }}>
      {children}
    </ModalContext.Provider>
  );
}
