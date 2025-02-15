import { NextResponse } from "next/server";
import { sampleVolunteers } from "@/data/sampleData";

export async function GET() {
  try {
    // Get top 3 volunteers sorted by total hours
    const topVolunteers = [...sampleVolunteers]
      .sort((a, b) => (b.totalHours || 0) - (a.totalHours || 0))
      .slice(0, 3);

    return NextResponse.json(topVolunteers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch top volunteers" },
      { status: 500 }
    );
  }
}
