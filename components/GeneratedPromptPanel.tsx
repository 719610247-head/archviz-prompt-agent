"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningCase, OptimizationResult } from "@/types/archviz";

const HISTORY_STORAGE_KEY = "archviz-prompt-history-v1";
const COPIED_RESET_MS = 1600;

interface SavedPromptHistoryItem {
  id: string;
  timestamp: string;
  selectedTaxonomyLabel: string;
  selectedRenderPresetLabel: string;
  selectedCaseTitle: string;
  sourceCategory: string;
  projectIntent: string;
  finalEnglishPrompt: string;
}

interface GeneratedPromptPanelProps {
  optimized: OptimizationResult;
  activeCase: LearningCase | null;
  selectedTaxonomyLabel: string;
  selectedRenderPresetLabel: string;
  projectIntent: string;
  onRestoreProjectIntent: (nextValue: string) => void;
}

type ActionId = "final" | "structured" | "save";

export function GeneratedPromptPanel({
  optimized,
  activeCase,
  selectedTaxonomyLabel,
  selectedRenderPresetLabel,
  projectIntent,
  onRestoreProjectIntent
}: GeneratedPromptPanelProps) {
  const [copiedAction, setCopiedAction] = useState<ActionId | null>(null);
  const [feedbackLabel, setFeedbackLabel] = useState<string>("");
  const [history, setHistory] = useState<SavedPromptHistoryItem[]>([]);
  const [viewedHistoryId, setViewedHistoryId] = useState<string | null>(null);

  const normalizedProjectIntent = projectIntent.trim().length
    ? projectIntent.trim()
    : "Create a clear architectural visualization that communicates design intent and spatial hierarchy.";
  const selectedCaseTitle = activeCase?.title ?? "Custom local render case";
  const sourceCategory = activeCase?.sourceCategory ?? "Mock Case";
  const viewedHistoryItem = useMemo(
    () => history.find((item) => item.id === viewedHistoryId) ?? null,
    [history, viewedHistoryId]
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as SavedPromptHistoryItem[];
      if (Array.isArray(parsed)) {
        setHistory(parsed.slice(0, 5));
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const showFeedback = (action: ActionId, label: string) => {
    setCopiedAction(action);
    setFeedbackLabel(label);
    window.setTimeout(() => {
      setCopiedAction(null);
      setFeedbackLabel("");
    }, COPIED_RESET_MS);
  };

  const copyText = async (text: string, action: ActionId) => {
    await navigator.clipboard.writeText(text);
    showFeedback(action, "Copied!");
  };

  const exportTextFile = () => {
    const exportText = buildExportText({
      selectedTaxonomyLabel,
      selectedRenderPresetLabel,
      selectedCaseTitle,
      sourceCategory,
      projectIntent: normalizedProjectIntent,
      optimized
    });
    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${slugify(selectedCaseTitle)}-optimized-prompt.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const saveCurrentPrompt = () => {
    const nextItem: SavedPromptHistoryItem = {
      id: `${Date.now()}-${selectedCaseTitle}`,
      timestamp: new Date().toISOString(),
      selectedTaxonomyLabel,
      selectedRenderPresetLabel,
      selectedCaseTitle,
      sourceCategory,
      projectIntent: normalizedProjectIntent,
      finalEnglishPrompt: optimized.copyReadyFinalPrompt
    };
    const nextHistory = [nextItem, ...history].slice(0, 5);
    setHistory(nextHistory);
    setViewedHistoryId(nextItem.id);
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
    showFeedback("save", "Saved.");
  };

  const restoreHistoryItem = (item: SavedPromptHistoryItem) => {
    setViewedHistoryId(item.id);
    onRestoreProjectIntent(item.projectIntent);
  };

  return (
    <div className="card-like">
      <div className="generated-panel-head">
        <h3>7. Generated Prompt Output</h3>
        <div className="prompt-action-row">
          <button
            type="button"
            className="small-action-button"
            onClick={() => copyText(optimized.copyReadyFinalPrompt, "final")}
          >
            Copy Final English Prompt
          </button>
          <button
            type="button"
            className="small-action-button"
            onClick={() => copyText(optimized.englishPrompt, "structured")}
          >
            Copy Full Structured Prompt
          </button>
          <button type="button" className="small-action-button" onClick={exportTextFile}>
            Export as .txt
          </button>
          <button type="button" className="small-action-button primary" onClick={saveCurrentPrompt}>
            Save Current Prompt
          </button>
          {copiedAction ? <span className="copy-state">{feedbackLabel}</span> : null}
        </div>
      </div>

      <section className="output-block">
        <h4>English Prompt</h4>
        <pre className="prompt-output">{optimized.englishPrompt}</pre>
      </section>

      <section className="output-block">
        <h4>Optimization Explanation</h4>
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

      <section className="output-block">
        <div className="section-title-row">
          <h4>Local Prompt History</h4>
          <span className="case-badge">Latest 5</span>
        </div>
        {history.length ? (
          <div className="history-list">
            {history.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === viewedHistoryId ? "history-card active" : "history-card"}
                onClick={() => restoreHistoryItem(item)}
              >
                <strong>{item.selectedCaseTitle}</strong>
                <span>{formatHistoryTime(item.timestamp)}</span>
                <span className="history-meta">
                  {item.selectedTaxonomyLabel} · {item.selectedRenderPresetLabel}
                </span>
                <p>{item.projectIntent}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="muted">No saved prompts yet.</p>
        )}
        {viewedHistoryItem ? (
          <textarea
            readOnly
            rows={4}
            className="copy-output history-preview"
            value={viewedHistoryItem.finalEnglishPrompt}
          />
        ) : null}
      </section>

      <ul className="checklist">
        {optimized.improvementChecklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function buildExportText({
  selectedTaxonomyLabel,
  selectedRenderPresetLabel,
  selectedCaseTitle,
  sourceCategory,
  projectIntent,
  optimized
}: {
  selectedTaxonomyLabel: string;
  selectedRenderPresetLabel: string;
  selectedCaseTitle: string;
  sourceCategory: string;
  projectIntent: string;
  optimized: OptimizationResult;
}): string {
  return [
    `Selected Building Taxonomy: ${selectedTaxonomyLabel}`,
    `Selected Render Preset: ${selectedRenderPresetLabel}`,
    `Selected Case Title: ${selectedCaseTitle}`,
    `Source Category: ${sourceCategory}`,
    "",
    "Project Intent",
    projectIntent,
    "",
    "Full Structured Generated Prompt",
    optimized.englishPrompt,
    "",
    "Final English Prompt",
    optimized.copyReadyFinalPrompt
  ].join("\n");
}

function formatHistoryTime(timestamp: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}
