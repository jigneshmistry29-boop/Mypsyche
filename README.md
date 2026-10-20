# YeloTrip

YeloTrip is a human-led travel planning and facilitation consultancy. This Next.js app includes the marketing site, trip/corporate/callback enquiry flows, provider-selectable AI planning, live city weather lookup, consent-gated analytics, locale dictionaries and an installable PWA shell.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Server configuration

Copy `.env.example` to `.env.local` and configure the integrations you intend to use:

`AI_PROVIDER` selects `gemini`/`google`, `openai` or `copilot`/`azure`; `AI_MODEL` selects the provider model/deployment. The Copilot alias uses an Azure OpenAI deployment and is not a direct consumer Microsoft Copilot integration. Provider credentials are server-only.

The AI planner returns a clear unavailable response until the selected provider is configured. Enquiry delivery uses Resend when configured; otherwise FormSubmit is used unless `FORMSUBMIT_ENABLED=false`. FormSubmit sends personal enquiry data through a third party and requires recipient activation on first use, so review its privacy terms and complete that verification before launch. GA4 and Clarity remain disabled until the visitor consents. Instagram embeds require approved post URLs and a separate user action to load the third-party content.

Weather lookups use Open-Meteo’s public geocoding and forecast APIs. No weather values are fabricated when that service cannot be reached.

The locale selector currently translates shared navigation and the homepage hero into English, Hindi and Gujarati. The locale registry also includes the planned Indian language codes; untranslated routes fall back to English. Urdu, Sindhi and Kashmiri locale codes set RTL direction when selected.

## Routes

- `/` - service-first homepage and live weather search
- `/plan-my-trip` - accessible multi-step holiday enquiry
- `/corporate` - corporate and MICE enquiry
- `/ai-planner` - AI-assisted destination and itinerary exploration
- `/services`, `/about`, `/resources`, `/blog` - service and editorial information
- `/customer-care`, `/contact` - support contacts and callback enquiry
- `/privacy`, `/grievance`, `/terms`, `/refund-policy`, `/disclaimer`, `/cookies` - policy drafts
- `/offline` - cached offline fallback

## Before launch

- Complete the named Grievance Officer and full postal-address disclosure in the grievance policy.
- Have qualified counsel review the privacy, terms and cancellation drafts against the operating business and applicable law.
- Confirm the legal entity name, advisory fees, retention schedule and production privacy/vendor practices.
- Configure and test Resend and Gemini credentials; verify the sender domain and deliverability.
- Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin and verify the service worker on HTTPS.
- Add approved translations, social content, branded photography and any analytics only after consent/privacy requirements are confirmed.
- Configure the correct official social profile URLs and approved Instagram post URLs in `.env.local`.
- Configure and test the supported Cloudflare deployment adapter before claiming Cloudflare Pages/Workers compatibility.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
