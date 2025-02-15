"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgramImpactCard } from "./components/ProgramImpactCard";
import { CreditActivityCard } from "./components/CreditActivityCard";
import { TopVolunteersCard } from "./components/TopVolunteersCard";
import { RecentRedemptionsCard } from "./components/RecentRedemptionsCard";
import { ProgramImpact, TransactionRecord, Volunteer } from "@/types/dataTypes";

// API Endpoints (Ensure these match your Next.js API routes)
const API_URLS = {
  programImpact: "/api/program-impact",
  recentRedemptions: "/api/recent-redemptions",
  creditActivity: "/api/credit-activity",
  topVolunteers: "/api/top-volunteers",
};

// Component
export default function CoordinatorDashboard() {
  const [programImpact, setProgramImpact] = useState<ProgramImpact | null>(null);
  const [recentRedemptions, setRecentRedemptions] = useState<TransactionRecord[]>([]);
  const [creditsEarned, setCreditsEarned] = useState<number>(0);
  const [creditsSpent, setCreditsSpent] = useState<number>(0);
  const [topVolunteers, setTopVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all required data in parallel
        const [impactRes, redemptionsRes, creditsRes, volunteersRes] = await Promise.all([
          fetch(API_URLS.programImpact),
          fetch(API_URLS.recentRedemptions),
          fetch(API_URLS.creditActivity),
          fetch(API_URLS.topVolunteers),
        ]);

        // Parse JSON responses safely
        const programImpactData = await impactRes.json().catch(() => ({}));
        const recentRedemptionsData = await redemptionsRes.json().catch(() => []);
        const creditActivityData = await creditsRes.json().catch(() => ({}));
        const topVolunteersData = await volunteersRes.json().catch(() => []);

        // Set state with API data, with fallbacks for safety
        setProgramImpact(programImpactData || null);
        setRecentRedemptions(Array.isArray(recentRedemptionsData) ? recentRedemptionsData : []);
        setCreditsEarned(creditActivityData.totalCreditsEarned || 0);
        setCreditsSpent(creditActivityData.totalCreditsSpent || 0);
        setTopVolunteers(Array.isArray(topVolunteersData) ? topVolunteersData : []);

      } catch (err) {
        console.error("Error fetching coordinator dashboard data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle Loading & Error States
  if (loading) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/*  Program Impact Card (Fetched from API) */}
        <ProgramImpactCard impact={programImpact || { totalVolunteerHours: 0, volunteerGrowth: 0, retentionRate: 0, monthlyGrowth: 0, activeVolunteers: 0 }} className="col-span-2" />

        {/* Active Volunteers & Retention Rate */}
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {programImpact ? programImpact.activeVolunteers : 0}
              </div>
              <div className="text-sm text-gray-600">Active Volunteers</div>
              <div className="text-xs text-green-600 mt-1">
                +{programImpact ? programImpact.volunteerGrowth : 0} this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {programImpact ? programImpact.retentionRate : 0}%
              </div>
              <div className="text-sm text-gray-600">Retention Rate</div>
              <div className="text-xs text-gray-600 mt-1">Last 30 days</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Credit Activity Summary (Fetched from API) */}
      <CreditActivityCard creditsEarned={creditsEarned} creditsSpent={creditsSpent} />

      {/*  Top Volunteers (Fetched from API) */}
      <TopVolunteersCard volunteers={topVolunteers} />

      {/*  Recent Redemptions (Fetched from API) */}
      <RecentRedemptionsCard redemptions={recentRedemptions} />
    </div>
  );
}
