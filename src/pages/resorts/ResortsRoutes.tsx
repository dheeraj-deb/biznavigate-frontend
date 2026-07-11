import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import ResortListPage from "./ResortListPage";
import ResortDetailPage from "./ResortDetailPage";
import IntentPage from "./IntentPage";

/**
 * SmartPage route group, loaded as one lazy chunk from App.tsx so the
 * marketing home bundle stays untouched.
 */
export default function ResortsRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route index element={<ResortListPage />} />
        <Route path="intent/:intentSlug" element={<IntentPage />} />
        <Route path=":slug" element={<ResortDetailPage />} />
      </Routes>
    </PublicLayout>
  );
}
