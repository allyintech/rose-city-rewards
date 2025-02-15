import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CreditActivityCardProps {
  creditsEarned: number;
  creditsSpent: number;
}

export const CreditActivityCard: React.FC<CreditActivityCardProps> = ({
  creditsEarned,
  creditsSpent,
}) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Credit Activity</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-2xl font-bold text-green-600">+{creditsEarned}</div>
          <div className="text-sm text-gray-600">Credits Earned</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600">-{creditsSpent}</div>
          <div className="text-sm text-gray-600">Credits Spent</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </CardContent>
    </Card>
  );
};
