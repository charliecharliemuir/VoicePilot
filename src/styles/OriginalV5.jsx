// ORIGINAL V5 - V3 base with video hero, no testimonials, minimal nav
import React, { useState, useEffect, useRef } from "react";
import { TOKENS, Icons, SharedFooter } from "./shared";
import InteractiveDemo from "../components/InteractiveDemo";

const VIDEO_URL = "https://files.catbox.moe/xg4wl5.mp4";

// Beautiful housing/lifestyle images from Unsplash
const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", // Modern home exterior
  secondary: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", // Luxury home
  accent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", // Beautiful house
};

const LIFESTYLE_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", // Keys handover
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", // Real estate agent
  "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80", // Happy couple with home
];

const SECTION_BACKGROUNDS_V3 = {
  hero: "#FFFBF5",
  preview: "#F8F5F0",
  trust: "#FFFBF5",
  how: "#FFFBF5",
  workflows: "#F8F5F0",
  compliance: "#F0EDE6",
  waitlist: TOKENS.dark,
  footer: TOKENS.dark,
};

export default function OriginalV5() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSectionBg, setCurrentSectionBg] = useState("#FFFBF5");
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

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
    // Always show the floating CTA
    setShowFloatingCTA(true);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#FFFBF5", color: TOKENS.dark }}>
      {/* Subtle organic texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.25,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Floating CTA */}
      <FloatingCTAV3 show={showFloatingCTA} backgroundColor={currentSectionBg} />
      
      {/* MINIMAL NAV */}
      <NavBarV5 />

      {/* HERO - Warm, inviting with lifestyle imagery */}
      <section ref={sectionRefs.hero} className="pt-6 pb-12 md:pt-10 md:pb-20 relative z-10 overflow-hidden hero-bounce-hint">
        <div className="mx-auto max-w-6xl px-6">
        <style>{`
          @keyframes hero-bounce-hint {
            0%, 100% { transform: translateY(0); }
            15% { transform: translateY(-12px); }
            30% { transform: translateY(0); }
            45% { transform: translateY(-6px); }
            60% { transform: translateY(0); }
          }
          .hero-bounce-hint {
            animation: hero-bounce-hint 1.5s ease-out 0.5s;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
          }
        `}</style>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content - friendly and conversational */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(130,191,152,0.15)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: TOKENS.accent }} />
                <span className="text-sm font-medium" style={{ color: TOKENS.dark }}>Now in California</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                Real Estate is conversational.<br />
                <span style={{ color: TOKENS.accent }}>So is Ethica.</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ opacity: 0.75, fontFamily: '"Source Sans 3", system-ui' }}>
                VoicePilot turns your natural conversations into organized transactions — so you can focus on clients, not forms.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="#waitlist">
                  <ButtonV3 variant="primary" size="lg">
                    Get Early Access
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </ButtonV3>
                </a>
                <a href="#how" className="text-sm font-medium flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={TOKENS.accent} stroke="none">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16" fill="white" />
                  </svg>
                  See how it works
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden" style={{ background: `hsl(${i * 60}, 40%, 85%)` }}>
                      <img 
                        src={`https://i.pravatar.cc/80?img=${i + 10}`} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">500+ agents</p>
                  <p className="text-xs opacity-60">already on the waitlist</p>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="relative order-1 lg:order-2">
              <VideoPlayerV5
                videoStarted={videoStarted}
                videoLoaded={videoLoaded}
                videoRef={videoRef}
                handlePlayVideo={handlePlayVideo}
              />
            </div>
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
   V3 COMPONENTS - Friendly, human-centric
========= */

function NavBarV5() {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-6 pb-4">
      <div
        className="mx-auto max-w-6xl rounded-full px-4 sm:px-6 h-16 flex items-center justify-between"
        style={{
          background: "white",
          border: "1px solid rgba(16,36,27,0.08)",
          boxShadow: "0 8px 32px rgba(16,36,27,0.08)",
        }}
      >
        <div className="flex items-baseline gap-2.5">
          <img src="/ethica-splash-high-res.png" alt="ethica" className="h-5 sm:h-6 translate-y-0.5" />
          <span className="opacity-90 hidden sm:inline" style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.35rem' }}>VoicePilot</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm" style={{ opacity: 0.7 }}>
          <img src="/car-logo.png" alt="C.A.R." className="h-16 rounded" />
          <span>Backed by the California Association of REALTORS®</span>
        </div>
      </div>
    </header>
  );
}

function VideoPlayerV5({ videoStarted, videoLoaded, videoRef, handlePlayVideo }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "560px" }}>
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        {!videoStarted ? (
          <button
            onClick={handlePlayVideo}
            className="w-full h-full relative group cursor-pointer"
            style={{ background: TOKENS.dark }}
          >
            {/* Thumbnail */}
            <img
              src="/video-thumbnail.png"
              alt="VoicePilot Demo"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all group-hover:bg-black/40"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              {/* Ethica logo - top left */}
              <img
                src="/ethica-splash-high-res.png"
                alt="Ethica"
                className="absolute top-4 left-4 h-6 opacity-90"
              />
              {/* Play button */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {videoLoaded ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill={TOKENS.dark}
                  >
                    <polygon points="8,5 20,12 8,19" />
                  </svg>
                ) : (
                  <div
                    className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: `${TOKENS.dark} transparent ${TOKENS.dark} ${TOKENS.dark}` }}
                  />
                )}
              </div>
            </div>
          </button>
        ) : (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            controls
            playsInline
            className="w-full h-full object-cover"
            style={{ background: TOKENS.dark }}
          />
        )}
      </div>
    </div>
  );
}

function ButtonV3({ children, variant = "primary", size = "md", className = "" }) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-7 text-base",
  };
  
  const variants = {
    primary: {
      background: TOKENS.dark,
      color: "#FFFBF5",
      boxShadow: "0 4px 14px rgba(16,36,27,0.2)",
    },
    secondary: {
      background: "transparent",
      color: TOKENS.dark,
      border: `2px solid ${TOKENS.accent}`,
    },
  };
  
  return (
    <button
      className={`rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center ${sizes[size]} ${className}`}
      style={variants[variant]}
      type="button"
    >
      {children}
    </button>
  );
}

function BadgeV3({ children }) {
  return (
    <span 
      className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
      style={{ background: "rgba(130,191,152,0.15)", color: TOKENS.dark }}
    >
      {children}
    </span>
  );
}

function StepCardV3({ number, title, description, icon }) {
  return (
    <div className="text-center group">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ background: "rgba(130,191,152,0.12)" }}
        >
          <div style={{ color: TOKENS.dark }}>{icon}</div>
        </div>
        <span 
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: TOKENS.accent, color: "white" }}
        >
          {number}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{title}</h3>
      <p className="text-base leading-relaxed" style={{ opacity: 0.7, fontFamily: '"Source Sans 3", system-ui' }}>{description}</p>
    </div>
  );
}

// Property listing images for the workflow demo
const LISTING_PHOTOS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", // Modern exterior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", // Front view
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", // Living room
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80", // Kitchen
];

const WORKFLOW_STEPS_V3 = [
  {
    id: 1,
    time: "9:00 AM",
    title: "New listing call",
    action: "Voice captured",
    description: "Talk through property details with your client — VoicePilot captures everything.",
    icon: "phone",
    preview: "123 Oak Street, 4bd/3ba, $850K asking...",
    hasPhotos: true,
  },
  {
    id: 2,
    time: "9:15 AM",
    title: "Transaction created",
    action: "Auto-structured",
    description: "Property, parties, and key terms extracted into a structured transaction.",
    icon: "file",
    preview: "Timeline generated • 12 disclosures identified",
  },
  {
    id: 3,
    time: "2:30 PM",
    title: "Offer received",
    action: "Terms compared",
    description: "Review competing offers side-by-side with AI-highlighted differences.",
    icon: "compare",
    preview: "$825K offer • 21-day close • 3% EMD",
  },
  {
    id: 4,
    time: "4:00 PM",
    title: "Counter drafted",
    action: "Ready to send",
    description: "Speak your counter terms — get a professional response drafted instantly.",
    icon: "edit",
    preview: "Counter at $840K, 17-day inspection...",
  },
];

function WorkflowsJourneyV3() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS_V3.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ background: "rgba(130,191,152,0.15)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: TOKENS.accent }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: TOKENS.accent }}></span>
          </span>
          <span className="text-sm font-medium">A day with VoicePilot</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
          Your workflow,{" "}
          <span className="relative">
            supercharged
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
              <path d="M2 6C50 2 150 2 198 6" stroke={TOKENS.accent} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Timeline */}
        <div className="relative">
          {/* Connecting line with progress indicator */}
          <div 
            className="absolute left-6 top-8 bottom-8 w-0.5 hidden md:block overflow-hidden"
            style={{ background: "rgba(16,36,27,0.08)" }}
          >
            {/* Active progress line */}
            <div 
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${((activeStep) / (WORKFLOW_STEPS_V3.length - 1)) * 100}%`,
                background: TOKENS.accent,
                transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
          
          <div className="space-y-3">
            {WORKFLOW_STEPS_V3.map((step, index) => (
              <WorkflowStepV3
                key={step.id}
                step={step}
                isActive={activeStep === index}
                isPast={index < activeStep}
                onClick={() => setActiveStep(index)}
                delay={index * 120}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Preview card */}
        <div className="relative">
          <WorkflowPreviewV3 
            step={WORKFLOW_STEPS_V3[activeStep]} 
            isVisible={isVisible}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes smoothFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes smoothSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes photoReveal {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .workflow-step-enter {
          animation: smoothFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .photo-gallery-item {
          animation: photoReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .preview-card-enter {
          animation: smoothSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

function WorkflowStepV3({ step, isActive, isPast, onClick, delay, isVisible }) {
  const accentColor = TOKENS.accent;
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive]);
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 md:pl-16 rounded-2xl relative
        ${isActive ? '' : 'hover:scale-[1.005]'}
      `}
      style={{
        background: isActive ? "white" : "transparent",
        boxShadow: isActive ? "0 12px 48px rgba(16,36,27,0.1), 0 4px 12px rgba(16,36,27,0.06)" : "none",
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isActive ? 'translateX(0) scale(1.01)' : 'translateX(0) scale(1)') 
          : 'translateX(-24px) scale(0.98)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Progress bar for active step */}
      {isActive && (
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl overflow-hidden"
          style={{ background: "rgba(130,191,152,0.2)" }}
        >
          <div 
            className="h-full"
            style={{ 
              background: accentColor,
              animation: "progressFill 4s linear forwards",
            }}
          />
        </div>
      )}
      
      {/* Timeline dot */}
      <div 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden md:flex items-center justify-center"
        style={{ 
          background: isActive || isPast ? accentColor : "rgba(16,36,27,0.1)",
          boxShadow: isActive ? `0 0 0 6px rgba(130,191,152,0.2)` : "none",
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {isPast && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {isActive && (
          <>
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                background: accentColor, 
                opacity: 0.4,
                animation: "gentlePulse 2s ease-in-out infinite",
              }} 
            />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ 
            background: isActive ? "rgba(130,191,152,0.15)" : "rgba(16,36,27,0.04)",
            transform: isActive ? "scale(1.05)" : "scale(1)",
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <WorkflowIconV3 type={step.icon} color={isActive ? TOKENS.dark : "rgba(16,36,27,0.35)"} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-xs font-medium"
              style={{ 
                opacity: isActive ? 0.7 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            >
              {step.time}
            </span>
            <span 
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{ 
                background: "rgba(130,191,152,0.15)", 
                color: TOKENS.dark,
                opacity: isActive && showContent ? 1 : 0,
                transform: isActive && showContent ? "translateX(0)" : "translateX(-8px)",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {step.action}
            </span>
          </div>
          <h3 
            className="font-bold text-lg"
            style={{ 
              fontFamily: '"DM Serif Display", Georgia, serif',
              color: isActive ? TOKENS.dark : "rgba(16,36,27,0.5)",
              transition: "color 0.4s ease",
            }}
          >
            {step.title}
          </h3>
          <div
            style={{
              maxHeight: isActive ? "60px" : "0px",
              opacity: isActive && showContent ? 0.65 : 0,
              overflow: "hidden",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p 
              className="text-sm mt-1 leading-relaxed"
              style={{ fontFamily: '"Source Sans 3", system-ui' }}
            >
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function WorkflowPreviewV3({ step, isVisible }) {
  const accentColor = TOKENS.accent;
  const [animKey, setAnimKey] = useState(0);
  
  // Reset animation when step changes
  useEffect(() => {
    setAnimKey(prev => prev + 1);
  }, [step.id]);
  
  return (
    <div 
      key={animKey}
      className="relative preview-card-enter"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Decorative blobs - subtle */}
      <div 
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl"
        style={{ background: TOKENS.soft, opacity: 0.4 }}
      />
      <div 
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full blur-2xl"
        style={{ background: accentColor, opacity: 0.1 }}
      />
      
      {/* Main preview card */}
      <div 
        className="relative rounded-3xl overflow-hidden"
        style={{ 
          background: "white",
          boxShadow: "0 24px 64px rgba(16,36,27,0.12), 0 8px 24px rgba(16,36,27,0.06)",
        }}
      >
        {/* Header bar with animated gradient */}
        <div 
          className="h-1.5 relative overflow-hidden"
          style={{ background: "rgba(130,191,152,0.3)" }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88, ${accentColor})`,
              animation: "progressFill 4s ease-out forwards",
            }}
          />
        </div>
        
        <div className="p-6 md:p-8">
          {/* Mock app header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ 
                  background: "rgba(130,191,152,0.12)",
                  animation: "gentlePulse 3s ease-in-out infinite",
                }}
              >
                <WorkflowIconV3 type={step.icon} color={TOKENS.dark} />
              </div>
              <div>
                <p className="text-xs opacity-40 uppercase tracking-wider">VoicePilot</p>
                <p className="font-semibold" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{step.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ 
                  background: accentColor,
                  animation: "gentlePulse 1.5s ease-in-out infinite",
                }} 
              />
              <span className="text-xs font-medium" style={{ color: accentColor }}>Live</span>
            </div>
          </div>

          {/* Property Photos Gallery - Only for new listing */}
          {step.hasPhotos && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TOKENS.dark} strokeWidth="2" style={{ opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-xs font-medium" style={{ opacity: 0.5 }}>Property photos captured</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {LISTING_PHOTOS.map((photo, index) => (
                  <div 
                    key={index}
                    className="photo-gallery-item relative rounded-xl overflow-hidden aspect-square"
                    style={{ 
                      animationDelay: `${index * 100 + 200}ms`,
                      boxShadow: "0 4px 12px rgba(16,36,27,0.1)",
                    }}
                  >
                    <img 
                      src={photo} 
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 0 && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "rgba(16,36,27,0.4)" }}
                      >
                        <span className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: accentColor }}>
                          Main
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-[11px] font-medium" style={{ color: accentColor }}>4 photos added</span>
                <button className="text-[11px] font-medium opacity-50 hover:opacity-80 transition-opacity">+ Add more</button>
              </div>
            </div>
          )}

          {/* Content preview */}
          <div 
            className="rounded-2xl p-5 mb-4 workflow-step-enter"
            style={{ 
              background: "rgba(130,191,152,0.06)",
              animationDelay: step.hasPhotos ? "0.4s" : "0.1s",
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: accentColor }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-2" style={{ color: TOKENS.dark }}>{step.description}</p>
                <p 
                  className="text-xs px-3 py-1.5 rounded-lg inline-block"
                  style={{ background: "white", color: TOKENS.dark, opacity: 0.7 }}
                >
                  {step.preview}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div 
            className="flex items-center gap-3 workflow-step-enter"
            style={{ animationDelay: step.hasPhotos ? "0.5s" : "0.2s" }}
          >
            <button 
              className="flex-1 h-11 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: TOKENS.dark }}
            >
              Continue
            </button>
            <button 
              className="h-11 px-4 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "rgba(16,36,27,0.04)" }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div 
        className="absolute -top-4 -right-4 md:right-8 px-4 py-2.5 rounded-xl shadow-lg"
        style={{ 
          background: "white",
          animation: "float 3s ease-in-out infinite, smoothFadeIn 0.5s ease-out 0.3s both",
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(130,191,152,0.15)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-xs font-medium">{step.action}</span>
        </div>
      </div>
    </div>
  );
}

function WorkflowIconV3({ type, color }) {
  const icons = {
    phone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    file: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    compare: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="2" y="3" width="8" height="18" rx="1" />
        <rect x="14" y="3" width="8" height="18" rx="1" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </svg>
    ),
    edit: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  };
  return icons[type] || icons.file;
}

function ComplianceItemV3({ positive, negative, text, muted }) {
  return (
    <div className="flex items-start gap-3">
      <span 
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ 
          background: positive ? TOKENS.accent : muted ? "rgba(16,36,27,0.1)" : "rgba(239,68,68,0.1)",
        }}
      >
        {positive ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={muted ? TOKENS.dark : "#ef4444"} strokeWidth="3" style={{ opacity: muted ? 0.4 : 1 }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </span>
      <p className="text-base" style={{ opacity: muted ? 0.6 : 0.85, fontFamily: '"Source Sans 3", system-ui' }}>{text}</p>
    </div>
  );
}

function TestimonialStripV3() {
  const testimonials = [
    {
      quote: "Finally, something that gets how we actually work.",
      name: "Maria Santos",
      role: "Realtor, San Jose",
      avatar: "https://i.pravatar.cc/80?img=25",
    },
    {
      quote: "I spend half as much time on admin now.",
      name: "David Kim",
      role: "Loan Officer, LA",
      avatar: "https://i.pravatar.cc/80?img=12",
    },
    {
      quote: "My broker loves the audit trail. I love the time savings.",
      name: "Rachel Torres",
      role: "Agent, SF Bay Area",
      avatar: "https://i.pravatar.cc/80?img=32",
    },
  ];
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="text-center">
          <p className="text-lg italic mb-4" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>"{t.quote}"</p>
          <div className="flex items-center justify-center gap-3">
            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs opacity-60">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WaitlistFormV3() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you'd normally send to your backend
    }
  };
  
  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: TOKENS.accent }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-left">
          <p className="font-semibold text-lg">You're on the list!</p>
          <p className="text-sm" style={{ opacity: 0.7 }}>We'll reach out when it's your turn.</p>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div
        className="flex items-center p-1.5 rounded-full"
        style={{
          background: "rgba(255,251,245,0.95)",
          border: `2px solid ${TOKENS.accent}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 h-12 px-5 bg-transparent outline-none text-base"
          style={{ color: TOKENS.dark }}
          required
        />
        <button
          type="submit"
          className="h-12 px-6 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 flex-shrink-0 transition-all hover:scale-[1.02]"
          style={{ background: TOKENS.accent, color: "white" }}
        >
          <span className="hidden sm:inline">Join Waitlist</span>
          <span className="sm:hidden">Join</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  );
}

function FloatingCTAV3({ show, backgroundColor = "#FFFBF5" }) {
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
          maxWidth: "420px",
          background: isDark ? "rgba(255,251,245,0.95)" : "white",
          border: `2px solid ${TOKENS.accent}`,
          boxShadow: isDark 
            ? "0 -4px 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 -4px 20px rgba(16,36,27,0.1), 0 8px 32px rgba(16,36,27,0.15)",
        }}
      >
        <input
          placeholder="your@email.com"
          className="flex-1 min-w-0 h-11 px-4 bg-transparent outline-none text-sm"
          style={{ color: TOKENS.dark }}
        />
        <button
          className="h-11 px-5 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 flex-shrink-0 transition-all hover:scale-[1.02]"
          style={{ background: TOKENS.accent, color: "white" }}
          type="button"
        >
          Get Early Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

