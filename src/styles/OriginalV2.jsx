// ORIGINAL V2 - Premium, polished, grainy texture, perfected sections
import React, { useState, useEffect, useRef } from "react";
import { TOKENS, Icons, SharedFooter } from "./shared";
import PhoneMockV2 from "../components/PhoneMockV2";
import InteractiveDemo from "../components/InteractiveDemo";

const SECTION_BACKGROUNDS = {
  hero: TOKENS.warm,
  preview: "rgba(255,255,255,0.5)",
  trust: TOKENS.warm,
  how: TOKENS.warm,
  workflows: "rgba(255,255,255,0.5)",
  compliance: TOKENS.soft,
  waitlist: TOKENS.dark,
  footer: TOKENS.dark,
};

export default function OriginalV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSectionBg, setCurrentSectionBg] = useState(TOKENS.warm);
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  
  const sectionRefs = {
    hero: useRef(null),
    preview: useRef(null),
    trust: useRef(null),
    how: useRef(null),
    workflows: useRef(null),
    compliance: useRef(null),
    waitlist: useRef(null),
    footer: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportBottom = window.innerHeight;
      const ctaHeight = 100;
      const checkPoint = viewportBottom - ctaHeight;
      const sectionOrder = ['footer', 'waitlist', 'compliance', 'workflows', 'how', 'trust', 'preview', 'hero'];
      
      // Show CTA always except when footer is visible
      if (sectionRefs.footer.current) {
        const footerRect = sectionRefs.footer.current.getBoundingClientRect();
        const footerVisible = footerRect.top < window.innerHeight;
        
        // Show CTA unless footer is visible
        setShowFloatingCTA(!footerVisible);
      }
      
      for (const sectionId of sectionOrder) {
        const ref = sectionRefs[sectionId];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
            setCurrentSectionBg(SECTION_BACKGROUNDS[sectionId]);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      {/* Grainy Noise Texture Overlay - Fixed and visible */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Floating CTA - appears after scrolling past hero */}
      <FloatingCTAV2 show={showFloatingCTA} backgroundColor={currentSectionBg} />
      
      {/* GLASS NAV - Glassmorphism style with original content */}
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
          <div className="flex items-baseline gap-2.5">
            <img src="/ethica-splash-high-res.png" alt="ethica" className="h-5 sm:h-6 translate-y-0.5" />
            <span className="text-sm sm:text-base opacity-50 font-medium hidden sm:inline">·</span>
            <span className="text-sm sm:text-base opacity-90 font-medium tracking-tight hidden sm:inline">VoicePilot</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how" className="opacity-60 hover:opacity-100 transition-opacity duration-300">How It Works</a>
            <a href="#workflows" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Workflows</a>
            <a href="#compliance" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Compliance</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#waitlist" className="hidden sm:block">
              <button 
                className="h-10 px-5 rounded-full text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ 
                  background: TOKENS.dark,
                  color: TOKENS.warm,
                  boxShadow: "0 4px 14px rgba(16,36,27,0.15)",
                }}
              >
                Join Waitlist
              </button>
            </a>
            <button
              className="md:hidden h-10 w-10 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ 
                background: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.4)" 
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu - also glass style */}
        {menuOpen && (
          <div 
            className="md:hidden mx-auto max-w-6xl mt-2 px-6 py-5 rounded-2xl flex flex-col gap-4 text-sm animate-fadeIn"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <a href="#how" onClick={() => setMenuOpen(false)} className="py-2 opacity-80">How It Works</a>
            <a href="#workflows" onClick={() => setMenuOpen(false)} className="py-2 opacity-80">Workflows</a>
            <a href="#compliance" onClick={() => setMenuOpen(false)} className="py-2 opacity-80">Compliance</a>
            <a href="#waitlist" onClick={() => setMenuOpen(false)} className="mt-3">
              <button 
                className="h-11 px-6 rounded-full text-sm font-medium w-full"
                style={{ background: TOKENS.dark, color: TOKENS.warm }}
              >
                Join Waitlist
              </button>
            </a>
          </div>
        )}
      </header>

      {/* HERO - Refined with better alignment */}
      <section ref={sectionRefs.hero} className="pt-10 pb-8 md:pt-14 md:pb-12 lg:pt-16 lg:pb-16 relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
            {/* Text content */}
            <div className="md:col-span-6 lg:col-span-6 text-center md:text-left">
              <h1 className="ethica-h1 leading-[1.05]">
                Real estate work<br className="hidden md:inline" /> is conversational.
              </h1>
              <h1 className="ethica-h1 mt-2 leading-[1.05]" style={{ opacity: 0.65 }}>
                Your transaction system<br className="hidden md:inline" /> should be too.
              </h1>

              <p className="ethica-body mt-6 md:mt-8 max-w-md mx-auto md:mx-0 leading-relaxed" style={{ opacity: 0.75 }}>
                VoicePilot turns real conversations into structured, compliant transaction progress — without forcing agents to stop and do admin work.
              </p>

              <div className="mt-8 md:mt-10">
                <a href="#waitlist">
                  <PillButton variant="solid">Join the Waitlist →</PillButton>
                </a>
              </div>

              <p className="mt-5 text-xs opacity-50 tracking-wide">Rolling out in phases · California‑first</p>
            </div>

            {/* Phone mock - properly sized iPhone 17 Pro */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center md:justify-end">
              <PhoneMockV2 />
            </div>
          </div>
        </div>
      </section>

      {/* APP PREVIEW - Refined */}
      <section ref={sectionRefs.preview} className="py-16 md:py-20 relative z-10" style={{ background: "rgba(255,255,255,0.45)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">Try VoicePilot</p>
          <h2 className="ethica-h2">Experience it yourself</h2>
          <p className="ethica-body mt-4 max-w-xl mx-auto" style={{ opacity: 0.7 }}>
            Get a taste of how VoicePilot works — right here in your browser.
          </p>

          <div className="mt-10">
            <InteractiveDemo />
          </div>
        </div>
      </section>

      {/* TRUST STRIP - Refined */}
      <section
        ref={sectionRefs.trust}
        className="py-12 relative z-10"
        style={{
          background: TOKENS.warm,
          borderTop: "1px solid rgba(16,36,27,0.06)",
          borderBottom: "1px solid rgba(16,36,27,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="ethica-body leading-relaxed" style={{ opacity: 0.7 }}>
            Built by a team with deep transaction and compliance experience. Designed in close collaboration with California real estate professionals.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS - Refined */}
      <section ref={sectionRefs.how} id="how" className="py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">How It Works</p>
          <h2 className="ethica-h2">From conversation to transaction</h2>
          <p className="ethica-body mt-4 max-w-2xl" style={{ opacity: 0.7 }}>
            VoicePilot captures intent as you speak, structures it into the transaction, and keeps you oriented around what's confirmed, what's missing, and what's next.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            <IconFeatureV2 icon={Icons.mic} title="Speak naturally">
              Talk through deals, changes, and questions the same way you already do.
            </IconFeatureV2>
            <IconFeatureV2 icon={Icons.layers} title="VoicePilot structures it">
              Key details are extracted into timelines, tasks, and forms‑aligned fields.
            </IconFeatureV2>
            <IconFeatureV2 icon={Icons.check} title="You confirm and move forward" className="sm:col-span-2 lg:col-span-1">
              Nothing happens silently. Assumptions are labeled. You stay in control.
            </IconFeatureV2>
          </div>
        </div>
      </section>

      {/* WORKFLOWS - Refined */}
      <section ref={sectionRefs.workflows} id="workflows" className="py-16 md:py-24 relative z-10" style={{ background: "rgba(255,255,255,0.45)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">Workflows</p>
          <h2 className="ethica-h2">Designed for real transaction workflows</h2>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <IconFeatureV2 icon={Icons.clipboard} title="Transaction intake">
              Capture parties, property, and terms. Generate a first‑pass timeline. Identify missing items.
            </IconFeatureV2>
            <IconFeatureV2 icon={Icons.fileText} title="Disclosure assistance">
              Surface required disclosures. Track completion and signatures. Reduce rework.
            </IconFeatureV2>
            <IconFeatureV2 icon={Icons.clock} title="Ongoing execution">
              Monitor deadlines. Draft updates and messages. Maintain a single source of truth.
            </IconFeatureV2>
            <IconFeatureV2 icon={Icons.alertTriangle} title="Exception handling">
              Flag inconsistencies. Surface risk early. Guide resolution steps.
            </IconFeatureV2>
          </div>
        </div>
      </section>

      {/* COMPLIANCE - Refined */}
      <section ref={sectionRefs.compliance} id="compliance" className="py-16 md:py-24 relative z-10" style={{ background: TOKENS.soft }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">Trust & Compliance</p>
          <h2 className="ethica-h2">Built for oversight and compliance</h2>

          <div className="mt-12 grid sm:grid-cols-2 gap-10 lg:gap-16">
            <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)" }}>
              <h3 className="ethica-h4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: TOKENS.accent, color: TOKENS.dark }}>✓</span>
                What VoicePilot does
              </h3>
              <ul className="mt-5 space-y-3 ethica-body" style={{ opacity: 0.8 }}>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: TOKENS.accent }} />
                  Supports operational execution
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: TOKENS.accent }} />
                  Tracks structured transaction state
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: TOKENS.accent }} />
                  Drafts artifacts for human review
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: TOKENS.accent }} />
                  Surfaces uncertainty and risk
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl" style={{ background: "rgba(16,36,27,0.04)" }}>
              <h3 className="ethica-h4 flex items-center gap-3" style={{ opacity: 0.6 }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(16,36,27,0.1)", color: TOKENS.dark }}>✕</span>
                What VoicePilot does not do
              </h3>
              <ul className="mt-5 space-y-3 ethica-body" style={{ opacity: 0.5 }}>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "rgba(16,36,27,0.3)" }} />
                  Provide legal advice
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "rgba(16,36,27,0.3)" }} />
                  File or send documents autonomously
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "rgba(16,36,27,0.3)" }} />
                  Bypass broker oversight
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "rgba(16,36,27,0.3)" }} />
                  Make unlabeled assumptions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST - Refined */}
      <section ref={sectionRefs.waitlist} id="waitlist" className="py-16 md:py-24 relative z-10" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="ethica-h2">Join the waitlist</h2>
          <p className="ethica-body mt-4 max-w-xl" style={{ opacity: 0.7 }}>
            VoicePilot is rolling out in phases. Join the waitlist to be notified when access opens in your area.
          </p>

          <div className="mt-10">
            <PillInputCTAV2 />
          </div>
        </div>
      </section>

      <div ref={sectionRefs.footer} className="relative z-10">
        <SharedFooter />
      </div>
    </div>
  );
}

/* =========
   V2 COMPONENTS - Refined
========= */

function IconFeatureV2({ icon, title, children, className = "" }) {
  return (
    <div className={className}>
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(130,191,152,0.15)" }}>
        <div style={{ color: TOKENS.dark, opacity: 0.8 }}>{icon}</div>
      </div>
      <h3 className="ethica-h4">{title}</h3>
      <p className="ethica-body mt-3" style={{ opacity: 0.7 }}>{children}</p>
    </div>
  );
}

function PillButton({ children, variant = "outline" }) {
  const solid = variant === "solid";
  return (
    <button
      className="h-12 px-7 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        background: solid ? TOKENS.dark : "transparent",
        color: solid ? TOKENS.warm : TOKENS.dark,
        border: solid ? "none" : `1.5px solid ${TOKENS.accent}`,
        boxShadow: solid ? "0 4px 20px rgba(16,36,27,0.2)" : "none",
      }}
      type="button"
    >
      {children}
    </button>
  );
}

function PillInputCTAV2() {
  return (
    <div
      className="flex items-center p-1.5 rounded-full max-w-lg"
      style={{
        background: "rgba(244,240,233,0.95)",
        border: `1.5px solid ${TOKENS.accent}`,
        boxShadow: "0 8px 32px rgba(16,36,27,0.15)",
      }}
    >
      <input
        placeholder="Enter your email"
        className="flex-1 min-w-0 h-12 px-5 bg-transparent outline-none text-sm"
        style={{ color: TOKENS.dark }}
      />
      <button
        className="h-12 px-7 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-300 hover:scale-[1.02]"
        style={{ background: TOKENS.dark, color: TOKENS.warm }}
        type="button"
      >
        <span className="hidden sm:inline">Join Waitlist →</span>
        <span className="sm:hidden">Join →</span>
      </button>
    </div>
  );
}

function FloatingCTAV2({ show, backgroundColor = TOKENS.warm }) {
  const isDark = backgroundColor === TOKENS.dark;
  
  const getGradientColor = (color) => {
    if (color.startsWith('rgba')) return color;
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r},${g},${b},1)`;
    }
    return color;
  };

  const solidColor = getGradientColor(backgroundColor);
  const transparentColor = solidColor.replace(/,1\)$/, ',0)').replace(/rgba\((\d+),(\d+),(\d+),[\d.]+\)/, 'rgba($1,$2,$3,0)');

  return (
    <div
      className="transition-all duration-500 ease-out"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        padding: "24px 12px 16px 12px",
        background: `linear-gradient(to top, ${solidColor} 85%, ${transparentColor})`,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(100%)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center p-1.5 rounded-full w-full"
        style={{
          maxWidth: "400px",
          background: isDark ? "rgba(244,240,233,0.95)" : TOKENS.warm,
          border: `2px solid ${TOKENS.accent}`,
          boxShadow: isDark 
            ? "0 -4px 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 -4px 20px rgba(16,36,27,0.15), 0 8px 32px rgba(16,36,27,0.2)",
        }}
      >
        <input
          placeholder="Email"
          className="flex-1 min-w-0 h-11 px-4 bg-transparent outline-none text-sm"
          style={{ color: TOKENS.dark }}
        />
        <button
          className="h-11 px-5 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 flex-shrink-0"
          style={{ background: TOKENS.dark, color: TOKENS.warm }}
          type="button"
        >
          Join
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
