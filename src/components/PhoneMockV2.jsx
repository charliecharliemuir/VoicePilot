// PhoneMockV2 - Scrollable iPhone 17 Pro component
import React, { useRef, useState, useEffect } from "react";

const TOKENS = {
  dark: "#10241B",
  accent: "#82BF98",
  soft: "#C8E3D2",
  warm: "#F4F0E9",
};

export default function PhoneMockV2() {
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (showScrollHint) setShowScrollHint(false);
  };

  return (
    <div className="relative">
      {/* Subtle glow behind phone */}
      <div 
        className="absolute inset-0 rounded-[48px] blur-3xl opacity-20"
        style={{ background: TOKENS.accent, transform: "scale(0.9) translateY(20px)" }}
      />
      
      {/* Phone frame - iPhone 17 Pro proportions */}
      <div
        className="relative rounded-[44px] p-[10px]"
        style={{
          background: TOKENS.dark,
          boxShadow: "0 30px 60px rgba(16,36,27,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset",
          width: "280px",
        }}
      >
        {/* Screen */}
        <div
          className="rounded-[34px] overflow-hidden relative"
          style={{ 
            background: TOKENS.warm,
            height: "580px",
          }}
        >
          {/* Status bar with Dynamic Island - All on same line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[48px] flex items-center justify-between pl-7 pr-5 z-20"
            style={{ color: TOKENS.dark, background: TOKENS.warm }}
          >
            {/* Left side - Time */}
            <span className="text-[15px] font-semibold">9:41</span>
            
            {/* Center - Dynamic Island (thinner) */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[100px] h-[28px] rounded-full flex items-center justify-center gap-2"
              style={{ background: TOKENS.dark }}
            >
              <div className="w-[8px] h-[8px] rounded-full" style={{ background: "#1d1d1f" }} />
              <div className="w-[10px] h-[10px] rounded-full" style={{ background: "#1d1d1f" }} />
            </div>
            
            {/* Right side - Signal + Battery only */}
            <div className="flex items-center gap-[6px]">
              {/* Signal bars */}
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="0.5"/>
                <rect x="4.5" y="4" width="3" height="7" rx="0.5"/>
                <rect x="9" y="1" width="3" height="10" rx="0.5"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.3"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-[25px] h-[12px] rounded-[4px] border-[1.5px] border-current flex items-center p-[2px]">
                  <div className="h-full w-[80%] rounded-[2px]" style={{ background: TOKENS.dark }} />
                </div>
                <div className="w-[1.5px] h-[5px] rounded-r-sm" style={{ background: TOKENS.dark, opacity: 0.5 }} />
              </div>
            </div>
          </div>

          {/* Scrollable App content */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto scrollbar-hide pt-[48px]"
            style={{ 
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="px-4 pb-8 flex flex-col min-h-full">
              {/* App header */}
              <div className="py-4 text-center">
                <p className="text-[11px] opacity-40 tracking-wide font-medium">VoicePilot</p>
                <p className="text-[17px] font-semibold mt-1" style={{ fontFamily: '"TWK Lausanne", system-ui', letterSpacing: "-0.02em" }}>
                  New Transaction
                </p>
              </div>

              {/* Chat messages - Extended for scrolling */}
              <div className="flex-1 space-y-2.5 mt-2">
                <ChatBubble role="user">
                  Create a buyer transaction for 123 Maple Street, San Francisco.
                </ChatBubble>

                <ChatBubble role="assistant">
                  Got it! I've captured the property address and set this as a buyer-side transaction. Who are the buyers?
                </ChatBubble>

                <ChatBubble role="user">
                  John and Sarah Chen.
                </ChatBubble>

                <ChatBubble role="assistant" highlight>
                  I'll set the acceptance date to today. Please confirm this is correct.
                </ChatBubble>

                <ChatBubble role="user">
                  Yes, that's correct. Acceptance is today.
                </ChatBubble>

                <ChatBubble role="assistant">
                  Perfect! I've confirmed the acceptance date as January 6, 2026. What's the purchase price?
                </ChatBubble>

                <ChatBubble role="user">
                  $1.2 million with a 3% deposit.
                </ChatBubble>

                <ChatBubble role="assistant" highlight>
                  Got it! Purchase price: $1,200,000. Deposit: $36,000 (3%). Deposit due in 3 days by January 9th.
                </ChatBubble>

                <ChatBubble role="user">
                  Add a 17-day inspection contingency.
                </ChatBubble>

                <ChatBubble role="assistant">
                  Added! Inspection contingency expires January 23, 2026. I'll add this to your timeline.
                </ChatBubble>
              </div>

              {/* Timeline preview */}
              <div
                className="mt-4 p-3.5 rounded-2xl text-[11px]"
                style={{ background: "rgba(255,255,255,0.75)", boxShadow: "0 2px 8px rgba(16,36,27,0.06)" }}
              >
                <p className="font-semibold opacity-50 mb-2.5 tracking-wide text-[10px] uppercase">Timeline</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]" style={{ background: TOKENS.accent }}>✓</span>
                    <span>Acceptance — Today</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: TOKENS.accent }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] border-2" style={{ borderColor: TOKENS.accent }}>●</span>
                    <span className="font-medium">Deposit due — Jan 9</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] border border-current">○</span>
                    <span>Inspection — Jan 23</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] border border-current">○</span>
                    <span>Loan contingency — Pending</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] border border-current">○</span>
                    <span>Closing — Pending</span>
                  </div>
                </div>
              </div>

              {/* Transaction Summary Card */}
              <div
                className="mt-3 p-3.5 rounded-2xl text-[11px]"
                style={{ background: "rgba(130,191,152,0.15)", boxShadow: "0 2px 8px rgba(16,36,27,0.04)" }}
              >
                <p className="font-semibold opacity-50 mb-2.5 tracking-wide text-[10px] uppercase">Transaction Summary</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="opacity-60">Property</span>
                    <span className="font-medium">123 Maple St, SF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Buyers</span>
                    <span className="font-medium">John & Sarah Chen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Price</span>
                    <span className="font-medium">$1,200,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Deposit</span>
                    <span className="font-medium">$36,000 (3%)</span>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div
                className="mt-3 flex items-center gap-2.5 p-2.5 rounded-full sticky bottom-2"
                style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 12px rgba(16,36,27,0.1)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: TOKENS.accent }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  </svg>
                </div>
                <span className="text-[12px] opacity-35">Tap to speak...</span>
              </div>

              {/* Home indicator */}
              <div className="flex justify-center mt-3 pb-1">
                <div className="w-[120px] h-[5px] rounded-full" style={{ background: "rgba(16,36,27,0.15)" }} />
              </div>
            </div>
          </div>

          {/* Scroll hint overlay */}
          {showScrollHint && (
            <div 
              className="absolute bottom-20 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[10px] font-medium animate-bounce"
              style={{ background: TOKENS.dark, color: TOKENS.warm }}
            >
              ↓ Scroll to see more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ role, children, highlight }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[82%] px-3.5 py-2.5 text-[12px] leading-relaxed"
        style={{
          background: isUser
            ? TOKENS.dark
            : highlight
              ? TOKENS.soft
              : "rgba(255,255,255,0.85)",
          color: isUser ? TOKENS.warm : TOKENS.dark,
          borderRadius: isUser ? "18px 18px 6px 18px" : "18px 18px 18px 6px",
          boxShadow: isUser ? "none" : "0 1px 4px rgba(16,36,27,0.06)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

