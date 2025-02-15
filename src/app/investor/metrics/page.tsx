'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  appUsageMetrics,
  mockProgramImpact,
  mockCreditActivity,
  engagementMetrics,
  impactMetrics 
} from '@/data/sampleData';
import type { 
  AppUsageMetrics,
  ProgramImpact,
  CreditActivity,
  EngagementMetrics,
  ImpactMetrics 
} from '@/types/dataTypes';
import HeaderMenu from '@/components/shared/HeaderMenu';

const AppMetrics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Program Analytics</h1>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appUsageMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Active: {Math.round((appUsageMetrics.activeUsers / appUsageMetrics.totalUsers) * 100)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Volunteer Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgramImpact.totalVolunteerHours.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Monthly Growth: +{mockProgramImpact.monthlyGrowth}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Credits in Circulation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCreditActivity.totalCreditsInCirculation.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Avg per User: {mockCreditActivity.averageCreditsPerUser}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProgramImpact.retentionRate}%</div>
            <p className="text-xs text-gray-500">Active Volunteers: {mockProgramImpact.activeVolunteers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Active Volunteers</span>
                <span className="text-sm font-medium">{engagementMetrics.activeVolunteersPercent}%</span>
              </div>
              <Progress value={engagementMetrics.activeVolunteersPercent} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Return Rate</span>
                <span className="text-sm font-medium">{engagementMetrics.returnRate}%</span>
              </div>
              <Progress value={engagementMetrics.returnRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Completion Rate</span>
                <span className="text-sm font-medium">{engagementMetrics.completionRate}%</span>
              </div>
              <Progress value={engagementMetrics.completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Economic Value</p>
                <p className="text-lg font-bold">${(impactMetrics.economicValue / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Social Return</p>
                <p className="text-lg font-bold">{impactMetrics.socialReturn}x</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sustainability Score</p>
                <p className="text-lg font-bold">{impactMetrics.sustainabilityScore}/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-lg font-bold">{engagementMetrics.satisfactionScore}/5</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Community Benefit</p>
              <p className="text-sm font-medium">{impactMetrics.communityBenefit}</p>
              <p className="text-sm text-gray-500 mt-2">Environmental Impact</p>
              <p className="text-sm font-medium">{impactMetrics.environmentalImpact}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Activity</CardTitle>
          <CardDescription>Today's overview of credit circulation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Credits Earned Today</p>
              <p className="text-xl font-bold">{mockCreditActivity.creditsEarnedToday.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Credits Redeemed Today</p>
              <p className="text-xl font-bold">{mockCreditActivity.creditsRedeemedToday.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Credits Expiring Soon</p>
              <p className="text-xl font-bold">{mockCreditActivity.creditsExpiringSoon?.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppMetrics;