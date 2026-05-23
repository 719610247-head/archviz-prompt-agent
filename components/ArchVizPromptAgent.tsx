"use client";

import { useMemo, useState } from "react";
import type { LearningCase, PromptSelections, StyleReference } from "@/types/archviz";
import { buildOptimizedPrompt } from "@/lib/promptOptimizer";
import { CaseList } from "@/components/CaseList";
import { PromptBuilder } from "@/components/PromptBuilder";
import { GeneratedPromptPanel } from "@/components/GeneratedPromptPanel";
import { StyleReferencePanel } from "@/components/StyleReferencePanel";

interface ArchVizPromptAgentProps {
  learningCases: LearningCase[];
  styleReferences: StyleReference[];
}

const FALLBACK_SELECTIONS: PromptSelections = {
  projectContext: {
    projectName: "Demo Architecture Project",
    location: "Shanghai, China",
    designConcept: "A civic building that bridges public activity, landscape, and daylight.",
    buildingFunction: "museum"
  },
  spatialScene: {
    sceneType: "exterior",
    foreground: "Pedestrians and textured paving at human scale",
    middleGround: "Main building volume with clear entrance",
    background: "Urban skyline and soft atmospheric depth"
  },
  materialDetail: {
    facade: "textured concrete and glass",
    ground: "stone paving",
    roof: "standing seam metal roof",
    landscape: "native planting and low shrubs",
    lightingDetail: "balanced daylight with controlled highlights"
  },
  visualStyle: "realistic render",
  cameraComposition: "eye-level",
  negativePrompts: [
    "avoid distorted geometry",
    "avoid messy people",
    "avoid overexposed image",
    "avoid unreadable facade",
    "avoid random objects"
  ]
};

export function ArchVizPromptAgent({
  learningCases,
  styleReferences
}: ArchVizPromptAgentProps) {
  const initialCase = learningCases[0] ?? null;

  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCase?.id ?? "");
  const [draftPrompt, setDraftPrompt] = useState<string>(initialCase?.originalPrompt ?? "");
  const [selections, setSelections] = useState<PromptSelections>(
    initialCase?.preset ?? FALLBACK_SELECTIONS
  );

  const activeCase = useMemo(
    () => learningCases.find((item) => item.id === selectedCaseId) ?? null,
    [learningCases, selectedCaseId]
  );

  const optimized = useMemo(
    () => buildOptimizedPrompt({ draftPrompt, selections }),
    [draftPrompt, selections]
  );

  const onCaseSelect = (selected: LearningCase) => {
    setSelectedCaseId(selected.id);
    setDraftPrompt(selected.originalPrompt);
    setSelections(selected.preset);
  };

  if (!learningCases.length) {
    return (
      <main className="workspace-shell">
        <section className="panel panel-center">
          <h1>ArchViz Prompt Agent</h1>
          <p>No local mock learning cases found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="workspace-shell">
      <aside className="panel panel-left">
        <CaseList
          learningCases={learningCases}
          selectedCaseId={selectedCaseId}
          onSelectCase={onCaseSelect}
        />
      </aside>

      <section className="panel panel-center">
        <PromptBuilder
          selections={selections}
          draftPrompt={draftPrompt}
          onSelectionsChange={(updater) => setSelections((previous) => updater(previous))}
          onDraftPromptChange={setDraftPrompt}
        />
        <GeneratedPromptPanel optimized={optimized} />
      </section>

      <aside className="panel panel-right">
        <StyleReferencePanel activeCase={activeCase} styleReferences={styleReferences} />
      </aside>
    </main>
  );
}
