'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MapPin, Clock, Users, Building, Award } from 'lucide-react';
import { 
  neighborhoodData, 
  communityStories, 
  investorMetrics,
  communityImpact 
} from '@/data/sampleData';

const CommunityPage = () => {
  useEffect(() => {
    console.log('Data check on mount:', {
      neighborhoods: neighborhoodData,
      stories: communityStories,
      metrics: investorMetrics
    });
  }, []);

  // Safety check for data
  if (!neighborhoodData?.length || !communityStories?.length) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Loading community data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-2xl font-bold mt-2">
              {neighborhoodData.reduce((sum, item) => sum + item.activeUsers, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-red-600" />
              <div className="text-sm text-gray-600">Local Businesses</div>
            </div>
            <div className="text-2xl font-bold mt-2">
              {neighborhoodData.reduce((sum, item) => sum + item.businesses, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-red-600" />
              <div className="text-sm text-gray-600">Impact Score</div>
            </div>
            <div className="text-2xl font-bold mt-2">
              {investorMetrics.socialImpactScore}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Neighborhood Impact</CardTitle>
          <CardDescription>Community engagement by Portland metro area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={neighborhoodData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="activeUsers" 
                  name="Active Users" 
                  fill="#dc2626"
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="businesses" 
                  name="Businesses" 
                  fill="#1f2937"
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Community Stories</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {communityStories.map((story) => (
            <Card key={story.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {story.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {story.neighborhood}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  {story.title}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-1 flex-shrink-0 text-gray-500" />
                    <span className="text-gray-600">{story.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    <span className="text-gray-600">{story.impact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    <span className="text-gray-600">{story.date}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {story.volunteers} volunteers participated
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;