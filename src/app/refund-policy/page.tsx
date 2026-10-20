import type { Metadata } from "next";
import SiteContentPage from "@/components/site-content-page";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Transparent cancellation and refund guidelines for YeloTrip travel facilitation, Vadodara, Gujarat.",
};

export default function RefundPolicyPage() {
  return (
    <SiteContentPage
      eyebrow="Cancellations, Changes & Refunds"
      title="Understand the terms before you decide."
      intro="At YeloTrip, we believe total clarity before booking leads to peaceful journeys. As a travel facilitation advisory in Vadodara, Gujarat, we assist you in understanding supplier-specific cancellation conditions and processing change requests with full transparency."
      sections={[
        {
          title: "1. Third-Party Supplier Cancellation Terms",
          paragraphs: [
            "Airlines, hotel chains, boutique properties, cruise operators, and local transport carriers establish their own cancellation, date-change, and refund rules. These vary according to fare type (refundable vs. non-refundable), promotional conditions, and timing relative to departure.",
            "Prior to confirming any travel booking or making payments to suppliers, your YeloTrip specialist will supply the exact supplier terms, cancellation deadlines, and applicable penalty schedules in writing for your explicit consent.",
          ],
        },
        {
          title: "2. YeloTrip Facilitation & Advisory Fees",
          paragraphs: [
            "Where a designated itinerary curation or facilitation fee applies, it reflects professional research, negotiation with suppliers, and bespoke route design. The refundability of any advisory fee is agreed upon in writing prior to commencing formal curation.",
            "In cases where a journey is cancelled due to verifiable supplier service defaults or force majeure circumstances, our travel desk will provide compassionate support to process all eligible refunds on your behalf without gratuitous handling charges.",
          ],
        },
        {
          title: "3. How to Request a Cancellation or Modification",
          paragraphs: [
            "To initiate a change or cancellation, contact our travel desk immediately by email at customer.care@yelotrip.com or telephone +91 96673 34803. Please cite your YeloTrip reference number (e.g. #YT-XXXX-XXXX).",
            "Because airline and hotel cancellation penalties increase as departure dates approach, requests are logged immediately upon receipt during business hours.",
          ],
        },
        {
          title: "4. Processing Timelines & Escalations",
          paragraphs: [
            "Refund amounts approved by airlines, hotels, or cruise operators are credited directly to your original payment mode or bank account in accordance with banking channels, typically within 7 to 14 business days following supplier credit note issuance.",
            "For disputes or delays regarding refund processing, Data Principals and travellers may escalate directly to Grievance Redressal Officer Jigneshkumar S Mistry at customer.care@yelotrip.com (Vadodara, Gujarat).",
          ],
        },
      ]}
    />
  );
}
