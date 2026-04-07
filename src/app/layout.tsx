import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BringingTruth",
    template: "%s · BringingTruth",
  },
  description:
    "BringingTruth — Christian ministry and NGO. Mission, updates, and ways to connect.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BringingTruth",
    title: "BringingTruth",
    description:
      "Christian ministry and NGO — mission, field updates, and ways to connect.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BringingTruth",
    description:
      "Christian ministry and NGO — mission, field updates, and ways to connect.",
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
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col">{children}</body>
    </html>
  );
}
