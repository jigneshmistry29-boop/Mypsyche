import type { Metadata } from "next";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import SiteContentPage from "@/components/site-content-page";

export const metadata: Metadata = {
  title: "Customer Grievance Redressal & DPDP Escalation",
  description: "Statutory customer grievance redressal mechanism and DPDP Act 2023 escalation protocol for YeloTrip in Vadodara, Gujarat.",
};

export default function GrievancePage() {
  return (
    <SiteContentPage
      eyebrow="Statutory Grievance Redressal"
      title="We listen, understand, and resolve."
      intro="YeloTrip is dedicated to transparent, human-first travel facilitation. If you experience an issue with an enquiry, service communication, or data handling, please refer to our multi-tiered grievance redressal mechanism below."
    >
      <div className="editorial-section">
        <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "8px", margin: "1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--lagoon)", marginBottom: "0.5rem" }}>
            <ShieldCheck size={20} aria-hidden="true" />
            <span style={{ fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              DPDP Act 2023 & Consumer Protection Statutory Disclosure
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>
            In compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, and the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>, the details of the designated Grievance Redressal Officer & Data Protection Officer are published below.
          </p>
        </div>
      </div>

      <div className="about-principles" style={{ margin: "2rem 0" }}>
        <article>
          <span><Phone size={21} aria-hidden="true" /></span>
          <h2 className="font-display">Level 1: Travel Desk</h2>
          <p>
            Connect directly with our customer care desk at <strong>customer.care@yelotrip.com</strong> or <strong>+91 96673 34803</strong>. Share your reference number (e.g., #YT-XXXX-XXXX) and our team will work to resolve your concern immediately.
          </p>
        </article>

        <article>
          <span><ShieldCheck size={21} aria-hidden="true" /></span>
          <h2 className="font-display">Level 2: Grievance Officer</h2>
          <p>
            If unresolved after Level 1, your concern is escalated to <strong>Jigneshkumar S Mistry</strong>, designated Grievance & Data Protection Officer, Vadodara, Gujarat. Written response within 24–48 hours.
          </p>
        </article>

        <article>
          <span><MapPin size={21} aria-hidden="true" /></span>
          <h2 className="font-display">Level 3: DPDP Board</h2>
          <p>
            If dissatisfied after 30 days of filing under the DPDP Act 2023, Data Principals possess the statutory right to appeal to the <strong>Data Protection Board of India</strong>.
          </p>
        </article>
      </div>

      <section className="editorial-section">
        <h2 className="font-display">Designated Grievance & Data Protection Officer</h2>
        <div style={{ background: "color-mix(in srgb, var(--sunrise-gold) 12%, var(--paper))", border: "1px solid color-mix(in srgb, var(--sunrise-gold) 35%, var(--line))", borderRadius: "8px", padding: "1.5rem", marginTop: "1rem" }}>
          <p style={{ margin: "0 0 0.5rem" }}><strong>Name:</strong> Jigneshkumar S Mistry</p>
          <p style={{ margin: "0 0 0.5rem" }}><strong>Designation:</strong> Grievance Redressal Officer & Data Protection Officer</p>
          <p style={{ margin: "0 0 0.5rem" }}><strong>Entity:</strong> YeloTrip Travel Advisory & Facilitation Desk</p>
          <p style={{ margin: "0 0 0.5rem" }}><strong>Jurisdiction / Postal Address:</strong> Vadodara, Gujarat - 390001, India</p>
          <p style={{ margin: "0 0 0.5rem" }}><strong>Dedicated Email:</strong> <a href="mailto:customer.care@yelotrip.com?subject=[Grievance%20Redressal]%20Escalation">customer.care@yelotrip.com</a> (Prefix subject: <em>[Grievance Redressal]</em>)</p>
          <p style={{ margin: 0 }}><strong>Phone / Desk Line:</strong> <a href="tel:+919667334803">+91 96673 34803</a> (Mon–Sat, 09:30 AM – 06:30 PM IST)</p>
        </div>
      </section>

      <section className="editorial-section">
        <h2 className="font-display">Acknowledgement & Redressal Timelines</h2>
        <ul style={{ paddingLeft: "1.25rem", margin: "0.8rem 0" }}>
          <li style={{ marginBottom: "0.5rem" }}><strong>Acknowledgement:</strong> YeloTrip provides formal written acknowledgement of the grievance with a unique tracking ticket within 24 to 48 hours of receipt.</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Investigation:</strong> Our specialist reviews all communications, recorded preferences, and supplier correspondence relevant to the dispute.</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Resolution:</strong> The grievance shall be resolved within a maximum period of 30 days from the date of its receipt, in accordance with applicable statutory standards.</li>
        </ul>
      </section>

      <section className="editorial-section">
        <h2 className="font-display">Information to Include in Your Notice</h2>
        <p>To help us expedite resolution, please include:</p>
        <ul style={{ paddingLeft: "1.25rem" }}>
          <li>Your full name and primary contact telephone number.</li>
          <li>Your YeloTrip proposal/enquiry reference code (e.g., #YT-XXXX-XXXX).</li>
          <li>A concise description of the concern and the specific resolution or remedy requested.</li>
          <li>Copies of relevant email threads or notes (please do NOT attach sensitive payment credentials or original passport documents).</li>
        </ul>
      </section>
    </SiteContentPage>
  );
}
