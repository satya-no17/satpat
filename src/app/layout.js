import { Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { getUser } from "@/lib/auth";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SatPat Build",
  description: "Created by Satya",
  icons:{
    icon:'/logo.svg'
  }
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
