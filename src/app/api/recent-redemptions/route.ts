import { NextResponse } from "next/server";
import { sampleTransactions } from "@/data/sampleData";

export async function GET() {
  try {
    const recentRedemptions = sampleTransactions
      .filter(txn => txn.type === "spent")
      .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by most recent
      .slice(0, 5); // Get last 5 transactions

    return NextResponse.json(recentRedemptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recent redemptions" },
      { status: 500 }
    );
  }
}
