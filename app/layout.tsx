import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://westbridgesolution.com"),
  title: {
    default: "Westbridge Solution | Digital Experiences & Growth",
    template: "%s | Westbridge Solution",
  },
  description:
    "Westbridge Solution creates modern websites, distinctive digital experiences, and social media strategies that help ambitious businesses grow.",
  applicationName: "Westbridge Solution",
  keywords: [
    "Westbridge Solution",
    "web development",
    "website design",
    "social media management",
    "UI/UX design",
    "digital marketing",
    "brand identity",
  ],
  openGraph: {
    title: "Westbridge Solution | Digital Experiences & Growth",
    description:
      "Bold websites. Creative strategy. Digital experiences built to move businesses forward.",
    type: "website",
    locale: "en_IN",
    siteName: "Westbridge Solution",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
