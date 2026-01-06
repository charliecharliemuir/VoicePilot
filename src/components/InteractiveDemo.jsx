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

export default function InteractiveDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm VoicePilot. Tap one of the prompts below to see how I help you manage real estate transactions through natural conversation.",
      isIntro: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [usedScenarios, setUsedScenarios] = useState([]);
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

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm VoicePilot. Tap one of the prompts below to see how I help you manage real estate transactions through natural conversation.",
        isIntro: true,
      },
    ]);
    setUsedScenarios([]);
    setTransactionData({});
    setIsTyping(false);
    setIsListening(false);
  };

  const availableScenarios = DEMO_SCENARIOS.filter((s) => !usedScenarios.includes(s.id));
  const nextScenario = DEMO_SCENARIOS.find((s) => !usedScenarios.includes(s.id));

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-5 items-start">
        {/* Main demo container - Left side */}
        <div className="lg:col-span-2 relative">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 20px 60px rgba(16,36,27,0.12), 0 0 0 1px rgba(16,36,27,0.04)",
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
                <div>
                  <p className="text-sm font-semibold" style={{ color: TOKENS.dark }}>VoicePilot Demo</p>
                  <p className="text-xs opacity-50">Interactive experience</p>
                </div>
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
              className="p-5 space-y-4 overflow-y-auto"
              style={{ height: "340px", scrollbarWidth: "thin" }}
            >
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Scenario buttons / Input area */}
            <div
              className="px-5 py-4"
              style={{ borderTop: "1px solid rgba(16,36,27,0.06)", background: "rgba(244,240,233,0.5)" }}
            >
              {availableScenarios.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs opacity-50 font-medium tracking-wide uppercase">Try saying:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableScenarios.slice(0, 3).map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => handleScenarioClick(scenario)}
                        disabled={isTyping || isListening}
                        className="group relative px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: scenario === nextScenario ? TOKENS.accent : "rgba(16,36,27,0.06)",
                          color: scenario === nextScenario ? "white" : TOKENS.dark,
                          boxShadow: scenario === nextScenario ? "0 4px 12px rgba(130,191,152,0.3)" : "none",
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          </svg>
                          "{scenario.label}"
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: TOKENS.soft }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span style={{ color: TOKENS.dark }}>Demo complete!</span>
                  </div>
                  <p className="text-xs opacity-50 mt-3">
                    You've seen how VoicePilot captures transaction details through conversation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Listening overlay */}
          {isListening && <ListeningOverlay key={pulseKey} />}
        </div>

        {/* Transaction summary card - Right side */}
        <div className="lg:col-span-1">
          <TransactionSummary data={transactionData} hasData={Object.keys(transactionData).length > 0} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[85%] ${isUser ? "order-1" : "order-2"}`}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <div
          className="px-4 py-3 text-sm leading-relaxed"
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

function TransactionSummary({ data, hasData }) {
  return (
    <div
      className="p-4 rounded-2xl transition-all duration-500"
      style={{
        background: hasData 
          ? "linear-gradient(135deg, rgba(130,191,152,0.12), rgba(200,227,210,0.15))"
          : "rgba(16,36,27,0.03)",
        border: hasData 
          ? "1px solid rgba(130,191,152,0.2)"
          : "1px dashed rgba(16,36,27,0.1)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ 
            background: hasData ? TOKENS.accent : "rgba(16,36,27,0.08)",
          }}
        >
          {hasData ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2" opacity="0.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          )}
        </div>
        <p className="text-[11px] font-semibold tracking-wide uppercase opacity-50">
          {hasData ? "Captured" : "Transaction Data"}
        </p>
      </div>

      {hasData ? (
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(data).map(([key, value], idx) => (
            <div 
              key={key} 
              className="flex flex-col px-2.5 py-2 rounded-lg transition-all duration-300"
              style={{ 
                background: "rgba(255,255,255,0.5)",
                animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`,
              }}
            >
              <span className="text-[9px] uppercase tracking-wider opacity-40 font-medium">{key}</span>
              <span className="text-[11px] font-medium leading-tight mt-0.5" style={{ color: TOKENS.dark }}>{value}</span>
            </div>
          ))}
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      ) : (
        <div className="flex items-center gap-3 py-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(16,36,27,0.04)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="1.5" opacity="0.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium opacity-30">No data yet</p>
            <p className="text-[10px] opacity-20 mt-0.5">Try the prompts on the left</p>
          </div>
        </div>
      )}
    </div>
  );
}

