'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { sampleTransactions, sampleVolunteers } from '@/data/sampleData';
import { TransactionRecord, Volunteer } from '@/types/dataTypes';

// Get the logged-in volunteer (vol-001)
const currentVolunteer: Volunteer = sampleVolunteers.find(v => v.id === 'vol-001') || {
  id: 'vol-001',
  name: 'Sarah Chen',
  email: 'sarah.chen@email.com',
  joinDate: new Date(),
  totalHours: 0,
  balance: 100,
  totalEarned: 200,
  totalSpent: 100,
  impactScore: 85,
  streak: 4,
};

// Filter transactions only for the logged-in volunteer
const transactions: TransactionRecord[] = sampleTransactions.filter(
  transaction => transaction.volunteerId === currentVolunteer.id
);

const ActivityCard = ({ transaction }: { transaction: TransactionRecord }) => {
  const isEarned = transaction.type === 'earned';

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Badge className={isEarned ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isEarned ? 'EARNED' : 'SPENT'}
          </Badge>
          <div>
            <div className="font-medium">{transaction.description}</div>
            <div className="text-sm text-gray-500">
              {transaction.date
                ? new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'N/A'}
            </div>
          </div>
        </div>
        <div className={`font-bold ${isEarned ? 'text-green-600' : 'text-red-600'}`}>
          {isEarned ? '+' : '-'}{transaction.amount}
        </div>
      </CardContent>
    </Card>
  );
};

export default function VolunteerLandingPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-lg mx-auto p-4">
      {/* Balance Card */}
      <Card className="text-center bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-gray-600">Current Balance</CardTitle>
          <div className="text-4xl font-bold text-red-600">{currentVolunteer.balance}</div>
          <CardDescription>Available Credits</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => router.push('/volunteer/earn')}
          >
            Earn Credits
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => router.push('/volunteer/spend')}
          >
            Spend Credits
          </Button>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Earned</CardTitle>
            <div className="text-2xl font-bold text-green-600">{currentVolunteer.totalEarned}</div>
          </CardHeader>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Spent</CardTitle>
            <div className="text-2xl font-bold text-red-600">{currentVolunteer.totalSpent}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button 
            variant="ghost" 
            className="text-red-600"
            onClick={() => router.push('/volunteer/history')}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.slice(0, 3).map(transaction => (
              <ActivityCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
