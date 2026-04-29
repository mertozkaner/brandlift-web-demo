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

export const metadata: Metadata = {
  metadataBase: new URL("https://brandlift-web-demo.vercel.app"),

  title: {
    default: "BrandLift",
    template: "%s | BrandLift",
  },

  description: "BrandLift by Group DP",

  applicationName: "BrandLift",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "BrandLift",
    description: "We don’t follow culture. We move it.",
    url: "https://brandlift-web-demo.vercel.app",
    siteName: "BrandLift",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/brandlift-og.jpg",
        width: 1200,
        height: 630,
        alt: "BrandLift by Group DP",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BrandLift",
    description: "We don’t follow culture. We move it.",
    images: ["/brandlift-og.jpg"],
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