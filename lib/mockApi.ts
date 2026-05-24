import { mockLearningCases, mockStyleReferences } from "@/data/mockLearningCases";
import { realLearningCases } from "@/data/realPromptCases";
import type { LearningCase, StyleReference } from "@/types/archviz";

const allLearningCases: LearningCase[] = [...mockLearningCases, ...realLearningCases];

export async function getMockLearningCases(): Promise<LearningCase[]> {
  await wait(120);
  return allLearningCases;
}

export async function getMockStyleReferences(): Promise<StyleReference[]> {
  await wait(80);
  return mockStyleReferences;
}

export async function getMockLearningCaseById(
  id: string
): Promise<LearningCase | null> {
  await wait(100);
  return allLearningCases.find((item) => item.id === id) ?? null;
}

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO(OpenAI): Load personalization and project context embeddings before optimization.
// TODO(OpenAI): Persist prompt iterations and model feedback for learning analytics.
