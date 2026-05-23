import type { OptimizationResult } from "@/types/archviz";

interface GeneratedPromptPanelProps {
  optimized: OptimizationResult;
}

export function GeneratedPromptPanel({ optimized }: GeneratedPromptPanelProps) {
  return (
    <div className="card-like">
      <h3>7. Generated Prompt Output</h3>

      <section className="output-block">
        <h4>English Prompt</h4>
        <pre className="prompt-output">{optimized.englishPrompt}</pre>
      </section>

      <section className="output-block">
        <h4>Chinese Explanation</h4>
        <p className="explain-output">{optimized.chineseExplanation}</p>
      </section>

      <section className="output-block">
        <h4>Copy-ready Final Prompt</h4>
        <textarea
          readOnly
          value={optimized.copyReadyFinalPrompt}
          rows={6}
          className="copy-output"
        />
      </section>

      <ul className="checklist">
        {optimized.improvementChecklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
