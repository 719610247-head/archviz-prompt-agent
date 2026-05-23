import { ArchVizPromptAgent } from "@/components/ArchVizPromptAgent";
import { getMockLearningCases, getMockStyleReferences } from "@/lib/mockApi";

export default async function HomePage() {
  const [learningCases, styleReferences] = await Promise.all([
    getMockLearningCases(),
    getMockStyleReferences()
  ]);

  return (
    <ArchVizPromptAgent
      learningCases={learningCases}
      styleReferences={styleReferences}
    />
  );
}
