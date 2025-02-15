"use client";

import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";
import ActivityCard from "@/app/volunteer/components/ActivityCard";
import { TransactionRecord } from "@/types/dataTypes";
import { sampleTransactions } from "@/data/sampleData";

// Sample earned transactions
const earnedTransactions: TransactionRecord[] = (sampleTransactions  ?? []).filter(
  (transaction) => transaction.type === "earned"
);

export default function EarnPage() {
  const handleScanQR = () => {
    console.log("Scanning QR code...");
  };

  const handleSubmitCode = () => {
    console.log("Submitting verification code...");
  };

  return (
    <div className="space-y-6">
      {/* Earn Credits Card */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Earn Credits</CardTitle>
          <CardDescription>Scan a QR code or enter a verification code to earn credits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={handleScanQR}
          >
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR Code
          </Button>
          <div className="space-y-2">
            <Input placeholder="Enter verification code" />
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleSubmitCode}
            >
              Submit Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Earnings Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Earnings</h2>
        {earnedTransactions.length > 0 ? (
          earnedTransactions.map((transaction) => (
            <ActivityCard 
              key={transaction.id} 
              transaction={transaction} 
              showEvent={!!transaction.eventId} 
              showHours={true} 
            />
          ))
        ) : (
          <p className="text-gray-600">No recent earnings recorded.</p>
        )}
      </div>
    </div>
  );
}
