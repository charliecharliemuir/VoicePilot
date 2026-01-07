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
    id: "counter",
    label: "Handle counter-offer",
    category: "Advisory",
    userMessage: "The seller countered at $875,000. What are my options?",
    assistantResponse: "You have three main paths: (1) Accept at $875K — that's 2.9% above your offer, well within typical negotiation range. (2) Counter back — market data shows similar homes closed at $860K median, giving you leverage. (3) Walk away if it exceeds your client's ceiling. Want me to draft a counter at $865K with a quick-close incentive?",
    insight: { type: "analysis", label: "Counter-offer strategy" },
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
    id: "emd",
    label: "EMD guidance",
    category: "Knowledge",
    userMessage: "What's a typical EMD in California?",
    assistantResponse: "In California, earnest money deposits typically range from 1-3% of purchase price. For a $875K home, that's $8,750 to $26,250. Competitive markets often see 3%+. Your current transaction has 3% ($13,500) — right in the sweet spot for showing serious intent without overcommitting.",
    insight: { type: "knowledge", label: "CA market insight" },
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

    // Trigger listening animation
    setIsListening(true);
    setPulseKey((k) => k + 1);

    // Add user message after a brief "listening" delay
    await new Promise((r) => setTimeout(r, 800));
    setIsListening(false);

    setMessages((prev) => [...prev, { role: "user", content: scenario.userMessage }]);
    setUsedScenarios((prev) => [...prev, scenario.id]);

    // Simulate AI processing
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    setIsTyping(false);

    // Add assistant response
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: scenario.assistantResponse, structuredData: scenario.structuredData },
    ]);

    // Update transaction data
    setTransactionData((prev) => ({ ...prev, ...scenario.structuredData }));
  };

  const handleAdvisoryClick = async (scenario) => {
    if (usedAdvisory.includes(scenario.id) || isTyping) return;

    // Trigger listening animation
    setIsListening(true);
    setPulseKey((k) => k + 1);

    // Add user message after a brief "listening" delay
    await new Promise((r) => setTimeout(r, 800));
    setIsListening(false);

    setMessages((prev) => [...prev, { role: "user", content: scenario.userMessage }]);
    setUsedAdvisory((prev) => [...prev, scenario.id]);

    // Simulate AI processing - advisory takes a bit longer (more "thinking")
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    setIsTyping(false);

    // Add assistant response with insight badge
    setMessages((prev) => [
      ...prev,
      { 
        role: "assistant", 
        content: scenario.assistantResponse, 
        structuredData: scenario.structuredData,
        insight: scenario.insight,
      },
    ]);

    // Update transaction data if any
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
  };

  const availableScenarios = DEMO_SCENARIOS.filter((s) => !usedScenarios.includes(s.id));
  const nextScenario = DEMO_SCENARIOS.find((s) => !usedScenarios.includes(s.id));
  const availableAdvisory = ADVISORY_SCENARIOS.filter((s) => !usedAdvisory.includes(s.id));
  
  // Combine all available prompts into one unified list
  const allAvailablePrompts = [
    ...availableScenarios.map(s => ({ ...s, type: 'transaction' })),
    ...availableAdvisory.map(s => ({ ...s, type: 'advisory' })),
  ];
  const hasMorePrompts = allAvailablePrompts.length > 0;
  const totalUsed = usedScenarios.length + usedAdvisory.length;

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
              height: "460px",
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

              {usedScenarios.length > 0 && (
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
                <MessageBubble key={idx} message={msg} />
              ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Scenario buttons / Input area */}
            <div
              className="px-5 py-3"
              style={{ borderTop: "1px solid rgba(16,36,27,0.06)", background: "rgba(244,240,233,0.5)" }}
            >
              {hasMorePrompts ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[10px] opacity-50 font-medium tracking-wide uppercase">Try saying:</p>
                  {/* Show mix of transaction and advisory prompts */}
                  {allAvailablePrompts.slice(0, 3).map((scenario, idx) => {
                    const isTransaction = scenario.type === 'transaction';
                    const isFirst = idx === 0;
                    
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => isTransaction ? handleScenarioClick(scenario) : handleAdvisoryClick(scenario)}
                        disabled={isTyping || isListening}
                        className="group relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: isFirst ? TOKENS.accent : "rgba(16,36,27,0.06)",
                          color: isFirst ? "white" : TOKENS.dark,
                          boxShadow: isFirst ? "0 4px 12px rgba(130,191,152,0.3)" : "none",
                        }}
                      >
                        <span className="flex items-center gap-1.5">
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

          {/* Listening overlay */}
          {isListening && <ListeningOverlay key={pulseKey} />}
        </div>

        {/* Transaction Form - Right side */}
        <div className="lg:col-span-2" style={{ height: "460px" }}>
          <TransactionSummary data={transactionData} hasData={Object.keys(transactionData).length > 0} />
        </div>
      </div>
    </div>
  );
}

// Icons for different advisory categories
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
  };
  return iconMap[category] || iconMap.Advisory;
}

// Insight badge colors based on type
const INSIGHT_STYLES = {
  analysis: { bg: "rgba(99,102,241,0.12)", color: "#6366f1", border: "rgba(99,102,241,0.2)" },
  form: { bg: "rgba(130,191,152,0.12)", color: "#059669", border: "rgba(130,191,152,0.2)" },
  knowledge: { bg: "rgba(245,158,11,0.12)", color: "#d97706", border: "rgba(245,158,11,0.2)" },
  timeline: { bg: "rgba(236,72,153,0.12)", color: "#db2777", border: "rgba(236,72,153,0.2)" },
};

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[85%] ${isUser ? "order-1" : "order-2"}`}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Insight badge - shows above assistant messages for advisory responses */}
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
        {/* Pulsing rings */}
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
        {/* Center mic icon */}
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

// Form field definitions for the transaction form
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
  
  // Track which fields were just added for animation
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
              {/* Section Header */}
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
              
              {/* Section Fields */}
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
                      {/* Shimmer effect on fill */}
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
          0% { 
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.02);
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
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

