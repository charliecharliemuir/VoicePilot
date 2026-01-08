import React from "react";

/* =========
   TOKENS - KEEP THESE CONSISTENT
========= */
export const TOKENS = {
  dark: "#10241B",
  accent: "#82BF98",
  soft: "#C8E3D2",
  warm: "#F4F0E9",
  ink: "#0F172A",
};

/* =========
   ICONS (simple SVG components)
========= */
export const Icons = {
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
   SHARED FOOTER
========= */
export function SharedFooter() {
  return (
    <footer className="py-10 sm:py-12 lg:py-16 pb-32 sm:pb-28" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Links */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="text-sm font-medium opacity-60 mb-3 sm:mb-4">Product</h4>
              <nav className="flex flex-col gap-2 sm:gap-3 text-sm">
                <a href="#how" className="hover:opacity-70">How It Works</a>
                <a href="#workflows" className="hover:opacity-70">Workflows</a>
                <a href="#compliance" className="hover:opacity-70">Compliance</a>
                <a href="/broker" className="hover:opacity-70">For Brokerages</a>
              </nav>
            </div>
            <div>
              <h4 className="text-sm font-medium opacity-60 mb-3 sm:mb-4">Company</h4>
              <nav className="flex flex-col gap-2 sm:gap-3 text-sm">
                <a href="https://heyethica.com/about" className="hover:opacity-70">About</a>
                <a href="#" className="hover:opacity-70">Press</a>
                <a href="#" className="hover:opacity-70">Contact</a>
              </nav>
            </div>
          </div>

          {/* Tagline */}
          <div className="lg:col-span-6 lg:text-right mt-4 sm:mt-0">
            <p className="ethica-h2">
              Transact smarter
              <br />
              <span style={{ color: TOKENS.accent }}>with voice</span>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/company/ethica-ai" className="opacity-60 hover:opacity-100" aria-label="LinkedIn">
              {Icons.linkedin}
            </a>
          </div>

          <div
            className="p-3 sm:p-4 rounded-lg text-xs max-w-md"
            style={{ background: "rgba(244,240,233,0.08)" }}
          >
            <p className="opacity-70">
              Ethica provides operational support and drafting assistance. It does not provide legal advice. Ethica is committed to the Fair Housing Act and Equal Opportunity Act.
            </p>
          </div>
        </div>

        <p className="mt-6 sm:mt-8 text-xs opacity-40">
          © 2025 Ethica AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
