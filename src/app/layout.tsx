import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Cinzel, Montserrat } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import SocialWelcomeBanner from "@/components/social-welcome-banner";
import FloatingLeadBar from "@/components/floating-lead-bar";
import SocialSideTray from "@/components/social-side-tray";
import { LocaleProvider } from "@/components/locale-provider";
import AnalyticsConsent from "@/components/analytics-consent";
import StructuredData from "@/components/structured-data";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const accessible = Atkinson_Hyperlegible({
  variable: "--font-accessible",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://yelotrip.com"),
  title: {
    default: "YeloTrip | Every journey begins with a dream",
    template: "%s | YeloTrip",
  },
  description:
    "Thoughtful, personalised travel planning from real specialists in Vadodara, Gujarat. Tell us where your heart wants to go.",
  applicationName: "YeloTrip",
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "YeloTrip",
    title: "YeloTrip | Every journey begins with a dream",
    description: "Personalised travel planning, made human.",
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} ${accessible.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider>
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <a className="skip-link" href="/plan-my-trip#plan-form">Skip to trip enquiry</a>
          <a className="skip-link" href="#footer">Skip to footer</a>
          <SocialWelcomeBanner />
          <SiteHeader />
          {children}
          <SiteFooter />
          <FloatingLeadBar />
          <SocialSideTray />
          <StructuredData />
          <AnalyticsConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
