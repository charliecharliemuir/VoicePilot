// C.A.R. Partnership Announcement - Press Release Page
import React from "react";
import { Link } from "react-router-dom";
import { TOKENS, SharedFooter } from "./shared";

export default function CARPartnership() {
  return (
    <div className="min-h-screen relative" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      {/* Grainy Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 pt-6 pb-4">
        <div
          className="mx-auto max-w-6xl rounded-full px-4 sm:px-6 h-16 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 8px 32px rgba(16,36,27,0.08)",
          }}
        >
          <Link to="/" className="flex items-baseline gap-2.5">
            <img src="/ethica-splash-high-res.png" alt="Ethica" className="h-5 sm:h-6 translate-y-0.5" />
            <span className="text-sm sm:text-base opacity-50 font-medium hidden sm:inline">·</span>
            <span className="text-sm sm:text-base opacity-90 font-medium tracking-tight hidden sm:inline">VoicePilot</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="h-10 px-5 rounded-full text-sm font-medium flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </Link>
            <a
              href="https://heyethica.com"
              className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              Ethica Video
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-10 pb-16 md:pt-16 md:pb-24 relative z-10">
        <article className="mx-auto max-w-3xl px-6">
          {/* Press Release Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">Press Release</p>
            <p className="text-sm opacity-60 mb-6">January 2026</p>

            {/* Logos */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <img src="/ethica-splash-high-res.png" alt="Ethica" className="h-8" />
              <span className="text-2xl opacity-30">+</span>
              <img src="/car-logo.png" alt="California Association of REALTORS®" className="h-12 rounded" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              California Association of REALTORS® Makes Strategic Investment in Ethica
            </h1>
          </div>

          {/* Subhead */}
          <div
            className="p-6 rounded-2xl mb-10 text-center"
            style={{
              background: "rgba(130,191,152,0.15)",
              border: "1px solid rgba(130,191,152,0.3)",
            }}
          >
            <p className="text-lg sm:text-xl font-medium" style={{ opacity: 0.9 }}>
              REBS invests $2 million and takes board seat, reinforcing commitment to voice-powered real estate technology
            </p>
          </div>

          {/* Body */}
          <div className="prose prose-lg max-w-none space-y-6" style={{ opacity: 0.85 }}>
            <p className="text-lg leading-relaxed">
              <strong>LOS ANGELES, CA</strong> — Ethica, the company behind VoicePilot, today announced a strategic
              investment from Real Estate Business Services, Inc. (REBS), the for-profit subsidiary of the
              California Association of REALTORS® (C.A.R.). The $2 million investment includes a board seat,
              marking a significant milestone in Ethica's mission to transform how California real estate
              agents handle paperwork and transactions.
            </p>

            <p className="text-lg leading-relaxed">
              "This partnership represents a shared vision for the future of real estate technology in California,"
              said the Ethica team. "C.A.R. has been at the forefront of supporting California agents for over
              a century. Having REBS as an investor and board partner validates our approach to making
              voice-powered transaction management a reality."
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: TOKENS.dark }}>
              About the Partnership
            </h2>

            <p className="text-lg leading-relaxed">
              REBS's investment will accelerate the development of VoicePilot, Ethica's voice-powered assistant
              that enables agents to create offers and counteroffers using natural speech. The platform integrates
              directly with zipForm, allowing agents to complete official C.A.R. forms without typing a single field.
            </p>

            <p className="text-lg leading-relaxed">
              As part of the agreement, REBS will hold a seat on Ethica's board of directors, ensuring that
              the needs and perspectives of California's real estate community remain central to product development.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: TOKENS.dark }}>
              What This Means for Agents
            </h2>

            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm"
                  style={{ background: TOKENS.accent, color: TOKENS.dark }}
                >
                  ✓
                </span>
                <span>Deeper integration with C.A.R. forms and compliance standards</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm"
                  style={{ background: TOKENS.accent, color: TOKENS.dark }}
                >
                  ✓
                </span>
                <span>Product roadmap guided by California agent needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm"
                  style={{ background: TOKENS.accent, color: TOKENS.dark }}
                >
                  ✓
                </span>
                <span>Accelerated development of voice-powered features</span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm"
                  style={{ background: TOKENS.accent, color: TOKENS.dark }}
                >
                  ✓
                </span>
                <span>Commitment to agent-first design and user experience</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: TOKENS.dark }}>
              About Ethica
            </h2>

            <p className="text-lg leading-relaxed">
              Ethica builds voice-powered tools for real estate professionals. VoicePilot, its flagship product,
              lets agents create offers and counteroffers by speaking naturally — no laptop required. The platform
              integrates with zipForm and is designed specifically for the California real estate market.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: TOKENS.dark }}>
              About REBS and C.A.R.
            </h2>

            <p className="text-lg leading-relaxed">
              Real Estate Business Services, Inc. (REBS) is the for-profit subsidiary of the California Association
              of REALTORS®, the largest state trade organization in the United States with over 200,000 members.
              REBS develops and invests in products and services that benefit California real estate professionals.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full text-base font-medium transition-all hover:scale-[1.02]"
              style={{
                background: TOKENS.dark,
                color: TOKENS.warm,
                boxShadow: "0 4px 20px rgba(16,36,27,0.2)",
              }}
            >
              Learn More About VoicePilot
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-black/10 text-center">
            <p className="text-sm opacity-60">
              Media Contact: <a href="mailto:press@heyethica.com" className="underline">press@heyethica.com</a>
            </p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <SharedFooter />
      </div>
    </div>
  );
}
