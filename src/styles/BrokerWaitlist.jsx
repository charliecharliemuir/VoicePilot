// Broker Waitlist Page - FRE-202
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TOKENS, Icons, SharedFooter } from "./shared";

export default function BrokerWaitlist() {
  const [formData, setFormData] = useState({
    brokerageName: "",
    agentCount: "",
    contactName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Connect to backend API to store broker signup
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Broker signup:", formData);
    setLoading(false);
    setSubmitted(true);
  };

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
            <img src="/ethica-splash-high-res.png" alt="ethica" className="h-5 sm:h-6 translate-y-0.5" />
            <span className="text-sm sm:text-base opacity-50 font-medium hidden sm:inline">·</span>
            <span className="text-sm sm:text-base opacity-90 font-medium tracking-tight hidden sm:inline">VoicePilot</span>
          </Link>

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
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-10 pb-16 md:pt-16 md:pb-24 relative z-10">
        <div className="mx-auto max-w-2xl px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4 font-medium">For Brokerages</p>
            <h1 className="ethica-h1 leading-[1.1]">
              Empower your agents
              <br />
              <span style={{ opacity: 0.65 }}>with voice-first tools</span>
            </h1>
            <p className="ethica-body mt-6 max-w-lg mx-auto leading-relaxed" style={{ opacity: 0.75 }}>
              Give every agent in your brokerage access to VoicePilot. Reduce admin burden,
              improve compliance, and let your team focus on what they do best.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div
            className="p-6 sm:p-8 rounded-2xl mb-10"
            style={{
              background: "rgba(130,191,152,0.15)",
              border: "1px solid rgba(130,191,152,0.3)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="ethica-h4">Broker Pricing</h3>
                <p className="ethica-body mt-1" style={{ opacity: 0.7 }}>
                  Volume pricing for your entire team
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-semibold" style={{ color: TOKENS.dark }}>$10</span>
                  <span className="text-sm opacity-60">/agent/month</span>
                </div>
                <p className="text-xs mt-1 opacity-50">+ discounted per-transaction TC fees</p>
              </div>
            </div>
          </div>

          {/* Form */}
          {!submitted ? (
            <div
              className="p-6 sm:p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 8px 32px rgba(16,36,27,0.08)",
              }}
            >
              <h2 className="ethica-h3 mb-6">Join the broker waitlist</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                    Brokerage Name *
                  </label>
                  <input
                    type="text"
                    name="brokerageName"
                    value={formData.brokerageName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Sunset Realty Group"
                    className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(16,36,27,0.1)",
                      color: TOKENS.dark,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                    Number of Agents *
                  </label>
                  <select
                    name="agentCount"
                    value={formData.agentCount}
                    onChange={handleChange}
                    required
                    className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 appearance-none cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(16,36,27,0.1)",
                      color: TOKENS.dark,
                    }}
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 agents</option>
                    <option value="11-25">11-25 agents</option>
                    <option value="26-50">26-50 agents</option>
                    <option value="51-100">51-100 agents</option>
                    <option value="100+">100+ agents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(16,36,27,0.1)",
                      color: TOKENS.dark,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@brokerage.com"
                    className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(16,36,27,0.1)",
                      color: TOKENS.dark,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                    Phone <span className="opacity-50">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(16,36,27,0.1)",
                      color: TOKENS.dark,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] mt-6 flex items-center justify-center gap-2"
                  style={{
                    background: TOKENS.dark,
                    color: TOKENS.warm,
                    boxShadow: "0 4px 20px rgba(16,36,27,0.2)",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join Broker Waitlist
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-center mt-6" style={{ opacity: 0.5 }}>
                We'll reach out to discuss your brokerage's needs and timeline.
              </p>
            </div>
          ) : (
            /* Success State */
            <div
              className="p-8 sm:p-12 rounded-2xl text-center"
              style={{
                background: "rgba(130,191,152,0.15)",
                border: "1px solid rgba(130,191,152,0.3)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: TOKENS.accent }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="ethica-h2 mb-4">You're on the list!</h2>
              <p className="ethica-body" style={{ opacity: 0.7 }}>
                Thank you for your interest in VoicePilot for your brokerage.
                <br />
                We'll be in touch soon to discuss your team's needs.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-8 h-12 px-6 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                style={{
                  background: TOKENS.dark,
                  color: TOKENS.warm,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Home
              </Link>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(130,191,152,0.15)" }}
              >
                {Icons.layers}
              </div>
              <h4 className="font-medium mb-2">Unified Platform</h4>
              <p className="text-sm" style={{ opacity: 0.6 }}>
                All your agents on one platform with shared workflows
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(130,191,152,0.15)" }}
              >
                {Icons.shield}
              </div>
              <h4 className="font-medium mb-2">Broker Oversight</h4>
              <p className="text-sm" style={{ opacity: 0.6 }}>
                Visibility into transaction status and compliance
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(130,191,152,0.15)" }}
              >
                {Icons.clock}
              </div>
              <h4 className="font-medium mb-2">Time Savings</h4>
              <p className="text-sm" style={{ opacity: 0.6 }}>
                Reduce admin time so agents can focus on clients
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <SharedFooter />
      </div>
    </div>
  );
}
