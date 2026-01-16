import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import MainLayout from "../components/layout/MainLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});
export const metadata: Metadata = {
  title: "J-Flights",
  description: "Track, book and get best deals on flights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${roboto.className} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
