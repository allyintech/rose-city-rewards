"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TransactionRecord } from "@/types/dataTypes";

interface ActivityCardProps {
  transaction: TransactionRecord;
  showEvent?: boolean;
  showHours?: boolean;
  showBusiness?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  transaction,
  showEvent = false,
  showHours = false,
  showBusiness = false,
}) => {
  const isEarned = transaction.type === "earned";

  return (
    <Card className="bg-white">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className={isEarned ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
          >
            {isEarned ? "EARNED" : "SPENT"}
          </Badge>
          <div>
            <div className="font-medium">{transaction.description}</div>
            <div className="text-sm text-gray-500">
              {transaction.date
                ? new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No date available"}
            </div>
            {showEvent && transaction.eventId && (
              <div className="text-sm text-gray-600">Event: {transaction.eventId}</div>
            )}
            {showBusiness && transaction.businessName && (
              <div className="text-sm text-gray-600">Spent at: {transaction.businessName}</div>
            )}
            {showHours && transaction.hours && (
              <div className="text-sm text-gray-600">{transaction.hours} hours</div>
            )}
          </div>
        </div>
        <div className={`font-bold ${isEarned ? "text-green-600" : "text-red-600"}`}>
          {isEarned ? "+" : "-"}{transaction.amount}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
