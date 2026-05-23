import type { OptimizationResult } from "@/types/archviz";

interface GeneratedPromptPanelProps {
  optimized: OptimizationResult;
}

export function GeneratedPromptPanel({ optimized }: GeneratedPromptPanelProps) {
  return (
    <div className="card-like">
      <h3>Generated Optimized Prompt</h3>
      <p className="muted">{optimized.summary}</p>
      <pre className="prompt-output">{optimized.structuredPrompt}</pre>
      <ul className="checklist">
        {optimized.improvementChecklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
