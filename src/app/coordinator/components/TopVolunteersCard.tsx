'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volunteer, VolunteerActivity } from '@/types/dataTypes';
import { sampleVolunteers, volunteerActivities } from '@/data/sampleData';

interface TopVolunteersCardProps {
  organization: string; // required property
  volunteers: Volunteer [];
}

export const TopVolunteersCard: React.FC<TopVolunteersCardProps> = ({ organization }) => {
  const [topVolunteers, setTopVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    // Fetch volunteer activities for the given organization
    const orgActivities = volunteerActivities.filter(
      (activity) => activity.organization === organization
    );

    // Aggregate hours per volunteer
    const volunteerHoursMap: Record<string, number> = {};

    orgActivities.forEach((activity) => {
      // Ensure activity.id exists and matches a volunteer
      const volunteer = sampleVolunteers.find((v) => v.id && v.id === activity.id);
      if (volunteer?.id) {
        volunteerHoursMap[volunteer.id] = (volunteerHoursMap[volunteer.id] || 0) + activity.hours;
      }
    });

    // Sort volunteers by hours (descending) and take the top 3
    const sortedVolunteers = sampleVolunteers
      .filter((v) => v.id && volunteerHoursMap[v.id] !== undefined) // Ensure valid ID and data exists
      .map((v) => ({
        ...v,
        totalHours: v.id ? volunteerHoursMap[v.id] ?? 0 : 0, // Provide default value to avoid undefined
      }))
      .sort((a, b) => b.totalHours - a.totalHours) // Sort by most hours
      .slice(0, 3); // Take top 3

    setTopVolunteers(sortedVolunteers);
  }, [organization]);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Volunteers</CardTitle>
          <Badge variant="outline" className="text-xs">This Month</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {topVolunteers.length > 0 ? (
          topVolunteers.map((volunteer, index) => (
            <div 
              key={volunteer.id}
              className="flex items-center justify-between border-b pb-2 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{volunteer.name}</div>
                  <div className="text-sm text-gray-600">Total Hours: {volunteer.totalHours}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{volunteer.totalHours} hrs</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No top volunteers this month.</p>
        )}
      </CardContent>
    </Card>
  );
};
