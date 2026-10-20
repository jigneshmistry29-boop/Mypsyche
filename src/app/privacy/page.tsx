import type { Metadata } from "next";
import SiteContentPage from "@/components/site-content-page";

export const metadata: Metadata = {
  title: "Privacy Policy & DPDP Act 2023 Compliance",
  description: "How YeloTrip collects, uses, and protects personal data under India's Digital Personal Data Protection Act, 2023 (DPDP Act).",
};

export default function PrivacyPage() {
  return (
    <SiteContentPage
      eyebrow="Privacy & Personal Data Protection"
      title="Your trust is the foundation of every journey."
      intro="This Privacy Policy describes how YeloTrip ('Data Fiduciary') collects, uses, stores, and safeguards personal data submitted by visitors and travellers ('Data Principals') through yelotrip.com, pursuant to the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) and the Information Technology Act, 2000."
      sections={[
        {
          title: "1. Data Fiduciary & Officer Identification",
          paragraphs: [
            "The Data Fiduciary responsible for personal data processed through this website is YeloTrip Travel Advisory & Facilitation Desk, operated under the supervision of Proprietor & Data Protection Officer Jigneshkumar S Mistry, Vadodara, Gujarat - 390001, India.",
            "For all queries regarding data protection, consent withdrawal, or exercising your rights under the DPDP Act 2023, you may contact our dedicated desk at customer.care@yelotrip.com or call +91 96673 34803.",
          ],
        },
        {
          title: "2. Personal Data We Collect & Lawful Purpose",
          paragraphs: [
            "When you submit a trip enquiry, quick proposal, corporate consultation, or callback request, we collect contact details (full name, telephone/WhatsApp number, email address), destination ideas, travel dates, traveller demographics (adults, children, senior travellers), and accessibility/dietary requirements.",
            "Lawful Basis: We process this data exclusively on the basis of your explicit consent (under Section 6 of the DPDP Act 2023) to formulate tailored travel proposals, compare supplier arrangements, coordinate travel facilitation, and answer your queries. We do NOT sell, rent, or trade personal data to third parties.",
            "Sensitive Records: We do not ask for or collect sensitive financial credentials (credit card CVVs, net banking passwords) or biometric information on this website. Where passport or visa documentation is subsequently required for confirmed travel, it is handled via verified secure channels.",
          ],
        },
        {
          title: "3. Digital Attribution & Browser Storage",
          paragraphs: [
            "When you visit from social channels (Instagram, Facebook, LinkedIn, X, YouTube, Pinterest, WhatsApp) or search engines, we capture basic marketing attribution (such as utm_source and referrer) to customize your welcome greeting and measure communication effectiveness.",
            "Accessibility preferences (colour mode, senior citizen comfort mode, font scaling, and reduced motion) are stored locally within your browser's localStorage and are never transmitted to our backend or third-party ad networks.",
            "Optional analytics scripts (Google Analytics 4 / Microsoft Clarity) remain strictly inert until you explicitly provide optional consent through our consent manager.",
          ],
        },
        {
          title: "4. Statutory Rights of Data Principals (DPDP Act 2023)",
          paragraphs: [
            "Under the Digital Personal Data Protection Act, 2023, Data Principals enjoy explicit statutory rights:",
          ],
          bullets: [
            "Right to Access: You may request a summary of the personal data undergoing processing and the identities of any data processors involved.",
            "Right to Correction & Erasure: You may request the rectification of inaccurate data or the permanent deletion of enquiry data once the travel facilitation has concluded.",
            "Right to Withdraw Consent: You may withdraw your consent for travel communications at any point by emailing customer.care@yelotrip.com with your enquiry reference.",
            "Right of Grievance Redressal: You have the right to readily available grievance redressal through our designated Grievance Officer, Jigneshkumar S Mistry.",
            "Right to Nominate: In the event of death or incapacity, you may nominate an individual to exercise your rights under the DPDP Act 2023.",
          ],
        },
        {
          title: "5. Data Retention & Security Safeguards",
          paragraphs: [
            "Enquiry records are retained only for the duration required to fulfil the specific travel planning facilitation and to meet statutory tax, consumer protection, or accounting obligations under Indian law, after which records are securely purged or irreversibly anonymised.",
            "All form transmissions are encrypted using Transport Layer Security (TLS 1.3/HTTPS). Backend notifications are authenticated, and access to customer data is strictly restricted to authorized travel specialists in Vadodara, Gujarat.",
          ],
        },
        {
          title: "6. Grievance Redressal Officer Contact",
          paragraphs: [
            "Data Protection & Grievance Officer: Jigneshkumar S Mistry",
            "Postal Address: YeloTrip Travel Desk, Vadodara, Gujarat - 390001, India",
            "Email: customer.care@yelotrip.com | Helpline: +91 96673 34803",
          ],
        },
      ]}
    />
  );
}
