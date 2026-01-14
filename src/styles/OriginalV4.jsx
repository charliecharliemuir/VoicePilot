// HomePage - Fresh messaging overhaul (FRE-247)
// Focus: Concrete value prop, Ethica personality, zipForm integration
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKENS, Icons, SharedFooter } from "./shared";

const VIDEO_URL = "https://files.catbox.moe/xg4wl5.mp4";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [floatingEmail, setFloatingEmail] = useState("");
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Preload video on mount
  useEffect(() => {
    const video = document.createElement("video");
    video.src = VIDEO_URL;
    video.preload = "auto";
    video.oncanplaythrough = () => setVideoLoaded(true);
    video.load();
  }, []);

  const handlePlayVideo = () => {
    setVideoStarted(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleFloatingSubmit = (e) => {
    e.preventDefault();
    if (floatingEmail.trim() && floatingEmail.includes("@")) {
      navigate(`/waitlist?email=${encodeURIComponent(floatingEmail)}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      {/* Grainy texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: "overlay",
        }}
      />

      {/* Floating Email Capture Pill */}
      <div
        className="fixed bottom-6 right-6 z-[90] hidden sm:block"
        style={{
          animation: "float-in 0.5s ease-out",
        }}
      >
        <form
          onSubmit={handleFloatingSubmit}
          className="flex items-center gap-2 p-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(16,36,27,0.15), 0 2px 8px rgba(16,36,27,0.1)",
          }}
        >
          <div className="flex items-center gap-2 pl-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              value={floatingEmail}
              onChange={(e) => setFloatingEmail(e.target.value)}
              className="w-48 h-10 text-sm outline-none bg-transparent"
              style={{ color: TOKENS.dark }}
              required
            />
          </div>
          <button
            type="submit"
            className="h-10 px-5 rounded-full text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            style={{
              background: TOKENS.dark,
              color: TOKENS.warm,
            }}
          >
            Get Early Access
          </button>
        </form>
      </div>

      {/* NAV */}
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
            <img src="/ethica-splash-high-res.png" alt="Ethica" className="h-5 sm:h-6 translate-y-0.5" />
            <span className="text-sm sm:text-base opacity-50 font-medium hidden sm:inline">·</span>
            <span className="text-sm sm:text-base opacity-90 font-medium tracking-tight hidden sm:inline">VoicePilot</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="/CARpartnership" className="opacity-60 hover:opacity-100 transition-opacity">C.A.R. + Ethica</a>
            <a href="/broker" className="opacity-60 hover:opacity-100 transition-opacity">For Brokerages</a>
            <a href="#waitlist" className="opacity-60 hover:opacity-100 transition-opacity">Join Waitlist</a>
            <a href="https://heyethica.com" className="opacity-60 hover:opacity-100 transition-opacity">Ethica Video</a>
          </nav>

          <a href="#waitlist" className="hidden sm:block">
            <button
              className="h-10 px-5 rounded-full text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: TOKENS.dark,
                color: TOKENS.warm,
                boxShadow: "0 4px 14px rgba(16,36,27,0.15)",
              }}
            >
              Get Early Access
            </button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          {/* Headline row */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
              Create offers and counteroffers
              <br />
              <span style={{ color: TOKENS.accent }}>from your phone.</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl opacity-70 font-medium">
              No laptop required.
            </p>
          </div>

          {/* Video with custom thumbnail */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden mx-auto max-w-4xl cursor-pointer"
            style={{
              boxShadow: "0 25px 80px rgba(16,36,27,0.2)",
              background: TOKENS.dark,
            }}
            onClick={!videoStarted ? handlePlayVideo : undefined}
          >
            {!videoStarted ? (
              /* Thumbnail overlay */
              <>
                <img
                  src="https://files.catbox.moe/751n91.png"
                  alt="Watch VoicePilot Demo"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
                {/* Ethica logo */}
                <div className="absolute top-6 left-6">
                  <img src="/ethica-splash-high-res.png" alt="Ethica" className="h-8 sm:h-10" />
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      boxShadow: "0 8px 32px rgba(16,36,27,0.3)",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill={TOKENS.dark}
                      className="ml-1"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                {/* Loading indicator */}
                {!videoLoaded && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs text-white">Loading video...</span>
                  </div>
                )}
                {videoLoaded && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.9)" }}>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium" style={{ color: TOKENS.dark }}>Ready to play</span>
                  </div>
                )}
              </>
            ) : (
              /* Video player */
              <video
                ref={videoRef}
                controls
                playsInline
                preload="auto"
                className="w-full h-auto"
                style={{ display: "block" }}
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Description + CTA row */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-lg sm:text-xl leading-relaxed" style={{ opacity: 0.8 }}>
              Meet <strong>Ethica</strong> — your voice-powered assistant that helps you
              complete transactions while you talk. Just tell her the details,
              review what she drafts, and send it off.
            </p>

            {/* Tagline */}
            <p className="mt-6 text-2xl sm:text-3xl font-semibold" style={{ color: TOKENS.accent }}>
              Say it. Sign it. Send it.
            </p>

            {/* C.A.R. Partnership Badge */}
            <a
              href="/CARpartnership"
              className="inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-full transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 4px 12px rgba(16,36,27,0.08)",
              }}
            >
              <img src="/car-logo.png" alt="C.A.R." className="h-6" />
              <span className="text-sm font-medium opacity-80">Backed by the California Association of REALTORS®</span>
            </a>

            {/* CTA */}
            <div className="mt-10">
              <a href="#waitlist">
                <button
                  className="h-14 px-8 rounded-full text-base font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: TOKENS.dark,
                    color: TOKENS.warm,
                    boxShadow: "0 4px 20px rgba(16,36,27,0.2)",
                  }}
                >
                  Join the Waitlist →
                </button>
              </a>
              <p className="mt-4 text-sm opacity-50">California agents · Rolling out in phases</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16 md:py-24 relative z-10" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium text-center">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center">
            Talk through your deal. Ethica handles the paperwork.
          </h2>

          <div className="mt-14 grid sm:grid-cols-3 gap-10 lg:gap-14">
            <Step number="1" title="Tell Ethica the details">
              "The buyer is offering $850,000, 3% down, 21-day close, no contingencies."
              Speak naturally — like you're briefing a colleague.
            </Step>
            <Step number="2" title="Review what she drafts">
              Ethica fills in your zipForm RPA in real-time.
              Check the numbers, make changes by voice or touch.
            </Step>
            <Step number="3" title="Send it off">
              When it looks right, sign and send — all from your phone.
              Your client gets the offer in minutes, not hours.
            </Step>
          </div>
        </div>
      </section>

      {/* ZIP FORMS INTEGRATION */}
      <section id="zipforms" className="py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">zipForm Integration</p>
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Works with your existing zipForm account.
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ opacity: 0.75 }}>
            Ethica connects to the zipForm platform you already know.
            She fills out official C.A.R. forms — RPA, counter-offers, addenda —
            so you don't have to type a single field.
          </p>
          <ul className="mt-8 space-y-4 inline-block text-left">
            <BulletPoint>Official C.A.R. forms, always up to date</BulletPoint>
            <BulletPoint>Your zipForm account, your transactions</BulletPoint>
            <BulletPoint>Nothing changes about how you submit or store docs</BulletPoint>
          </ul>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section className="py-16 md:py-24 relative z-10" style={{ background: "rgba(200,227,210,0.3)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium text-center">Trust & Compliance</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12">
            Built for oversight and compliance
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What VoicePilot does */}
            <div
              className="p-6 sm:p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.9)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: TOKENS.accent }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">What VoicePilot does</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.8 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Supports operational execution
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.8 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Tracks structured transaction state
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.8 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Drafts artifacts for human review
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.8 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Surfaces uncertainty and risk
                </li>
              </ul>
            </div>

            {/* What VoicePilot does not do */}
            <div
              className="p-6 sm:p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.7)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,36,27,0.1)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2" opacity="0.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ opacity: 0.7 }}>What VoicePilot does not do</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.5 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Provide legal advice
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.5 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  File or send documents autonomously
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.5 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Bypass broker oversight
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ opacity: 0.5 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TOKENS.dark }} />
                  Make unlabeled assumptions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE IT YOURSELF - Interactive Demo */}
      <section className="py-16 md:py-24 relative z-10" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium text-center">Try VoicePilot</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-center">
            Experience it yourself
          </h2>
          <p className="mt-4 text-lg text-center max-w-2xl mx-auto" style={{ opacity: 0.7 }}>
            Get a taste of how VoicePilot works — right here in your browser.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-6 items-start">
            {/* Chat Interface */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 8px 32px rgba(16,36,27,0.1)",
              }}
            >
              <div className="p-4 border-b border-black/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: TOKENS.accent }}>
                  <span className="text-sm font-semibold" style={{ color: TOKENS.dark }}>E</span>
                </div>
                <span className="font-medium">Ethica</span>
              </div>
              <div className="p-6 space-y-4 min-h-[280px]">
                {/* Ethica message */}
                <div className="flex gap-3">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-md max-w-[85%]"
                    style={{ background: "rgba(200,227,210,0.5)" }}
                  >
                    <p className="text-sm">Hi! I'm Ethica. What would you like to do today?</p>
                  </div>
                </div>
                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:scale-[1.02]"
                    style={{ background: TOKENS.accent, color: TOKENS.dark }}
                  >
                    Start property →
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80"
                    style={{ background: "rgba(16,36,27,0.08)" }}
                  >
                    + Add buyers
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:opacity-80"
                    style={{ background: "rgba(16,36,27,0.08)" }}
                  >
                    * Set price
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-black/5">
                <p className="text-xs text-center" style={{ opacity: 0.4 }}>Try speaking...</p>
              </div>
            </div>

            {/* Transaction Form Preview */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 8px 32px rgba(16,36,27,0.1)",
              }}
            >
              <div className="p-4 border-b border-black/5 flex items-center justify-between">
                <span className="font-medium">Transaction Form</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(130,191,152,0.2)", color: TOKENS.dark }}>LIVE</span>
              </div>
              <div className="p-6 space-y-4">
                <FormPreviewField label="PROPERTY" value="" placeholder="..." />
                <FormPreviewField label="BUYERS / ADDRESSES" value="" placeholder="..." />
                <FormPreviewField label="CLIENT SEARCH" value="" placeholder="..." />
                <FormPreviewField label="TRANSACTION TYPE" value="" placeholder="..." />
                <FormPreviewField label="FINANCIALS" value="" placeholder="..." />
              </div>
              <div className="p-4 border-t border-black/5 flex justify-between items-center">
                <p className="text-xs" style={{ opacity: 0.4 }}>Listening for more data...</p>
                <p className="text-xs" style={{ opacity: 0.4 }}>0% complete</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C.A.R. PARTNERSHIP / SOCIAL PROOF */}
      <section className="py-16 md:py-20 relative z-10" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">Strategic Partnership</p>
            <h2 className="text-3xl sm:text-4xl font-semibold">
              C.A.R. partner with $2M investment and board seat
            </h2>
          </div>

          <a
            href="/CARpartnership"
            className="block p-6 sm:p-8 rounded-2xl transition-all hover:scale-[1.01]"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(16,36,27,0.08)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <img src="/car-logo.png" alt="California Association of REALTORS®" className="h-16 md:h-20" />
              <div className="text-center md:text-left">
                <p className="text-lg sm:text-xl leading-relaxed" style={{ opacity: 0.85 }}>
                  REBS, the for-profit arm of the California Association of REALTORS®, has made a strategic
                  investment in Ethica and joined our board — a commitment to building the future of
                  real estate technology for California agents.
                </p>
                <p className="mt-4 text-sm font-medium" style={{ color: TOKENS.accent }}>
                  Read the partnership announcement →
                </p>
              </div>
            </div>
          </a>

          <p className="mt-8 text-center text-lg leading-relaxed" style={{ opacity: 0.7 }}>
            Built by a team with deep transaction and compliance experience.
            Designed in close collaboration with California real estate professionals.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-16 md:py-24 relative z-10" style={{ background: TOKENS.dark, color: TOKENS.warm }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Ready to try it?
          </h2>
          <p className="mt-4 text-lg" style={{ opacity: 0.7 }}>
            VoicePilot is rolling out to California agents in phases.
            Join the waitlist and we'll let you know when it's your turn.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim() && email.includes("@")) {
                navigate(`/waitlist?email=${encodeURIComponent(email)}`);
              }
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 px-6 rounded-full text-base w-full sm:w-80 outline-none"
              style={{
                background: "rgba(244,240,233,0.95)",
                color: TOKENS.dark,
                border: `2px solid ${TOKENS.accent}`,
              }}
              required
            />
            <button
              type="submit"
              className="h-14 px-8 rounded-full text-base font-medium w-full sm:w-auto transition-all hover:scale-[1.02]"
              style={{ background: TOKENS.accent, color: TOKENS.dark }}
            >
              Join Waitlist →
            </button>
          </form>

          <p className="mt-6 text-sm opacity-50">
            No spam. We'll only email you when access opens.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <SharedFooter />
    </div>
  );
}

/* =========
   COMPONENTS
========= */

function Step({ number, title, children }) {
  return (
    <div className="text-center sm:text-left">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mx-auto sm:mx-0 mb-5"
        style={{ background: TOKENS.accent, color: TOKENS.dark }}
      >
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="leading-relaxed" style={{ opacity: 0.7 }}>{children}</p>
    </div>
  );
}

function BulletPoint({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm"
        style={{ background: TOKENS.accent, color: TOKENS.dark }}
      >
        ✓
      </span>
      <span style={{ opacity: 0.85 }}>{children}</span>
    </li>
  );
}

function FormPreviewField({ label, value, placeholder }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.4 }}>{label}</p>
      <div
        className="h-9 px-3 rounded-lg flex items-center text-sm"
        style={{ background: "rgba(16,36,27,0.03)", border: "1px solid rgba(16,36,27,0.08)" }}
      >
        <span style={{ opacity: value ? 1 : 0.3 }}>{value || placeholder}</span>
      </div>
    </div>
  );
}
