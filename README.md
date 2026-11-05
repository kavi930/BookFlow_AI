# BookFlow_AI — SaaS Marketing Website

A clean, premium, responsive SaaS marketing website and interactive product demonstration for **BookFlow_AI**, an intelligent appointment scheduling and customer workflow platform for clinics, diagnostic centres, restaurants, gyms, salons, and appointment-based businesses.

---

## 1. Project Overview & Architecture

The website is crafted with a clean, understated aesthetic inspired by leading clinical and operational SaaS platforms:
- **Canvas & Palette**: Predominantly white (`#FFFFFF`) and warm off-white (`#FAF8F5`) backgrounds, deep charcoal typography (`#1A1D1C`), and restrained forest-green (`#1E3A2F`) accents.
- **Typography**: Plus Jakarta Sans for refined display and body text, paired with JetBrains Mono for tabular metrics and timestamps.
- **Design Constitution**: Complies with anti-slop rules—zero fake stat pills, single-level elevations, accessible focus rings, and full `prefers-reduced-motion` compliance.

### Page Sections:
1. **Header (`MarketingNavbar.tsx`)**: Slim, sticky navigation with BookFlow_AI wordmark, links to Product, Solutions, How It Works, Contact, and a primary "Book a Demo" CTA. Includes an accessible slide-down mobile menu.
2. **Hero Section (`HeroSection.tsx`)**: 
   - Headline: *"Less time managing. More time growing."*
   - Supporting text: *"Automate bookings, customer conversations, reminders, and everyday business workflows—all in one connected experience."*
   - Primary CTA: "Book a Demo" (scrolls to the form)
   - Secondary CTA: "Explore the Platform" (scrolls to capabilities)
   - Realistic desktop appointment calendar dashboard with a floating mobile WhatsApp mockup.
3. **Product Showcase (`ProductShowcaseSection.tsx`)**: Spacious, editorial-style alternating sections for all 5 capabilities:
   - **A. Smart Appointment Booking**: Time-slot picker, conflict protection, and instant client confirmation.
   - **B. WhatsApp Customer Assistant**: Inbound inquiry triage, operating hours checks, policy guardrails, and human front-desk handoff.
   - **C. Calendar and Scheduling**: Two-way Google/Outlook calendar synchronization, provider roster routing, and buffer enforcement.
   - **D. Automated Email & WhatsApp Follow-ups**: 3-stage sequence (instant prep guide, 24h reminder, 2h check-in) and push notification previews.
   - **E. Business Lead & Booking Management**: Kanban pipeline dashboard with lead records, front-desk action drawer, and reclaimed staff hours tracking.
4. **Animated Product Demonstrations (`AnimatedDemonstrationsSection.tsx`)**: 4 lightweight, interactive React/CSS demonstrations:
   - Slot selection & 15-minute lock countdown.
   - 4-step booking lifecycle progression.
   - Interactive WhatsApp prompt simulator with instant replies.
   - Timed pre-visit push notification dispatch.
5. **Video Showcase (`VideoShowcaseSection.tsx`)**: Dedicated "See BookFlow_AI in action" section with player controls, scrubber bar, speed selection (1x / 1.5x), chapter markers, and prototype simulation.
6. **How It Works (`HowItWorksSection.tsx`)**: Clear, human 3-step workflow explaining the customer journey from inquiry to confirmation.
7. **Solutions by Business Type (`SolutionsSection.tsx`)**: Focused, practical use cases for Clinics, Restaurants, Gyms, and Salons with simulated dialogues and enforced guardrails.
8. **Trust & Security (`TrustSecuritySection.tsx`)**: Factual architectural principles: server-side credential isolation, HMAC webhook verification, and data minimization without unsubstantiated certification claims.
9. **Demo Request Form (`DemoRequestSection.tsx`)**: Accessible, validated lead consultation form with explicit demo mode notices.
10. **Footer (`FooterSection.tsx`)**: Brand wordmark, navigation links, contact placeholder (`demo-inquiries@bookflow.example`), and privacy/terms placeholder modals.

---

## 2. File Structure

```
/src
├── App.tsx                                 # Main application wrapper with marketing / sandbox routing
├── main.tsx                                # React 18 DOM mount
├── index.css                               # Tailwind CSS configuration
├── components/
│   ├── marketing/                          # Complete SaaS Marketing Website Components
│   │   ├── MarketingLandingPage.tsx        # Master page assembling all 10 sections
│   │   ├── MarketingNavbar.tsx             # Slim sticky navigation bar
│   │   ├── HeroSection.tsx                 # Hero with desktop dashboard & mobile frame
│   │   ├── ProductShowcaseSection.tsx      # Editorial showcase for capabilities A–E
│   │   ├── AnimatedDemonstrationsSection.tsx # 4 interactive animated demonstrations
│   │   ├── VideoShowcaseSection.tsx        # Video frame with scrubber and chapter markers
│   │   ├── HowItWorksSection.tsx           # 3-step workflow cards
│   │   ├── SolutionsSection.tsx            # Industry solutions (Clinics, Restaurants, Gyms, Salons)
│   │   ├── TrustSecuritySection.tsx        # Engineering and security principles
│   │   ├── DemoRequestSection.tsx          # Accessible form with client validation
│   │   └── FooterSection.tsx               # Footer with privacy & terms modals
│   ├── overview/                           # Interactive Sandbox Overview
│   ├── demos/                              # Multi-Vertical Interactive Booking Simulator
│   ├── assistant/                          # AI Assistant Playground
│   ├── pipeline/                           # Lead CRM Pipeline Sandbox
│   ├── workflows/                          # Automation Workflow Visualizer
│   ├── impact/                             # ROI & Staff Hours Calculator
│   └── common/                             # Shared Modals, Toasts, and UI primitives
├── context/                                # DemoContext for sandbox state
└── types/                                  # TypeScript definitions
```

---

## 3. How to Run the Project

### Development Server:
```bash
npm install
npm run dev
```
The application will launch at `http://localhost:3000`.

### Type Checking & Compilation:
```bash
npm run build
```

---

## 4. Where to Add Real Video Assets

In `src/components/marketing/VideoShowcaseSection.tsx`, the component is engineered with a `videoSrc` prop. 

To embed a real MP4 screen recording or hosted video URL:
1. Place your video file inside `/public/assets/` (e.g. `/assets/bookflow_demo.mp4`) or use a secure HTTPS CDN URL.
2. In `src/components/marketing/MarketingLandingPage.tsx`, pass the `videoSrc` attribute:
   ```tsx
   <VideoShowcaseSection videoSrc="/assets/bookflow_demo.mp4" />
   ```
When `videoSrc` is omitted or empty, the component automatically falls back to the clean, animated HTML/CSS prototype simulation with chapter scrubber controls.

---

## 5. Features Currently Operating in Demo Mode

To protect your live infrastructure, this phase is strictly focused on the frontend and visual product experience:

1. **Demo Request Form**:
   - Validates all fields locally (full name, business name, business type, work email, phone, goals).
   - Operates in client-side preview mode; no network transmission occurs until connected to your server-side API proxy.
2. **WhatsApp Customer Assistant**:
   - Runs client-side conversational simulation with predefined scenario responses.
   - Connecting live WhatsApp messaging requires configuring Meta Cloud API credentials (`WHATSAPP_TOKEN`, `PHONE_NUMBER_ID`) in a secure server-side environment.
3. **Calendar Scheduling**:
   - Uses realistic demonstration schedules and provider rosters.
   - Connecting live Google Calendar or Outlook requires setting up OAuth 2.0 client credentials and webhook subscriptions.
4. **Automated Reminders**:
   - Renders message templates and sequence timing locally.
   - Connecting real SMS/email notifications requires Twilio or SendGrid/SMTP API keys held on the server.
