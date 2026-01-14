import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OriginalV2 from "./styles/OriginalV2";
import OriginalV3 from "./styles/OriginalV3";
import OriginalV4 from "./styles/OriginalV4";
import OriginalV5 from "./styles/OriginalV5";
import BrokerWaitlist from "./styles/BrokerWaitlist";
import CARPartnership from "./styles/CARPartnership";
import Waitlist from "./styles/Waitlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* V5 - Latest (V3 base + video, no testimonials, minimal nav) */}
        <Route path="/" element={<OriginalV5 />} />
        <Route path="/v5" element={<OriginalV5 />} />

        {/* Previous versions */}
        <Route path="/v4" element={<OriginalV4 />} />
        <Route path="/v3" element={<OriginalV3 />} />
        <Route path="/v2" element={<OriginalV2 />} />

        {/* Shared pages */}
        <Route path="/broker" element={<BrokerWaitlist />} />
        <Route path="/CARpartnership" element={<CARPartnership />} />
        <Route path="/waitlist" element={<Waitlist />} />
      </Routes>
    </BrowserRouter>
  );
}
