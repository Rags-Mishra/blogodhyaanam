import type { Metadata } from "next";
import { Geist, Geist_Mono,Barlow_Condensed,Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700",'800'],
});
const instrument_serif= Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400"
});
export const metadata: Metadata = {
  
  title: "Blogodhyaanam",
  description: "A blog site by Ragini Mishra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${instrument_serif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
