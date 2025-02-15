'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Clock, Building, Calendar, Download, ChevronLeft } from 'lucide-react';
import { achievements, sampleVolunteers, sampleEventRegistrations, volunteerActivities } from '@/data/sampleData';
import { Volunteer, VolunteerActivity, EventRegistration } from '@/types/dataTypes';

// Get the logged-in user: Sarah Chen (vol-001)
const volunteer: Volunteer | undefined = sampleVolunteers.find(v => v.id === 'vol-001');

// Fallback volunteer to prevent crashes
const fallbackVolunteer: Volunteer = {
  id: 'vol-001',
  name: 'Unknown Volunteer',
  email: '',
  joinDate: new Date(),
  totalHours: 0,
  balance: 0,
  totalEarned: 0,
  totalSpent: 0,
  impactScore: 0,
  streak: 0,
};

// ✅ Ensure a valid volunteer object
const loggedInVolunteer: Volunteer = volunteer || fallbackVolunteer;

// ✅ Get attended event registrations for Sarah Chen
const attendedRegistrations: EventRegistration[] = sampleEventRegistrations.filter(
  (reg) => reg.volunteerId === loggedInVolunteer.id && reg.status === 'attended'
);

// ✅ Get corresponding volunteer activities (events attended)
const attendedEvents: VolunteerActivity[] = volunteerActivities.filter(
  (activity) => attendedRegistrations.some((reg) => reg.eventId === activity.id)
);

export default function ProfilePage() {
  const [showReport, setShowReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [loading, setLoading] = useState(true);

  // Simulate API fetch delay
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto p-4">
      {/* Profile Overview */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <CardTitle>{loggedInVolunteer.name}</CardTitle>
              <CardDescription>Member since {new Date(loggedInVolunteer.joinDate).getFullYear()}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Impact Score</div>
              <div className="text-2xl font-bold text-red-600">{loggedInVolunteer.impactScore}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Streak</div>
              <div className="text-2xl font-bold text-red-600">{loggedInVolunteer.streak} weeks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Hours</CardTitle>
            <div className="text-2xl font-bold">{loggedInVolunteer.totalHours}</div>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Events</CardTitle>
            <div className="text-2xl font-bold">{attendedEvents.length}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Credits Earned & Spent */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Earned</CardTitle>
            <div className="text-2xl font-bold text-green-600">{loggedInVolunteer.totalEarned} Credits</div>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Spent</CardTitle>
            <div className="text-2xl font-bold text-red-600">{loggedInVolunteer.totalSpent} Credits</div>
          </CardHeader>
        </Card>
      </div>

      {/* Achievements */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map(achievement => (
            <Card key={achievement.id} className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <CardTitle className="text-base">{achievement.name}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={achievement.progress} className="h-2" />
                <div className="text-sm text-gray-600 mt-2">
                  {achievement.progress}% Complete
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Volunteer Report */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Volunteer Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowReport(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              View Report
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => console.log('Download PDF')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="p-2" onClick={() => setShowReport(false)}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-bold">Volunteer Report</h2>
              </div>
            </div>

            {/* Display Attended Events */}
            <div className="space-y-4">
              {attendedEvents.length > 0 ? (
                attendedEvents.map((event) => (
                  <Card key={event.id} className="bg-white shadow-sm">
                    <CardContent>
                      <div className="text-lg font-semibold">{event.name}</div>
                      <div className="text-sm text-gray-500">{event.organization}</div>
                      <div className="text-sm text-gray-600">{event.hours} hours volunteered</div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">No events found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
