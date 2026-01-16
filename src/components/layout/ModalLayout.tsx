"use client";

import AlertsModal from "@/src/common/modals/AlertsModal";
import { useModal } from "@/src/hooks/useModal";
import { Dialog } from "@mui/material";

interface ModalLayoutProps {
  children: React.ReactNode;
}
const ModalLayout = ({ children }: ModalLayoutProps) => {
  const { close, state } = useModal();
  const modalType = state.modalType;
  return (
    <>
      <Dialog open={state.isOpen} onClose={() => close()}>
        {modalType === "setAlert" && <AlertsModal />}
      </Dialog>
      {children}
    </>
  );
};

export default ModalLayout;
