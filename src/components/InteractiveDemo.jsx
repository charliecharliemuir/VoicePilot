// InteractiveDemo - Interactive VoicePilot experience component
import React, { useState, useRef, useEffect } from "react";

const TOKENS = {
  dark: "#10241B",
  accent: "#82BF98",
  soft: "#C8E3D2",
  warm: "#F4F0E9",
};

// Pre-scripted conversation scenarios users can trigger
const DEMO_SCENARIOS = [
  {
    id: "property",
    label: "Add property",
    userMessage: "Start a new transaction for 742 Evergreen Terrace, Springfield",
    assistantResponse: "Got it! I've created a new transaction for 742 Evergreen Terrace, Springfield. What type of transaction is this — buyer or seller side?",
    structuredData: { property: "742 Evergreen Terrace, Springfield", status: "Created" },
  },
  {
    id: "buyers",
    label: "Add buyers",
    userMessage: "This is a buyer transaction for Homer and Marge Simpson",
    assistantResponse: "Perfect! I've set this as a buyer-side transaction with Homer and Marge Simpson as the buyers. What's the purchase price?",
    structuredData: { buyers: "Homer & Marge Simpson", side: "Buyer" },
  },
  {
    id: "price",
    label: "Set price",
    userMessage: "Purchase price is $450,000 with a 3% earnest money deposit",
    assistantResponse: "Got it! Purchase price: $450,000. Earnest money deposit: $13,500 (3%). When is the acceptance date?",
    structuredData: { price: "$450,000", deposit: "$13,500 (3%)" },
  },
  {
    id: "timeline",
    label: "Set dates",
    userMessage: "Acceptance is today. Add a 10-day inspection and 21-day financing contingency",
    assistantResponse: "Perfect! I've set today as the acceptance date and added your contingencies. Inspection expires January 16, financing contingency expires January 27. I'll add these to your timeline.",
    structuredData: { acceptance: "Jan 6, 2026", inspection: "Jan 16", financing: "Jan 27" },
  },
];

// Advisory & conversational scenarios - showcasing AI intelligence
const ADVISORY_SCENARIOS = [
  {
    id: "compare",
    label: "Compare two offers",
    category: "Comparison",
    userMessage: "I have two offers on the table. Can you compare them?",
    assistantResponse: "I've pulled up both offers for comparison. Here's a side-by-side breakdown:",
    insight: { type: "analysis", label: "Offer comparison" },
    showComparison: true,
  },
  {
    id: "counter",
    label: "Counter the offer",
    category: "Advisory",
    userMessage: "I want to counter Offer A. What should I propose for inspection days?",
    assistantResponse: "Based on market data, 10-14 day inspections are typical for this area. The buyer offered 17 days — you could counter at 12 days for a faster timeline. Use the slider to set your preferred inspection period:",
    insight: { type: "analysis", label: "Counter-offer strategy" },
    showCounter: true,
  },
  {
    id: "contingency",
    label: "Add contingency",
    category: "Form Update",
    userMessage: "Add a 17-day inspection contingency to the offer",
    assistantResponse: "Done! I've added a 17-day inspection contingency. Based on your acceptance date, that sets the inspection deadline to January 23rd. I've also flagged this on your timeline with a reminder 3 days before expiration.",
    structuredData: { inspection: "Jan 23 (17 days)" },
    insight: { type: "form", label: "Contingency added" },
  },
  {
    id: "deadlines",
    label: "Track deadlines",
    category: "Timeline",
    userMessage: "What deadlines should I track for this escrow?",
    assistantResponse: "For this transaction, here are your critical dates: Inspection contingency (Jan 16) — 9 days away. Financing contingency (Jan 27) — 20 days. Appraisal typically due 21 days from acceptance. Final walkthrough 3-5 days before close. Want me to set up automatic reminders for these?",
    insight: { type: "timeline", label: "4 key deadlines" },
  },
];

// Sample offer data for comparison
const OFFER_DATA = {
  offerA: {
    name: "Offer A",
    buyer: "Johnson Family",
    price: 875000,
    emd: 26250,
    emdPercent: 3,
    inspectionDays: 17,
    financingDays: 21,
    closeDate: "Feb 15, 2026",
    preApproval: true,
    escalation: false,
    notes: "Flexible on close date",
  },
  offerB: {
    name: "Offer B",
    buyer: "Tech Corp LLC",
    price: 860000,
    emd: 34400,
    emdPercent: 4,
    inspectionDays: 10,
    financingDays: 14,
    closeDate: "Feb 1, 2026",
    preApproval: true,
    escalation: true,
    notes: "Cash-ready, quick close",
  },
};

// Counter offer timeline data
const COUNTER_TIMELINE = [
  { date: "Jan 6", event: "Original Offer A", price: "$850,000", type: "buyer" },
  { date: "Jan 8", event: "Your Counter #1", price: "$890,000", type: "seller" },
  { date: "Jan 10", event: "Buyer Counter #2", price: "$875,000", type: "buyer" },
  { date: "Now", event: "Your Response", price: "Pending", type: "pending" },
];

export default function InteractiveDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Ethica. What would you like to do today?",
      isIntro: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [usedScenarios, setUsedScenarios] = useState([]);
  const [usedAdvisory, setUsedAdvisory] = useState([]);
  const [transactionData, setTransactionData] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [counterInspectionDays, setCounterInspectionDays] = useState(14);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleScenarioClick = async (scenario) => {
    if (usedScenarios.includes(scenario.id) || isTyping) return;

    setIsListening(true);
    setPulseKey((k) => k + 1);

    await new Promise((r) => setTimeout(r, 800));
    setIsListening(false);

    setMessages((prev) => [...prev, { role: "user", content: scenario.userMessage }]);
    setUsedScenarios((prev) => [...prev, scenario.id]);

    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    setIsTyping(false);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: scenario.assistantResponse, structuredData: scenario.structuredData },
    ]);

    setTransactionData((prev) => ({ ...prev, ...scenario.structuredData }));
  };

  const handleAdvisoryClick = async (scenario) => {
    if (usedAdvisory.includes(scenario.id) || isTyping) return;

    setIsListening(true);
    setPulseKey((k) => k + 1);

    await new Promise((r) => setTimeout(r, 800));
    setIsListening(false);

    setMessages((prev) => [...prev, { role: "user", content: scenario.userMessage }]);
    setUsedAdvisory((prev) => [...prev, scenario.id]);

    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setIsTyping(false);

    setMessages((prev) => [
      ...prev,
      { 
        role: "assistant", 
        content: scenario.assistantResponse, 
        structuredData: scenario.structuredData,
        insight: scenario.insight,
        showComparison: scenario.showComparison,
        showCounter: scenario.showCounter,
      },
    ]);

    if (scenario.structuredData) {
      setTransactionData((prev) => ({ ...prev, ...scenario.structuredData }));
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm Ethica. What would you like to do today?",
        isIntro: true,
      },
    ]);
    setUsedScenarios([]);
    setUsedAdvisory([]);
    setTransactionData({});
    setIsTyping(false);
    setIsListening(false);
    setCounterInspectionDays(14);
  };

  const availableScenarios = DEMO_SCENARIOS.filter((s) => !usedScenarios.includes(s.id));
  const availableAdvisory = ADVISORY_SCENARIOS.filter((s) => !usedAdvisory.includes(s.id));
  
  const allAvailablePrompts = [
    ...availableScenarios.map(s => ({ ...s, type: 'transaction' })),
    ...availableAdvisory.map(s => ({ ...s, type: 'advisory' })),
  ];
  const hasMorePrompts = allAvailablePrompts.length > 0;

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-5 items-start">
        {/* Main demo container - Left side */}
        <div className="lg:col-span-3 relative">
          <div
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 20px 60px rgba(16,36,27,0.12), 0 0 0 1px rgba(16,36,27,0.04)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(16,36,27,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${TOKENS.accent}, ${TOKENS.soft})` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: TOKENS.dark }}>Ethica</p>
              </div>

              {(usedScenarios.length > 0 || usedAdvisory.length > 0) && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
                  style={{ background: "rgba(16,36,27,0.06)", color: TOKENS.dark }}
                >
                  Reset ↺
                </button>
              )}
            </div>

            {/* Messages area */}
            <div
              ref={containerRef}
              className="p-5 space-y-4 overflow-y-auto flex-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg, idx) => (
                <MessageBubble 
                  key={idx} 
                  message={msg} 
                  inspectionDays={counterInspectionDays}
                  onInspectionChange={setCounterInspectionDays}
                />
              ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Scenario buttons */}
            <div
              className="px-5 py-3"
              style={{ borderTop: "1px solid rgba(16,36,27,0.06)", background: "rgba(244,240,233,0.5)" }}
            >
              {hasMorePrompts ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[10px] opacity-50 font-medium tracking-wide uppercase">Try saying:</p>
                  {allAvailablePrompts.slice(0, 3).map((scenario, idx) => {
                    const isTransaction = scenario.type === 'transaction';
                    const isFirst = idx === 0;
                    
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => isTransaction ? handleScenarioClick(scenario) : handleAdvisoryClick(scenario)}
                        disabled={isTyping || isListening}
                        className={`group relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${isFirst ? 'demo-pulse-hint' : ''}`}
                        style={{
                          background: isFirst ? TOKENS.accent : "rgba(16,36,27,0.06)",
                          color: isFirst ? "white" : TOKENS.dark,
                          boxShadow: isFirst ? "0 4px 12px rgba(130,191,152,0.3)" : "none",
                        }}
                      >
                        {isFirst && (
                          <span className="absolute inset-0 rounded-xl animate-demo-ping" style={{ background: TOKENS.accent }} />
                        )}
                        <span className="relative flex items-center gap-1.5">
                          {isTransaction ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
                              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            </svg>
                          ) : (
                            <CategoryIcon category={scenario.category} />
                          )}
                          "{scenario.label}"
                        </span>
                      </button>
                    );
                  })}
                  <style>{`
                    @keyframes demo-ping {
                      0% { transform: scale(1); opacity: 0.5; }
                      75%, 100% { transform: scale(1.15); opacity: 0; }
                    }
                    .animate-demo-ping {
                      animation: demo-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    }
                  `}</style>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: TOKENS.accent }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: TOKENS.dark }}>One conversation. Zero forms. Full control.</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
                    style={{ background: "rgba(16,36,27,0.06)", color: TOKENS.dark }}
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>

          {isListening && <ListeningOverlay key={pulseKey} />}
        </div>

        {/* Right Panel - Transaction Form */}
        <div className="lg:col-span-2" style={{ height: "520px" }}>
          <TransactionSummary data={transactionData} hasData={Object.keys(transactionData).length > 0} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// INLINE COMPARISON CHART (in chat)
// ============================================

function InlinComparisonChart() {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const offerA = OFFER_DATA.offerA;
  const offerB = OFFER_DATA.offerB;

  const compareFields = [
    { label: "Price", keyA: formatCurrency(offerA.price), keyB: formatCurrency(offerB.price), better: offerA.price > offerB.price ? "A" : "B" },
    { label: "EMD", keyA: `${formatCurrency(offerA.emd)} (${offerA.emdPercent}%)`, keyB: `${formatCurrency(offerB.emd)} (${offerB.emdPercent}%)`, better: offerB.emdPercent > offerA.emdPercent ? "B" : "A" },
    { label: "Inspection", keyA: `${offerA.inspectionDays} days`, keyB: `${offerB.inspectionDays} days`, better: offerA.inspectionDays > offerB.inspectionDays ? "B" : "A" },
    { label: "Financing", keyA: `${offerA.financingDays} days`, keyB: `${offerB.financingDays} days`, better: offerA.financingDays > offerB.financingDays ? "B" : "A" },
    { label: "Close Date", keyA: offerA.closeDate, keyB: offerB.closeDate, better: null },
    { label: "Pre-Approval", keyA: offerA.preApproval ? "Yes" : "No", keyB: offerB.preApproval ? "Yes" : "No", better: null },
    { label: "Escalation", keyA: offerA.escalation ? "Yes" : "No", keyB: offerB.escalation ? "Yes" : "No", better: offerB.escalation ? "B" : null },
  ];

  return (
    <div 
      className="mt-3 rounded-2xl overflow-hidden"
      style={{ 
        background: "white",
        border: `1px solid rgba(16,36,27,0.08)`,
        boxShadow: "0 4px 12px rgba(16,36,27,0.06)",
      }}
    >
      {/* Header */}
      <div 
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: TOKENS.dark }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TOKENS.soft} strokeWidth="2">
          <rect x="2" y="3" width="8" height="18" rx="1" />
          <rect x="14" y="3" width="8" height="18" rx="1" />
        </svg>
        <span className="text-xs font-semibold text-white">Offer Comparison</span>
      </div>

      {/* Offer Labels */}
      <div className="grid grid-cols-3 gap-1 px-3 pt-3 pb-2">
        <div className="text-[9px] font-medium uppercase tracking-wider opacity-40 pl-1">Field</div>
        <div 
          className="text-center py-1.5 px-2 rounded-lg"
          style={{ background: `rgba(16,36,27,0.04)` }}
        >
          <p className="text-[10px] font-bold" style={{ color: TOKENS.dark }}>Offer A</p>
          <p className="text-[8px] opacity-50">{offerA.buyer}</p>
        </div>
        <div 
          className="text-center py-1.5 px-2 rounded-lg"
          style={{ background: `rgba(130,191,152,0.1)` }}
        >
          <p className="text-[10px] font-bold" style={{ color: TOKENS.dark }}>Offer B</p>
          <p className="text-[8px] opacity-50">{offerB.buyer}</p>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="px-3 pb-3 space-y-1">
        {compareFields.map((field, idx) => (
          <div 
            key={field.label}
            className="grid grid-cols-3 gap-1 items-center py-1.5 px-2 rounded-lg"
            style={{ background: idx % 2 === 0 ? "rgba(16,36,27,0.02)" : "transparent" }}
          >
            <span className="text-[10px] font-medium opacity-60">{field.label}</span>
            <div 
              className={`text-center text-[10px] font-semibold py-1 px-1.5 rounded-md`}
              style={{ 
                background: field.better === "A" ? `rgba(130,191,152,0.15)` : "transparent",
                color: field.better === "A" ? TOKENS.dark : TOKENS.dark,
              }}
            >
              {field.keyA}
              {field.better === "A" && <span className="ml-1" style={{ color: TOKENS.accent }}>✓</span>}
            </div>
            <div 
              className={`text-center text-[10px] font-semibold py-1 px-1.5 rounded-md`}
              style={{ 
                background: field.better === "B" ? `rgba(130,191,152,0.15)` : "transparent",
                color: field.better === "B" ? TOKENS.dark : TOKENS.dark,
              }}
            >
              {field.keyB}
              {field.better === "B" && <span className="ml-1" style={{ color: TOKENS.accent }}>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="px-3 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg" style={{ background: "rgba(16,36,27,0.03)" }}>
            <p className="text-[9px] font-semibold opacity-60">Offer A Note</p>
            <p className="text-[9px] opacity-50 mt-0.5">{offerA.notes}</p>
          </div>
          <div className="p-2 rounded-lg" style={{ background: "rgba(130,191,152,0.08)" }}>
            <p className="text-[9px] font-semibold opacity-60">Offer B Note</p>
            <p className="text-[9px] opacity-50 mt-0.5">{offerB.notes}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div 
        className="px-3 py-2.5 flex items-center gap-2"
        style={{ background: "rgba(244,240,233,0.6)", borderTop: "1px solid rgba(16,36,27,0.04)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="text-[10px] opacity-60">Offer A: higher price • Offer B: faster close, more EMD</span>
      </div>
    </div>
  );
}

// ============================================
// INLINE COUNTER COMPONENT (in chat)
// ============================================

function InlineCounterComponent({ inspectionDays, onInspectionChange }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000);
  };

  return (
    <div 
      className="mt-3 rounded-2xl overflow-hidden"
      style={{ 
        background: "white",
        border: `1px solid rgba(16,36,27,0.08)`,
        boxShadow: "0 4px 12px rgba(16,36,27,0.06)",
      }}
    >
      {/* Header */}
      <div 
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: TOKENS.dark }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TOKENS.soft} strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span className="text-xs font-semibold text-white">Counter Offer Builder</span>
      </div>

      {/* Timeline */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(16,36,27,0.04)" }}>
        <p className="text-[9px] font-semibold uppercase tracking-wider opacity-40 mb-2">Negotiation Timeline</p>
        <div className="relative">
          <div 
            className="absolute left-[5px] top-2 bottom-2 w-0.5"
            style={{ background: "rgba(16,36,27,0.08)" }}
          />
          <div className="space-y-2">
            {COUNTER_TIMELINE.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 relative">
                <div 
                  className="w-3 h-3 rounded-full z-10 flex-shrink-0"
                  style={{ 
                    background: item.type === "seller" ? TOKENS.accent : 
                               item.type === "buyer" ? TOKENS.dark : 
                               item.type === "pending" ? TOKENS.soft : "#e5e7eb",
                    boxShadow: item.type === "pending" ? `0 0 0 2px rgba(200,227,210,0.4)` : "none",
                  }}
                />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium" style={{ color: TOKENS.dark }}>{item.event}</p>
                    <p 
                      className="text-[10px] font-bold"
                      style={{ 
                        color: item.type === "seller" ? TOKENS.accent : 
                               item.type === "pending" ? "rgba(16,36,27,0.4)" : TOKENS.dark,
                      }}
                    >
                      {item.price}
                    </p>
                  </div>
                  <span className="text-[9px] opacity-40">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspection Days Slider */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `rgba(130,191,152,0.15)` }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-semibold" style={{ color: TOKENS.dark }}>Inspection Period</p>
            <p className="text-[8px] opacity-50">Adjust your counter</p>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] opacity-40">Days</span>
            <span 
              className="text-base font-bold tabular-nums"
              style={{ color: TOKENS.accent }}
            >
              {inspectionDays}
            </span>
          </div>
          <input
            type="range"
            min="7"
            max="21"
            value={inspectionDays}
            onChange={(e) => onInspectionChange(parseInt(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ 
              background: `linear-gradient(to right, ${TOKENS.accent} ${((inspectionDays - 7) / 14) * 100}%, rgba(16,36,27,0.1) ${((inspectionDays - 7) / 14) * 100}%)`,
            }}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[8px] opacity-30">7 days</span>
            <span className="text-[8px] opacity-30">21 days</span>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="flex gap-1.5 mb-3">
          {[10, 12, 14, 17].map((days) => (
            <button
              key={days}
              onClick={() => onInspectionChange(days)}
              className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: inspectionDays === days ? TOKENS.dark : "rgba(16,36,27,0.05)",
                color: inspectionDays === days ? "white" : TOKENS.dark,
              }}
            >
              {days}d
            </button>
          ))}
        </div>

        {/* Tip */}
        <div 
          className="p-2 rounded-lg flex items-start gap-2"
          style={{ background: `rgba(130,191,152,0.08)` }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TOKENS.accent} strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-[9px]" style={{ color: TOKENS.dark, opacity: 0.7 }}>
            <span className="font-semibold">Tip:</span> Buyer offered 17 days. A 12-14 day counter is competitive.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: "rgba(244,240,233,0.6)", borderTop: "1px solid rgba(16,36,27,0.04)" }}
      >
        {showConfirm ? (
          <div className="flex items-center gap-2 flex-1 justify-center">
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: TOKENS.accent }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[10px] font-semibold" style={{ color: TOKENS.accent }}>Counter saved!</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="flex-1 h-8 rounded-lg text-[10px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: TOKENS.dark, color: "white" }}
            >
              Save Counter ({inspectionDays} days)
            </button>
            <button
              className="h-8 px-3 rounded-lg text-[10px] font-medium transition-all hover:scale-[1.02]"
              style={{ background: "rgba(16,36,27,0.05)" }}
            >
              Preview
            </button>
          </>
        )}
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${TOKENS.dark};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(16,36,27,0.15);
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${TOKENS.dark};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(16,36,27,0.15);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}

// ============================================
// EXISTING COMPONENTS
// ============================================

function CategoryIcon({ category }) {
  const iconMap = {
    Advisory: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    "Form Update": (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    Knowledge: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    Timeline: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    Comparison: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
        <rect x="2" y="3" width="8" height="18" rx="1" />
        <rect x="14" y="3" width="8" height="18" rx="1" />
      </svg>
    ),
  };
  return iconMap[category] || iconMap.Advisory;
}

const INSIGHT_STYLES = {
  analysis: { bg: "rgba(130,191,152,0.12)", color: TOKENS.dark, border: "rgba(130,191,152,0.25)" },
  form: { bg: "rgba(130,191,152,0.12)", color: TOKENS.dark, border: "rgba(130,191,152,0.25)" },
  knowledge: { bg: "rgba(16,36,27,0.08)", color: TOKENS.dark, border: "rgba(16,36,27,0.12)" },
  timeline: { bg: "rgba(200,227,210,0.3)", color: TOKENS.dark, border: "rgba(200,227,210,0.5)" },
};

function MessageBubble({ message, inspectionDays, onInspectionChange }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[90%] ${isUser ? "order-1" : "order-2"}`}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Insight badge */}
        {!isUser && message.insight && (
          <div className="mb-1.5 flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide"
              style={{
                background: INSIGHT_STYLES[message.insight.type]?.bg || INSIGHT_STYLES.analysis.bg,
                color: INSIGHT_STYLES[message.insight.type]?.color || INSIGHT_STYLES.analysis.color,
                border: `1px solid ${INSIGHT_STYLES[message.insight.type]?.border || INSIGHT_STYLES.analysis.border}`,
              }}
            >
              {message.insight.type === "analysis" && "💡"}
              {message.insight.type === "form" && "✓"}
              {message.insight.type === "knowledge" && "📚"}
              {message.insight.type === "timeline" && "📅"}
              {message.insight.label}
            </span>
          </div>
        )}

        <div
          className="px-4 py-3 text-sm leading-relaxed text-left"
          style={{
            background: isUser ? TOKENS.dark : message.isIntro ? TOKENS.soft : "white",
            color: isUser ? TOKENS.warm : TOKENS.dark,
            borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
            boxShadow: isUser ? "none" : "0 2px 8px rgba(16,36,27,0.06)",
          }}
        >
          {message.content}
        </div>

        {/* Comparison Chart - inline in chat */}
        {message.showComparison && <InlinComparisonChart />}

        {/* Counter Component - inline in chat */}
        {message.showCounter && (
          <InlineCounterComponent 
            inspectionDays={inspectionDays} 
            onInspectionChange={onInspectionChange} 
          />
        )}

        {/* Extracted data badge */}
        {message.structuredData && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Object.entries(message.structuredData).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium"
                style={{ background: "rgba(130,191,152,0.15)", color: TOKENS.dark }}
              >
                <span className="opacity-50">{key}:</span>
                <span>{value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="px-4 py-3 rounded-2xl"
        style={{ background: "white", boxShadow: "0 2px 8px rgba(16,36,27,0.06)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="typing-dot" style={{ animationDelay: "0ms" }} />
          <span className="typing-dot" style={{ animationDelay: "150ms" }} />
          <span className="typing-dot" style={{ animationDelay: "300ms" }} />
        </div>
        <style>{`
          .typing-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: ${TOKENS.accent};
            animation: typingBounce 1.2s infinite ease-in-out;
          }
          @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-6px); opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

function ListeningOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              background: TOKENS.accent,
              animation: `pulse-ring 1.5s ease-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
        <div
          className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: TOKENS.accent }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          </svg>
        </div>
        <style>{`
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

const FORM_FIELDS = [
  { key: "property", label: "Property Address", icon: "home", section: "property" },
  { key: "status", label: "Status", icon: "status", section: "property" },
  { key: "buyers", label: "Client Name(s)", icon: "users", section: "clients" },
  { key: "side", label: "Transaction Side", icon: "tag", section: "clients" },
  { key: "price", label: "Purchase Price", icon: "dollar", section: "financials" },
  { key: "deposit", label: "Earnest Money", icon: "wallet", section: "financials" },
  { key: "acceptance", label: "Acceptance Date", icon: "calendar", section: "timeline" },
  { key: "inspection", label: "Inspection Deadline", icon: "clock", section: "timeline" },
  { key: "financing", label: "Financing Deadline", icon: "clock", section: "timeline" },
];

const SECTIONS = [
  { id: "property", label: "Property", icon: "home" },
  { id: "clients", label: "Clients", icon: "users" },
  { id: "financials", label: "Financials", icon: "dollar" },
  { id: "timeline", label: "Timeline", icon: "calendar" },
];

function FieldIcon({ type, filled }) {
  const color = filled ? TOKENS.accent : "rgba(16,36,27,0.2)";
  const icons = {
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    status: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  };
  
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

function TransactionSummary({ data, hasData }) {
  const filledCount = Object.keys(data).length;
  const totalCount = FORM_FIELDS.length;
  const progressPercent = (filledCount / totalCount) * 100;
  
  const [prevData, setPrevData] = useState({});
  const [animatingFields, setAnimatingFields] = useState([]);
  
  useEffect(() => {
    const newKeys = Object.keys(data).filter(key => !prevData[key]);
    if (newKeys.length > 0) {
      setAnimatingFields(newKeys);
      setTimeout(() => setAnimatingFields([]), 600);
    }
    setPrevData(data);
  }, [data]);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px rgba(16,36,27,0.08), 0 0 0 1px rgba(16,36,27,0.04)",
      }}
    >
      {/* Form Header */}
      <div 
        className="px-4 py-3"
        style={{ 
          background: `linear-gradient(135deg, ${TOKENS.dark}, #1a3d2a)`,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TOKENS.soft} strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-white">Transaction Form</p>
          </div>
          <div 
            className="px-2 py-1 rounded-full text-[10px] font-medium"
            style={{ 
              background: hasData ? "rgba(130,191,152,0.2)" : "rgba(255,255,255,0.1)",
              color: hasData ? TOKENS.soft : "rgba(255,255,255,0.5)",
            }}
          >
            {filledCount}/{totalCount}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div 
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${progressPercent}%`,
              background: `linear-gradient(90deg, ${TOKENS.accent}, ${TOKENS.soft})`,
            }}
          />
        </div>
      </div>

      {/* Form Body */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {SECTIONS.map((section) => {
          const sectionFields = FORM_FIELDS.filter(f => f.section === section.id);
          const hasFilledField = sectionFields.some(f => data[f.key]);
          
          return (
            <div key={section.id}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <div 
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: hasFilledField ? "rgba(130,191,152,0.15)" : "rgba(16,36,27,0.04)",
                  }}
                >
                  <FieldIcon type={section.icon} filled={hasFilledField} />
                </div>
                <span 
                  className="text-[10px] font-semibold uppercase tracking-wider transition-all duration-300"
                  style={{ color: hasFilledField ? TOKENS.dark : "rgba(16,36,27,0.3)" }}
                >
                  {section.label}
                </span>
                {hasFilledField && (
                  <div className="ml-auto">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={TOKENS.accent} stroke="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="space-y-1.5">
                {sectionFields.map((field) => {
                  const value = data[field.key];
                  const isFilled = Boolean(value);
                  const isAnimating = animatingFields.includes(field.key);
                  
                  return (
                    <div
                      key={field.key}
                      className={`relative rounded-xl transition-all duration-300 overflow-hidden ${isAnimating ? 'form-field-enter' : ''}`}
                      style={{
                        background: isFilled ? "rgba(130,191,152,0.08)" : "rgba(16,36,27,0.02)",
                        border: isFilled ? "1px solid rgba(130,191,152,0.2)" : "1px dashed rgba(16,36,27,0.08)",
                      }}
                    >
                      {isAnimating && (
                        <div 
                          className="absolute inset-0 shimmer-effect"
                          style={{
                            background: `linear-gradient(90deg, transparent, rgba(130,191,152,0.3), transparent)`,
                          }}
                        />
                      )}
                      
                      <div className="px-3 py-2.5 relative z-10">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <FieldIcon type={field.icon} filled={isFilled} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <label 
                              className="block text-[9px] uppercase tracking-wider font-medium mb-0.5 transition-all duration-300"
                              style={{ color: isFilled ? TOKENS.dark : "rgba(16,36,27,0.35)" }}
                            >
                              {field.label}
                            </label>
                            {isFilled ? (
                              <p 
                                className="text-[12px] font-medium truncate transition-all duration-300"
                                style={{ color: TOKENS.dark }}
                              >
                                {value}
                              </p>
                            ) : (
                              <div 
                                className="h-4 rounded"
                                style={{ 
                                  background: "rgba(16,36,27,0.04)",
                                  width: "70%",
                                }}
                              />
                            )}
                          </div>
                          {isFilled && (
                            <div 
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                              style={{ background: TOKENS.accent }}
                            >
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Footer */}
      <div 
        className="px-4 py-3 flex items-center justify-between"
        style={{ 
          borderTop: "1px solid rgba(16,36,27,0.06)",
          background: "rgba(244,240,233,0.5)",
        }}
      >
        <div className="flex items-center gap-2">
          {progressPercent === 100 ? (
            <>
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: TOKENS.accent }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[11px] font-medium" style={{ color: TOKENS.dark }}>Form complete!</span>
            </>
          ) : (
            <>
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center animate-pulse"
                style={{ background: "rgba(130,191,152,0.2)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: TOKENS.accent }} />
              </div>
              <span className="text-[11px] opacity-50">Listening for more data...</span>
            </>
          )}
        </div>
        <div 
          className="text-[10px] font-medium px-2 py-1 rounded-md"
          style={{ 
            background: progressPercent === 100 ? "rgba(130,191,152,0.15)" : "transparent",
            color: progressPercent === 100 ? TOKENS.accent : "rgba(16,36,27,0.3)",
          }}
        >
          {Math.round(progressPercent)}% complete
        </div>
      </div>

      <style>{`
        .form-field-enter {
          animation: fieldEnter 0.5s ease-out;
        }
        @keyframes fieldEnter {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .shimmer-effect {
          animation: shimmer 0.6s ease-out;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
