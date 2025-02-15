import { NextResponse } from "next/server";
import { sampleTransactions, volunteerActivities } from "@/data/sampleData";

export async function GET() {
  try {
    // Calculate total credits earned based on volunteer activity hours
    const totalCreditsEarned = volunteerActivities.reduce(
      (sum, activity) => sum + activity.hours,
      0
    );

    // Calculate total credits spent based on redemptions
    const totalCreditsSpent = sampleTransactions
      .filter(txn => txn.type === "spent")
      .reduce((sum, txn) => sum + txn.amount, 0);

    return NextResponse.json({
      totalCreditsEarned,
      totalCreditsSpent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch credit activity data" },
      { status: 500 }
    );
  }
}
