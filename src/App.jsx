import React, { useState } from "react";

/* =========
   TOKENS
========= */
const TOKENS = {
  dark: "#10241B",
  accent: "#82BF98",
  soft: "#C8E3D2",
  warm: "#F4F0E9",
  ink: "#0F172A",
};

/* =========
   ICONS (simple SVG components)
========= */
const Icons = {
  mic: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  layers: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  check: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  clipboard: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  fileText: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  clock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  alertTriangle: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

/* =========
   PAGE
========= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-24" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      {/* FLOATING CTA */}
      <FloatingCTA />
      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur"
        style={{
          background: "rgba(244,240,233,0.88)",
          borderBottom: "1px solid rgba(16,36,27,0.12)",
        }}
      >
        <div className="mx-auto max-w-6xl h-[72px] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium tracking-tight">ethica</span>
            <span className="text-xs opacity-50">·</span>
            <span className="text-sm opacity-70">VoicePilot</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how">How It Works</a>
            <a href="#workflows">Workflows</a>
            <a href="#compliance">Compliance</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#waitlist">
              <PillButton variant="solid">Join Waitlist</PillButton>
            </a>
            <button
              className="md:hidden h-10 w-10 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(16,36,27,0.18)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-3 text-sm"
            style={{ borderTop: "1px solid rgba(16,36,27,0.12)" }}
          >
            <a href="#how">How It Works</a>
            <a href="#workflows">Workflows</a>
            <a href="#compliance">Compliance</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <h1 className="ethica-h1">
              Real estate work is conversational.
            </h1>
            <h1 className="ethica-h1 mt-2" style={{ opacity: 0.7 }}>
              Your transaction system should be too.
            </h1>

            <p className="ethica-body mt-6">
              VoicePilot turns real conversations into structured, compliant transaction progress — without forcing agents to stop and do admin work.
            </p>

            <div className="mt-8">
              <a href="#waitlist">
                <PillButton variant="solid">Join the Waitlist →</PillButton>
              </a>
            </div>

            <p className="mt-4 text-xs opacity-60">Rolling out in phases. California‑first.</p>
          </div>

          <div className="md:col-span-7 flex justify-center">
            <PhoneMock />
          </div>
        </div>
      </section>

      {/* APP PREVIEW PLACEHOLDER */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Try VoicePilot</p>
          <h2 className="ethica-h2">Experience it yourself</h2>
          <p className="ethica-body mt-4 max-w-2xl mx-auto opacity-80">
            Get a taste of how VoicePilot works — right here in your browser.
          </p>

          <div
            className="mt-10 mx-auto max-w-md rounded-3xl p-8 flex flex-col items-center justify-center"
            style={{
              background: "rgba(200,227,210,0.3)",
              border: "2px dashed rgba(16,36,27,0.2)",
              minHeight: "300px"
            }}
          >
            <p className="text-sm opacity-50">Interactive preview coming soon</p>
            <p className="text-xs opacity-40 mt-2">Mobile app first-run experience</p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        className="py-10"
        style={{
          background: TOKENS.warm,
          borderTop: "1px solid rgba(16,36,27,0.08)",
          borderBottom: "1px solid rgba(16,36,27,0.08)",
        }}
      >
        <p className="ethica-body max-w-4xl mx-auto px-6 text-center opacity-80">
          Built by a team with deep transaction and compliance experience. Designed in close collaboration with California real estate professionals.
        </p>
      </section>

      {/* HOW IT WORKS - Icon Grid Style */}
      <section id="how" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-4">How It Works</p>
          <h2 className="ethica-h2">From conversation to transaction</h2>
          <p className="ethica-body mt-4 max-w-3xl opacity-80">
            VoicePilot captures intent as you speak, structures it into the transaction, and keeps you oriented around what's confirmed, what's missing, and what's next.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-10">
            <IconFeature icon={Icons.mic} title="Speak naturally">
              Talk through deals, changes, and questions the same way you already do.
            </IconFeature>
            <IconFeature icon={Icons.layers} title="VoicePilot structures it">
              Key details are extracted into timelines, tasks, and forms‑aligned fields.
            </IconFeature>
            <IconFeature icon={Icons.check} title="You confirm and move forward">
              Nothing happens silently. Assumptions are labeled. You stay in control.
            </IconFeature>
          </div>
        </div>
      </section>

      {/* WORKFLOWS - Icon Grid Style */}
      <section id="workflows" className="py-20" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Workflows</p>
          <h2 className="ethica-h2">Designed for real transaction workflows</h2>

          <div className="mt-12 grid md:grid-cols-4 gap-8">
            <IconFeature icon={Icons.clipboard} title="Transaction intake">
              Capture parties, property, and terms. Generate a first‑pass timeline. Identify missing items.
            </IconFeature>
            <IconFeature icon={Icons.fileText} title="Disclosure assistance">
              Surface required disclosures. Track completion and signatures. Reduce rework.
            </IconFeature>
            <IconFeature icon={Icons.clock} title="Ongoing execution">
              Monitor deadlines. Draft updates and messages. Maintain a single source of truth.
            </IconFeature>
            <IconFeature icon={Icons.alertTriangle} title="Exception handling">
              Flag inconsistencies. Surface risk early. Guide resolution steps.
            </IconFeature>
          </div>
        </div>
      </section>

      {/* COMPLIANCE - Mint Green Section */}
      <section id="compliance" className="py-20" style={{ background: TOKENS.soft }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Trust & Compliance</p>
          <h2 className="ethica-h2">Built for oversight and compliance</h2>

          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="ethica-h4 flex items-center gap-3">
                <span style={{ color: TOKENS.accent }}>✓</span>
                What VoicePilot does
              </h3>
              <ul className="mt-4 space-y-3 ethica-body">
                <li>• Supports operational execution</li>
                <li>• Tracks structured transaction state</li>
                <li>• Drafts artifacts for human review</li>
                <li>• Surfaces uncertainty and risk</li>
              </ul>
            </div>
            <div>
              <h3 className="ethica-h4 flex items-center gap-3">
                <span style={{ opacity: 0.4 }}>✕</span>
                What VoicePilot does not do
              </h3>
              <ul className="mt-4 space-y-3 ethica-body opacity-80">
                <li>• Provide legal advice</li>
                <li>• File or send documents autonomously</li>
                <li>• Bypass broker oversight</li>
                <li>• Make unlabeled assumptions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" className="py-20" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">Join the waitlist</h2>
          <p className="ethica-body mt-4 max-w-2xl" style={{ opacity: 0.8 }}>
            VoicePilot is rolling out in phases. Join the waitlist to be notified when access opens in your area.
          </p>

          <div className="mt-8">
            <PillInputCTA />
          </div>
        </div>
      </section>

      {/* FOOTER - Ethica Style */}
      <footer className="py-16" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Links */}
            <div className="md:col-span-6 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium opacity-60 mb-4">Product</h4>
                <nav className="flex flex-col gap-3 text-sm">
                  <a href="#how" className="hover:opacity-70">How It Works</a>
                  <a href="#workflows" className="hover:opacity-70">Workflows</a>
                  <a href="#compliance" className="hover:opacity-70">Compliance</a>
                </nav>
              </div>
              <div>
                <h4 className="text-sm font-medium opacity-60 mb-4">Company</h4>
                <nav className="flex flex-col gap-3 text-sm">
                  <a href="https://heyethica.com/about" className="hover:opacity-70">About</a>
                  <a href="#" className="hover:opacity-70">Press</a>
                  <a href="#" className="hover:opacity-70">Contact</a>
                </nav>
              </div>
            </div>

            {/* Tagline */}
            <div className="md:col-span-6 md:text-right">
              <p className="ethica-h2">
                Transact smarter
                <br />
                <span style={{ color: TOKENS.accent }}>with voice</span>
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderTop: "1px solid rgba(244,240,233,0.12)" }}>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/company/ethica-ai" className="opacity-60 hover:opacity-100" aria-label="LinkedIn">
                {Icons.linkedin}
              </a>
            </div>

            <div
              className="p-4 rounded-lg text-xs max-w-md"
              style={{ background: "rgba(244,240,233,0.08)" }}
            >
              <p className="opacity-70">
                Ethica provides operational support and drafting assistance. It does not provide legal advice. Ethica is committed to the Fair Housing Act and Equal Opportunity Act.
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs opacity-40">
            © 2025 Ethica AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* =========
   COMPONENTS
========= */

function IconFeature({ icon, title, children }) {
  return (
    <div>
      <div className="mb-4" style={{ color: TOKENS.dark }}>
        {icon}
      </div>
      <h3 className="ethica-h4">{title}</h3>
      <p className="ethica-body mt-2 opacity-80">{children}</p>
    </div>
  );
}

function PillButton({ children, variant = "outline" }) {
  const solid = variant === "solid";
  return (
    <button
      className="h-11 px-6 rounded-full text-sm font-medium transition"
      style={{
        background: solid ? TOKENS.dark : "transparent",
        color: solid ? TOKENS.warm : TOKENS.dark,
        border: solid
          ? "1px solid rgba(16,36,27,0.2)"
          : `1px solid ${TOKENS.accent}`,
        boxShadow: solid
          ? "0 4px 14px rgba(16,36,27,0.15)"
          : "none",
      }}
      type="button"
    >
      {children}
    </button>
  );
}

function PillInputCTA() {
  return (
    <div
      className="flex items-center p-1 rounded-full max-w-xl"
      style={{
        background: "rgba(244,240,233,0.9)",
        border: `1px solid ${TOKENS.accent}`,
        boxShadow: "0 8px 24px rgba(16,36,27,0.12)",
      }}
    >
      <input
        placeholder="Enter your email"
        className="flex-1 h-11 px-4 bg-transparent outline-none text-sm"
        style={{ color: TOKENS.dark }}
      />
      <button
        className="h-11 px-6 rounded-full text-sm font-medium"
        style={{
          background: TOKENS.dark,
          color: TOKENS.warm,
        }}
        type="button"
      >
        Join Waitlist →
      </button>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div
        className="relative rounded-[40px] p-3"
        style={{
          background: TOKENS.dark,
          boxShadow: "0 25px 50px rgba(16,36,27,0.25)",
          width: "280px",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl"
          style={{ background: TOKENS.dark }}
        />

        {/* Screen */}
        <div
          className="rounded-[28px] overflow-hidden"
          style={{ background: TOKENS.warm }}
        >
          {/* Status bar */}
          <div className="h-8 flex items-center justify-between px-6 text-xs" style={{ background: TOKENS.warm }}>
            <span style={{ fontSize: "10px" }}>9:41</span>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: "10px" }}>●●●●</span>
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pb-6" style={{ minHeight: "480px" }}>
            {/* App header */}
            <div className="py-4 text-center">
              <p className="text-xs opacity-50">VoicePilot</p>
              <p className="ethica-h4 mt-1">New Transaction</p>
            </div>

            {/* Chat messages */}
            <div className="space-y-3 mt-4">
              <ChatBubble role="user">
                Create a buyer transaction for 123 Maple Street, San Francisco.
              </ChatBubble>

              <ChatBubble role="assistant">
                Got it. I've captured the property address and set this as a buyer-side transaction. Who are the buyers?
              </ChatBubble>

              <ChatBubble role="user">
                John and Sarah Chen.
              </ChatBubble>

              <ChatBubble role="assistant" highlight>
                I'll set the acceptance date to today. Please confirm this is correct.
              </ChatBubble>
            </div>

            {/* Timeline preview */}
            <div
              className="mt-4 p-3 rounded-xl text-xs"
              style={{ background: "rgba(255,255,255,0.7)" }}
            >
              <p className="font-medium opacity-60 mb-2">Timeline</p>
              <div className="space-y-1">
                <p>✓ Acceptance — Today</p>
                <p style={{ color: TOKENS.accent }}>● Deposit due — Jan 5</p>
                <p className="opacity-50">○ Inspection — Pending</p>
              </div>
            </div>

            {/* Input area */}
            <div
              className="mt-4 flex items-center gap-2 p-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.7)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: TOKENS.accent }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </div>
              <span className="text-xs opacity-40">Tap to speak...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ role, children, highlight }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] px-3 py-2 rounded-2xl text-xs"
        style={{
          background: isUser
            ? TOKENS.dark
            : highlight
              ? TOKENS.soft
              : "rgba(255,255,255,0.8)",
          color: isUser ? TOKENS.warm : TOKENS.dark,
          borderBottomRightRadius: isUser ? "4px" : "16px",
          borderBottomLeftRadius: isUser ? "16px" : "4px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FloatingCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
      style={{
        background: "linear-gradient(to top, rgba(244,240,233,1) 60%, rgba(244,240,233,0))",
      }}
    >
      <div
        className="flex items-center p-1.5 rounded-full w-full max-w-lg"
        style={{
          background: TOKENS.warm,
          border: `1.5px solid ${TOKENS.accent}`,
          boxShadow: "0 8px 32px rgba(16,36,27,0.18), 0 2px 8px rgba(16,36,27,0.08)",
        }}
      >
        <input
          placeholder="Enter your email"
          className="flex-1 h-12 px-5 bg-transparent outline-none text-sm"
          style={{ color: TOKENS.dark }}
        />
        <button
          className="h-12 px-6 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2"
          style={{
            background: TOKENS.dark,
            color: TOKENS.warm,
          }}
          type="button"
        >
          Join Waitlist
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
