import { NextResponse } from "next/server";
import { getMockLearningCases, getMockStyleReferences } from "@/lib/mockApi";

export async function GET() {
  const [cases, styleReferences] = await Promise.all([
    getMockLearningCases(),
    getMockStyleReferences()
  ]);

  return NextResponse.json({
    cases,
    styleReferences
  });
}

// TODO(OpenAI): Connect this route to server-side OpenAI optimization pipeline.
// TODO(OpenAI): Add auth, quota controls, and request validation before production.
