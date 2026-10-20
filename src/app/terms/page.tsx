import type { Metadata } from "next";
import SiteContentPage from "@/components/site-content-page";

export const metadata: Metadata = {
  title: "Terms & Conditions of Service",
  description: "Terms governing travel planning and facilitation advisory services by YeloTrip, Vadodara, Gujarat.",
};

export default function TermsPage() {
  return (
    <SiteContentPage
      eyebrow="Terms of Service & Advisory"
      title="Clear expectations make for better journeys."
      intro="These Terms & Conditions govern the use of yelotrip.com and the travel planning, facilitation, and advisory services provided by YeloTrip (Proprietor: Jigneshkumar S Mistry, Vadodara, Gujarat, India)."
      sections={[
        {
          title: "1. Planning & Facilitation Advisory Role",
          paragraphs: [
            "YeloTrip operates as a personalised travel planning, advisory, and facilitation desk. This website is not an automated online booking engine or inventory-reseller. Submitting an enquiry, receiving a draft itinerary, or discussing options with a specialist does not constitute a confirmed travel reservation.",
            "All travel arrangements (including flights, hotels, cruises, land transport, and travel insurance) are operated by independent third-party carriers and suppliers. Each supplier enforces its own carriage conditions, cancellation rules, baggage restrictions, and rate schedules. A binding travel contract is formed only once supplier confirmations and tickets are formally issued and acknowledged in writing.",
          ],
        },
        {
          title: "2. Travel Advice, Visas & Entry Requirements",
          paragraphs: [
            "Visa rules, passport validity requirements, consular processing times, vaccination mandates, and government travel advisories are subject to frequent regulatory changes by sovereign authorities. While YeloTrip provides document guidance and checklists to assist with preparation, official government consulates and border control authorities hold sole jurisdiction over visa issuance and entry admissibility.",
            "AI-assisted itinerary ideas generated via our website or planner are provided as creative outlines for inspiration only. They do not constitute guaranteed quotations or live booking commitments and must be reviewed with a specialist against live supplier inventory.",
          ],
        },
        {
          title: "3. Professional Advisory Fees & Supplier Payments",
          paragraphs: [
            "Where an advisory, research, or facilitation fee applies to bespoke itinerary planning, such fee shall be communicated transparently in writing before formal planning work commences.",
            "Supplier deposits, balance deadlines, and fare conditions will be detailed before any financial commitment is made on your behalf.",
          ],
        },
        {
          title: "4. User Obligations & Lawful Conduct",
          paragraphs: [
            "Visitors agree to use the enquiry channels solely for legitimate personal or corporate travel requirements. You agree not to submit fraudulent contact information or solicit unauthorized bookings. Information provided must be accurate to ensure proper travel coordination.",
          ],
        },
        {
          title: "5. Governing Law & Dispute Resolution",
          paragraphs: [
            "These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India.",
            "The courts and consumer dispute forums of Vadodara, Gujarat, India shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with YeloTrip services.",
            "Contact for legal notices: Jigneshkumar S Mistry, YeloTrip Travel Desk, Vadodara, Gujarat - 390001, India | customer.care@yelotrip.com.",
          ],
        },
      ]}
    />
  );
}
