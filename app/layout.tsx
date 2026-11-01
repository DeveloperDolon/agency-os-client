import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/home/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgencyOS AI — The operating system for a one-person agency",
  description:
    "AgencyOS AI is a policy-governed operating system for solo agencies. Software owns the business rules, AI prepares and recommends, and you decide. Unified inbox, follow-ups, daily briefing, and a full audit trail of every agent run.",
  keywords: [
    "AgencyOS",
    "AI for agencies",
    "solo agency",
    "freelancer OS",
    "agent governance",
    "Upwork automation",
    "Fiverr workflow",
    "AI assistant",
  ],
  authors: [{ name: "AgencyOS AI" }],
  openGraph: {
    title: "AgencyOS AI — The operating system for a one-person agency",
    description:
      "Software owns the business rules. AI prepares and recommends. You decide.",
    siteName: "AgencyOS AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgencyOS AI",
    description:
      "Software owns the business rules. AI prepares and recommends. You decide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
