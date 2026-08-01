import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://aisha-siddiqui-portfolio.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aisha A. Siddiqui — Full Stack & AI Developer",
    template: "%s | Aisha A. Siddiqui",
  },
  description:
    "Full Stack Developer & AI Developer from Karachi, Pakistan. I build AI applications, web apps, and software projects with React, Next.js, TypeScript, Python, and the OpenAI SDK.",
  keywords: [
    "Aisha Siddiqui",
    "Full Stack Developer",
    "AI Developer",
    "Frontend Developer",
    "Next.js",
    "TypeScript",
    "React",
    "AI Engineer",
    "Fashion Designer",
    "Portfolio",
  ],
  authors: [{ name: "Aisha A. Siddiqui" }],
  openGraph: {
    title: "Aisha A. Siddiqui — Full Stack & AI Developer",
    description:
      "Full Stack Developer & AI Developer. I build AI applications, web apps, and software projects with React, Next.js, TypeScript, Python, and the OpenAI SDK.",
    type: "website",
    url: SITE_URL,
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
