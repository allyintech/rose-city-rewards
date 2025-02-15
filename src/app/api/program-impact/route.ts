import { NextResponse } from "next/server";
import { programImpact } from "@/data/sampleData";

export async function GET() {
  try {
    return NextResponse.json(programImpact);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch program impact data" },
      { status: 500 }
    );
  }
}
