import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OriginalV2 from "./styles/OriginalV2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OriginalV2 />} />
      </Routes>
    </BrowserRouter>
  );
}
