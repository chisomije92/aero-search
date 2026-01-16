import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import MainLayout from "../components/layout/MainLayout";
import QueryProvider from "../providers/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Aero Search",
  description: "Track, book and get best deals on flights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
