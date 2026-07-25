import "./globals.css";
import { Space_Grotesk, Bricolage_Grotesque } from "next/font/google";

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "AI Future Lab · Naman Mittal",
  description:
    "Five interactive 3D AI simulations — smart homes, cybersecurity, traffic, space & quantum computing. A SciNaTiON 6.0 project by Naman Mittal, Happy English School.",
};

export const viewport = {
  themeColor: "#120a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
