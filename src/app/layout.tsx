import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARYAN SHARMA — Full-Stack Developer & Creative Technologist",
  description:
    "A scroll-driven cinematic 3D portfolio powered by Next.js 15, Three.js, GSAP, and Lenis.",
  authors: [{ name: "Aryan Sharma" }],
  openGraph: {
    title: "ARYAN SHARMA — Full-Stack Developer & Creative Technologist",
    description: "Cinematic real-time 3D portfolio powered by Three.js and GSAP.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${inter.variable} bg-[#0A0A0B] text-[#E8E2D6]`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0B] text-[#E8E2D6] antialiased selection:bg-[#C1440E] selection:text-[#E8E2D6]"
      >
        {children}
      </body>
    </html>
  );
}
