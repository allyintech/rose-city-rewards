import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgramImpact } from '@/types/dataTypes';
import { cn } from '@/utils/utils'; // Assuming you have a cn utility for conditional class names

interface ProgramImpactCardProps {
  impact: ProgramImpact;
  className?: string;
}

export const ProgramImpactCard: React.FC<ProgramImpactCardProps> = ({ 
  impact, 
  className 
}) => {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Program Impact</CardTitle>
          <Badge variant="outline">This Month</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-red-600">{impact.totalVolunteerHours}</div>
        <div className="text-sm text-gray-600">Total Volunteer Hours</div>
        <div className="text-sm text-green-600 mt-1">
          ↑ {impact.monthlyGrowth}% from last month
        </div>
      </CardContent>
    </Card>
  );
};