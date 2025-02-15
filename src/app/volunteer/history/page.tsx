'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import ActivityCard from '@/app/volunteer/components/ActivityCard';
import { TransactionRecord } from '@/types/dataTypes';
import { sampleTransactions } from '@/data/sampleData';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  // Simulating API fetch (replace with actual API later)
  useEffect(() => {
    setTransactions(sampleTransactions || []); // Ensure fallback to an empty array
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="space-y-6 max-w-lg mx-auto p-4">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search transactions..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Transaction History List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <ActivityCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No transactions found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
