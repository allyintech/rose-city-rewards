"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleTransactions, sampleVolunteers, businesses } from "@/data/sampleData";
import { TransactionRecord, Volunteer, Business } from "@/types/dataTypes";

// Enrich transactions with volunteer and business names
const getTransactionDetails = (transaction: TransactionRecord) => {
  const volunteer: Volunteer | undefined = sampleVolunteers.find((v) => v.id === transaction.volunteerId);
  const business: Business | undefined = businesses.find((b) => b.id === transaction.businessId);
  return {
    ...transaction,
    volunteerName: volunteer ? volunteer.name : "Unknown Volunteer",
    businessName: business ? business.name : "Unknown Business",
  };
};

// Load and enrich transactions
const enrichedTransactions = sampleTransactions
  .filter((txn) => txn.type === "spent") // Only show "spent" transactions
  .map(getTransactionDetails);

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(enrichedTransactions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = enrichedTransactions.filter(
      (record) =>
        record.volunteerName.toLowerCase().includes(term) ||
        record.businessName.toLowerCase().includes(term) ||
        new Date(record.date).toLocaleDateString("en-US").includes(term)
    );

    setFilteredTransactions(filtered);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting transaction history");
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto p-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search history..."
          className="flex-1 mr-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b font-semibold">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Volunteer</th>
                  <th className="pb-2">Credits</th>
                  <th className="pb-2">Business</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="py-3">{new Date(record.date).toLocaleDateString("en-US")}</td>
                      <td className="py-3">{record.volunteerName}</td>
                      <td className="py-3">{record.amount}</td>
                      <td className="py-3">{record.businessName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
