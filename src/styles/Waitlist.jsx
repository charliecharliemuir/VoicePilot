// Waitlist Signup Page - Full Form
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TOKENS, SharedFooter } from "./shared";

// California counties
const CALIFORNIA_COUNTIES = [
  "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa",
  "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo",
  "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa",
  "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange",
  "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino",
  "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo",
  "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou",
  "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare",
  "Tuolumne", "Ventura", "Yolo", "Yuba"
];

const TRANSACTION_RANGES = [
  { value: "1-5", label: "1-5 transactions" },
  { value: "6-10", label: "6-10 transactions" },
  { value: "11-20", label: "11-20 transactions" },
  { value: "21-50", label: "21-50 transactions" },
  { value: "51-100", label: "51-100 transactions" },
  { value: "100+", label: "100+ transactions" },
];

const SALES_RANGES = [
  { value: "0-1M", label: "Under $1 million" },
  { value: "1M-5M", label: "$1 - $5 million" },
  { value: "5M-10M", label: "$5 - $10 million" },
  { value: "10M-25M", label: "$10 - $25 million" },
  { value: "25M-50M", label: "$25 - $50 million" },
  { value: "50M-100M", label: "$50 - $100 million" },
  { value: "100M+", label: "$100 million+" },
];

export default function Waitlist() {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    name: "",
    phone: "",
    brokerage: "",
    dreNumber: "",
    counties: [],
    transactions: "",
    sales: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);

  // Validate DRE number (8 digits)
  const validateDRE = (dre) => {
    const dreRegex = /^\d{8}$/;
    return dreRegex.test(dre);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const toggleCounty = (county) => {
    setFormData((prev) => ({
      ...prev,
      counties: prev.counties.includes(county)
        ? prev.counties.filter((c) => c !== county)
        : [...prev.counties, county],
    }));
    if (errors.counties) {
      setErrors((prev) => ({ ...prev, counties: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.brokerage.trim()) newErrors.brokerage = "Brokerage is required";
    if (!formData.dreNumber.trim()) {
      newErrors.dreNumber = "DRE number is required";
    } else if (!validateDRE(formData.dreNumber)) {
      newErrors.dreNumber = "DRE number must be 8 digits";
    }
    if (formData.counties.length === 0) newErrors.counties = "Select at least one county";
    if (!formData.transactions) newErrors.transactions = "Select transaction range";
    if (!formData.sales) newErrors.sales = "Select sales range";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // TODO: Connect to backend API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Waitlist signup:", formData);
    setLoading(false);
    setSubmitted(true);
  };

  // Success/Confirmation State
  if (submitted) {
    return (
      <div className="min-h-screen relative" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
        <GrainyOverlay />
        <Header />

        <main className="pt-16 pb-24 relative z-10">
          <div className="mx-auto max-w-xl px-6 text-center">
            <div
              className="p-10 rounded-2xl"
              style={{
                background: "rgba(130,191,152,0.15)",
                border: "1px solid rgba(130,191,152,0.3)",
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: TOKENS.accent }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold mb-4">You're on the list!</h1>

              <p className="text-lg mb-6" style={{ opacity: 0.75 }}>
                Thanks for joining the VoicePilot waitlist, {formData.name.split(" ")[0]}.
                We'll be in touch soon as we roll out access.
              </p>

              <p className="text-sm mb-8" style={{ opacity: 0.6 }}>
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ background: TOKENS.dark, color: TOKENS.warm }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </main>

        <div className="relative z-10">
          <SharedFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: TOKENS.warm, color: TOKENS.dark }}>
      <GrainyOverlay />
      <Header />

      <main className="pt-10 pb-16 md:pt-16 md:pb-24 relative z-10">
        <div className="mx-auto max-w-xl px-6">
          {/* Phased Rollout Message */}
          <div
            className="p-4 rounded-xl mb-8 text-center"
            style={{
              background: "rgba(130,191,152,0.15)",
              border: "1px solid rgba(130,191,152,0.3)",
            }}
          >
            <p className="text-sm" style={{ opacity: 0.8 }}>
              VoicePilot is rolling out in phases to brokers and agents across California.
              Join the waitlist and we'll notify you when it's your turn.
            </p>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Join the Waitlist
            </h1>
            <p className="mt-3 text-lg" style={{ opacity: 0.7 }}>
              Tell us about yourself so we can get you set up.
            </p>
          </div>

          {/* Email Confirmation */}
          <div
            className="p-4 rounded-xl mb-8 flex items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: TOKENS.accent }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-50 mb-0.5">Email confirmed</p>
              <p className="font-medium">{formData.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <FormField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            {/* Brokerage */}
            <FormField
              label="Brokerage Name"
              name="brokerage"
              type="text"
              placeholder="e.g., Sunset Realty Group"
              value={formData.brokerage}
              onChange={handleChange}
              error={errors.brokerage}
              required
            />

            {/* DRE Number */}
            <FormField
              label="DRE License Number"
              name="dreNumber"
              type="text"
              placeholder="8-digit number (e.g., 01234567)"
              value={formData.dreNumber}
              onChange={handleChange}
              error={errors.dreNumber}
              required
              maxLength={8}
            />

            {/* Counties Multi-select */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                Counties You Work In <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountyDropdownOpen(!countyDropdownOpen)}
                  className="w-full h-12 px-4 rounded-xl text-sm text-left outline-none transition-all focus:ring-2 flex items-center justify-between"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: errors.counties ? "2px solid #ef4444" : "1px solid rgba(16,36,27,0.1)",
                    color: TOKENS.dark,
                  }}
                >
                  <span style={{ opacity: formData.counties.length ? 1 : 0.5 }}>
                    {formData.counties.length
                      ? `${formData.counties.length} ${formData.counties.length === 1 ? "county" : "counties"} selected`
                      : "Select counties (click to select multiple)"}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform ${countyDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {countyDropdownOpen && (
                  <div
                    className="absolute z-50 w-full mt-2 rounded-xl shadow-lg max-h-64 overflow-y-auto"
                    style={{
                      background: "rgba(255,255,255,0.98)",
                      border: "1px solid rgba(16,36,27,0.1)",
                    }}
                  >
                    <div className="p-2 border-b border-black/5 text-xs text-center" style={{ opacity: 0.6 }}>
                      Click to select multiple counties
                    </div>
                    {CALIFORNIA_COUNTIES.map((county) => (
                      <button
                        key={county}
                        type="button"
                        onClick={() => toggleCounty(county)}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-black/5 flex items-center justify-between"
                      >
                        <span>{county}</span>
                        {formData.counties.includes(county) && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {formData.counties.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.counties.map((county) => (
                    <span
                      key={county}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ background: TOKENS.accent, color: TOKENS.dark }}
                    >
                      {county}
                      <button type="button" onClick={() => toggleCounty(county)} className="hover:opacity-70">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.counties && <p className="mt-1 text-xs text-red-500">{errors.counties}</p>}
            </div>

            {/* Transactions */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                Transactions in Last 12 Months <span className="text-red-500">*</span>
              </label>
              <select
                name="transactions"
                value={formData.transactions}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 appearance-none cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: errors.transactions ? "2px solid #ef4444" : "1px solid rgba(16,36,27,0.1)",
                  color: TOKENS.dark,
                }}
              >
                <option value="">Select range...</option>
                {TRANSACTION_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.transactions && <p className="mt-1 text-xs text-red-500">{errors.transactions}</p>}
            </div>

            {/* Sales */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
                Sales Volume in Last 12 Months <span className="text-red-500">*</span>
              </label>
              <select
                name="sales"
                value={formData.sales}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2 appearance-none cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: errors.sales ? "2px solid #ef4444" : "1px solid rgba(16,36,27,0.1)",
                  color: TOKENS.dark,
                }}
              >
                <option value="">Select range...</option>
                {SALES_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.sales && <p className="mt-1 text-xs text-red-500">{errors.sales}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full text-base font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] mt-8 flex items-center justify-center gap-2"
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
                  Join the Waitlist
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-center" style={{ opacity: 0.5 }}>
            By joining, you agree to receive updates about VoicePilot. We won't spam you.
          </p>
        </div>
      </main>

      <div className="relative z-10">
        <SharedFooter />
      </div>
    </div>
  );
}

/* Helper Components */

function GrainyOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        mixBlendMode: "overlay",
      }}
    />
  );
}

function Header() {
  return (
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
            to="/CARpartnership"
            className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            C.A.R. + Ethica
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
      </div>
    </header>
  );
}

function FormField({ label, name, type, placeholder, value, onChange, error, required, maxLength }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ opacity: 0.8 }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-all focus:ring-2"
        style={{
          background: "rgba(255,255,255,0.8)",
          border: error ? "2px solid #ef4444" : "1px solid rgba(16,36,27,0.1)",
          color: TOKENS.dark,
        }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
