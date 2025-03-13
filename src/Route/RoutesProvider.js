import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePages from "../Pages/Home";

export default function RoutesProvider() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />

        {/* <Route path="*" element={<NotFound />} /> Route 404 */}
      </Routes>
    </Router>
  );
}
