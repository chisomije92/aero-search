"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { cn } from "@/src/lib/utils";
import { ModalProvider } from "@/src/providers/ModalProvider";
import ModalLayout from "./ModalLayout";
import { DrawerProvider } from "@/src/providers/DrawerProvider";
import DrawerLayout from "./DrawerLayout";
import Footer from "@/src/common/extras/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ModalProvider>
        <DrawerProvider>
          <ModalLayout>
            <DrawerLayout>
              <>
                <div className={cn("min-h-screen ", className)}>{children}</div>
              </>
              <Footer />
            </DrawerLayout>
          </ModalLayout>
        </DrawerProvider>
      </ModalProvider>
    </LocalizationProvider>
  );
};

export default MainLayout;
