import type { Metadata } from "next";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import SiteContentPage from "@/components/site-content-page";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Customer Care",
  description: "Reach the YeloTrip travel desk for journey planning, active-trip questions and service concerns.",
};

export default function CustomerCarePage() {
  return (
    <SiteContentPage
      eyebrow="A person is here to help"
      title="Your YeloTrip travel desk."
      intro="Tell us what you need help with and the team will route your enquiry to a travel specialist. For urgent active-trip questions, call the published helpline."
      sections={[
        {
          title: "Talk to the travel desk",
          paragraphs: [
            "Phone / WhatsApp: +91 96673 34803",
            "Email: customer.care@yelotrip.com",
            "Based in Vadodara, Gujarat, India.",
          ],
        },
        {
          title: "Planning a new journey?",
          paragraphs: [
            "Share a few details through the accessible trip form. A specialist will review your preferences and contact you; no booking is made automatically.",
          ],
          bullets: [
            "Personal and family holiday planning",
            "Flight, hotel, visa and cruise assistance",
            "Corporate travel and MICE enquiries",
          ],
        },
        {
          title: "Need to raise a concern?",
          paragraphs: [
            "Review our statutory customer grievance redressal process and DPDP Act 2023 escalation protocol (Designated Officer: Jigneshkumar S Mistry, Vadodara, Gujarat). Formal acknowledgement within 24–48 hours.",
          ],
        },
      ]}
    >
      <div className="care-actions">
        <a className="button-primary" href="tel:+919667334803">
          <Phone size={16} aria-hidden="true" /> Call +91 96673 34803
        </a>
        <a className="button-outline" href="mailto:customer.care@yelotrip.com">
          <Mail size={16} aria-hidden="true" /> Email Customer Care
        </a>
        <Link className="button-outline" href="/grievance">
          Grievance policy <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <span className="care-location">
          <MapPin size={16} aria-hidden="true" /> Vadodara, Gujarat, India
        </span>
      </div>
      <SocialLinks />
    </SiteContentPage>
  );
}
