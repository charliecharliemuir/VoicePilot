import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OriginalV2 from "./styles/OriginalV2";
import BrokerWaitlist from "./styles/BrokerWaitlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OriginalV2 />} />
        <Route path="/broker" element={<BrokerWaitlist />} />
      </Routes>
    </BrowserRouter>
  );
}
