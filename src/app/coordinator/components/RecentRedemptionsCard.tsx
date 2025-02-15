'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransactionRecord, Volunteer, Business } from '@/types/dataTypes';
import { sampleVolunteers, businesses } from '@/data/sampleData';

interface RecentRedemptionsCardProps {
  redemptions: TransactionRecord[];
}

export const RecentRedemptionsCard: React.FC<RecentRedemptionsCardProps> = ({ redemptions }) => {
  // Filter to only show "spent" transactions (i.e., redemptions)
  const redemptionTransactions = redemptions.filter(txn => txn.type === 'spent');

  // Get volunteer name based on ID
  const getVolunteerName = (volunteerId: string): string => {
    const volunteer = sampleVolunteers.find(v => v.id === volunteerId);
    return volunteer ? volunteer.name : "Unknown Volunteer";
  };

  // Get business name based on ID
  const getBusinessName = (businessId?: string): string => {
    if (!businessId) return "Unknown Business";
    const business = businesses.find(b => b.id === businessId);
    return business ? business.name : "Unknown Business";
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Redemptions</CardTitle>
          <Badge variant="outline" className="text-xs">Last 24 hours</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {redemptionTransactions.length > 0 ? (
            redemptionTransactions.map((record) => (
              <div 
                key={record.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <div className="font-medium">{getVolunteerName(record.volunteerId)}</div>
                  <div className="text-sm text-gray-600">{getBusinessName(record.businessId)}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(record.date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <Badge variant="secondary">{record.amount} credits</Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No recent redemptions.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRedemptionsCard;
