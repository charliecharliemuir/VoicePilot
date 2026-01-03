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
   PAGE
========= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur"
        style={{
          background: "rgba(244,240,233,0.88)",
          borderBottom: "1px solid rgba(16,36,27,0.12)",
        }}
      >
        <div className="mx-auto max-w-6xl h-[72px] px-6 flex items-center justify-between">
          <div className="text-sm font-medium">Ethica · VoicePilot</div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how">How It Works</a>
            <a href="#workflows">Workflows</a>
            <a href="#compliance">Compliance</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#invite">
              <PillButton variant="solid">Request an Invite</PillButton>
            </a>
            <button
              className="md:hidden h-10 w-10 rounded-full"
              style={{ border: "1px solid rgba(16,36,27,0.18)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              ≡
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 space-y-3 text-sm"
            style={{ borderTop: "1px solid rgba(16,36,27,0.12)" }}
          >
            <a href="#how">How It Works</a>
            <a href="#workflows">Workflows</a>
            <a href="#compliance">Compliance</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <h1 className="ethica-h1">
              Real estate work is conversational.
              <br />
              <span style={{ opacity: 0.8 }}>Your transaction system should be too.</span>
            </h1>

            <p className="ethica-body mt-6">
              VoicePilot turns real conversations into structured, compliant transaction progress — without forcing agents to stop and do admin work.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#invite">
                <PillButton variant="solid">Join VoicePilot Early Access</PillButton>
              </a>
              <a href="#overview">
                <PillButton>Watch 90‑second overview</PillButton>
              </a>
            </div>

            <p className="mt-4 text-xs opacity-70">Rolling out in phases. California‑first.</p>
          </div>

          <div className="md:col-span-7">
            <ProductMock />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        className="py-10"
        style={{
          background: "rgba(255,255,255,0.35)",
          borderTop: "1px solid rgba(16,36,27,0.12)",
          borderBottom: "1px solid rgba(16,36,27,0.12)",
        }}
      >
        <p className="ethica-body max-w-6xl mx-auto px-6">
          Built by a team with deep transaction and compliance experience. Designed to align with the platforms agents already use, developed in close collaboration with California real estate stakeholders.
        </p>
      </section>

      {/* HOW */}
      <section id="how" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">How VoicePilot works</h2>
          <p className="ethica-body mt-4 max-w-3xl">
            VoicePilot lives inside real work — capturing intent as you speak, structuring it into the transaction, and keeping you oriented around what's confirmed, what's missing, and what's next.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card title="Speak naturally">
              Talk through deals, changes, and questions the same way you already do.
            </Card>
            <Card title="VoicePilot structures the work">
              Key details are extracted into timelines, tasks, and forms‑aligned fields.
            </Card>
            <Card title="You confirm and move forward">
              Nothing happens silently. Assumptions are labeled. You stay in control.
            </Card>
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" className="py-20" style={{ background: "rgba(255,255,255,0.35)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">Designed for real transaction workflows</h2>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Workflow
              title="Transaction intake"
              bullets={[
                "Capture parties, property, and terms",
                "Generate a first‑pass timeline",
                "Identify missing items",
              ]}
            />
            <Workflow
              title="Disclosure & forms assistance"
              bullets={[
                "Surface required disclosures",
                "Track completion and signatures",
                "Reduce rework and omissions",
              ]}
            />
            <Workflow
              title="Ongoing execution"
              bullets={[
                "Monitor deadlines",
                "Draft updates and messages",
                "Maintain a single source of truth",
              ]}
            />
            <Workflow
              title="Exception handling"
              bullets={[
                "Flag inconsistencies",
                "Surface risk early",
                "Guide resolution steps",
              ]}
            />
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section id="compliance" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">Built for trust, oversight, and compliance</h2>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Workflow
              title="What VoicePilot does"
              bullets={[
                "Supports operational execution",
                "Tracks structured transaction state",
                "Drafts artifacts for review",
                "Surfaces uncertainty and risk",
              ]}
            />
            <Workflow
              title="What VoicePilot does not do"
              bullets={[
                "Provide legal advice",
                "File or send documents autonomously",
                "Bypass broker oversight",
                "Make unlabeled assumptions",
              ]}
            />
          </div>
        </div>
      </section>

      {/* INVITE */}
      <section id="invite" className="py-20" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">Join VoicePilot early access</h2>
          <p className="ethica-body mt-4 max-w-2xl" style={{ opacity: 0.85 }}>
            VoicePilot is rolling out in phases. Join the invite list to be notified when access opens in your area.
          </p>

          <div className="mt-8">
            <PillInputCTA />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ background: TOKENS.warm, borderTop: "1px solid rgba(16,36,27,0.12)" }}>
        <p className="text-xs max-w-6xl mx-auto px-6 opacity-70">
          Ethica provides operational support and drafting assistance. It does not provide legal advice. ZipForm® is a registered trademark of the National Association of REALTORS®.
        </p>
      </footer>
    </div>
  );
}

/* =========
   COMPONENTS
========= */

function Card({ title, children }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(16,36,27,0.14)",
      }}
    >
      <h3 className="ethica-h4">{title}</h3>
      <p className="ethica-body mt-3">{children}</p>
    </div>
  );
}

function Workflow({ title, bullets }) {
  return (
    <Card title={title}>
      <ul className="mt-3 space-y-2 ethica-body">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </Card>
  );
}

function PillButton({ children, variant = "outline" }) {
  const solid = variant === "solid";
  return (
    <button
      className="h-11 px-5 rounded-full text-sm font-medium transition"
      style={{
        background: solid ? TOKENS.dark : "rgba(244,240,233,0.7)",
        color: solid ? TOKENS.warm : TOKENS.dark,
        border: solid
          ? "1px solid rgba(16,36,27,0.2)"
          : "1px solid rgba(130,191,152,0.85)",
        boxShadow: solid
          ? "0 10px 22px rgba(16,36,27,0.18)"
          : "0 10px 22px rgba(16,36,27,0.10)",
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = "translateY(1px)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "translateY(0px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
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
        background: "rgba(244,240,233,0.8)",
        border: "1px solid rgba(130,191,152,0.85)",
        boxShadow: "0 14px 28px rgba(16,36,27,0.14)",
      }}
    >
      <input
        placeholder="Enter your email"
        className="flex-1 h-11 px-4 bg-transparent outline-none text-sm"
        style={{ color: TOKENS.dark }}
      />
      <PillButton variant="solid">Try for Free →</PillButton>
    </div>
  );
}

function ProductMock() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(16,36,27,0.14)",
      }}
    >
      <p className="text-xs opacity-70">VoicePilot (illustrative)</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(16,36,27,0.14)",
          }}
        >
          <p className="opacity-60">Agent</p>
          <p>Create a buyer transaction for 123 Maple Street.</p>
          <p className="mt-3 opacity-60">VoicePilot</p>
          <p>I've captured the address and buyer side. Who are the buyers?</p>
          <div
            className="mt-3 p-2 rounded-lg"
            style={{
              background: TOKENS.soft,
              border: "1px solid rgba(16,36,27,0.14)",
              color: TOKENS.ink,
            }}
          >
            I'll set acceptance to yesterday. <strong>Please confirm.</strong>
          </div>
        </div>

        <div
          className="p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(16,36,27,0.14)",
          }}
        >
          <p className="opacity-60">Timeline</p>
          <p className="mt-2">Acceptance date — Confirmed</p>
          <p>Deposit due — Upcoming</p>
          <p>Inspection — Inferred</p>
        </div>
      </div>
    </div>
  );
}
