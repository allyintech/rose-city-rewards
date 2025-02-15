'use client'

import React, { useState } from 'react';
import {
  Download,
  Calendar,
  ChevronLeft,
  Clock,
  Building,
  BarChart3,
  Info
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { VolunteerReportProps, VolunteerActivity, YearData } from '@/types/dataTypes';

// Default data
const defaultYearData: YearData = {
  totalHours: 0,
  activities: [],
  categoryBreakdown: {}
};

// Utility functions
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const calculateProgressToGoal = (hours: number = 0): number => {
  const annualGoal = 100;
  return Math.min((hours / annualGoal) * 100, 100);
};

// Main Component
const VolunteerReportHeader: React.FC<VolunteerReportProps> = ({
  currentYear = new Date().getFullYear().toString(),
  volunteerData = {}
}) => {
  const [showReport, setShowReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isLoading, setIsLoading] = useState(false);

  // Get data for selected year with type safety
  const yearData = volunteerData[selectedYear] || defaultYearData;
  const progressToGoal = calculateProgressToGoal(yearData.totalHours);

  // Activity Card Component
  const ActivityCard: React.FC<{ activity: VolunteerActivity }> = ({ activity }) => (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold">{activity.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {activity.category}
            </Badge>
          </div>
          <div className="text-right">
            <div className="font-bold">{activity.hours} hours</div>
            <div className="text-sm text-gray-500">
              {formatDate(activity.date)}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5" />
            <div>
              <div>Supervisor: {activity.supervisorName}</div>
              <div>Organization: {activity.organization}</div>
              <div>Impact: {activity.impact}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Header Component
  const ReportHeader = () => (
    <Card className="bg-white mt-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-red-600 w-6 h-6" />
            <div>
              <h3 className="font-semibold">Volunteer Report</h3>
              <p className="text-sm text-gray-600">Track your impact & hours</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReport(true)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Modal Component
  const ReportModal = () => {
    if (!showReport) return null;

    const activities = yearData.activities;
    const totalHours = yearData.totalHours;
    const categoryBreakdown = yearData.categoryBreakdown;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="p-4 space-y-4">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setShowReport(false)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold">Volunteer Report</h2>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded-md p-2"
            >
              {Object.keys(volunteerData).sort().reverse().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                    <div className="text-xl font-bold">{totalHours}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={progressToGoal} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(progressToGoal)}% of annual goal
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Building className="text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">Organizations</div>
                    <div className="text-xl font-bold">
                      {new Set(activities.map(a => a.organization)).size}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          {Object.keys(categoryBreakdown).length > 0 && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(categoryBreakdown).map(([category, hours]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="font-medium">{hours} hours</span>
                      </div>
                      <Progress
                        value={totalHours > 0 ? (hours / totalHours) * 100 : 0}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activities List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Activity Details</h3>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <ActivityCard key={activity.id || index} activity={activity} />
              ))
            ) : (
              <Card className="bg-white">
                <CardContent className="p-6 text-center text-gray-500">
                  No volunteer activities recorded for {selectedYear}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Download Button */}
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDownload}
            disabled={isLoading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isLoading ? "Generating Report..." : "Download Report"}
          </Button>
        </div>
      </div>
    );
  };

  // Download handler
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      console.log("Downloading report for", selectedYear);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ReportHeader />
      <ReportModal />
    </>
  );
};

export default VolunteerReportHeader;