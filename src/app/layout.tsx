import type { Metadata } from "next";
import { Bungee, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display font for the hero's "TRY ME!" hover text
const bungee = Bungee({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const title = "Harihara Srinivas | Software Engineer & Builder";
const description =
  "Computer Science student building AI, blockchain and full-stack products. SEBI TechSprint Jury Award winner with 50+ hackathons. Open to 2028 software engineering roles.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Harihara Srinivas" }],
  keywords: ["Harihara Srinivas", "portfolio", "software engineer", "full stack", "AI", "blockchain", "Next.js"],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Harihara Srinivas",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bungee.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
