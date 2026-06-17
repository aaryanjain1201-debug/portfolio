import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arihant Jain | AI Content Creator • 3D Artist • Motion Designer",
  description:
    "Creating cinematic 3D visuals, AI-powered commercials, motion graphics, and digital experiences that help brands stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
