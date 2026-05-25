"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningCase, PromptSelections, StyleReference } from "@/types/archviz";
import type {
  IntentRefinementRequest,
  IntentRefinementResult,
  IntentRefinementStatus
} from "@/types/intentRefinement";
import type { RenderPreset } from "@/types/renderPreset";
import type { TaxonomyPath } from "@/types/buildingTaxonomy";
import { buildingTaxonomy } from "@/data/buildingTaxonomy";
import { renderPresets } from "@/data/renderPresets";
import { buildLocalIntentRefinement } from "@/lib/intentRefiner";
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
    siteContext: "urban civic district",
    designConcept: "A civic building that bridges public activity, landscape, and daylight.",
    buildingFunction: "museum"
  },
  visualizationTaskType: "Photorealistic Exterior Render / 写实外部效果图",
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

const INITIAL_INTENT_REFINEMENT_STATUS: IntentRefinementStatus = "local-fallback";

function selectionsFromCase(renderCase: LearningCase): PromptSelections {
  return {
    ...renderCase.preset,
    visualizationTaskType: renderCase.visualizationTaskType,
    projectContext: {
      ...renderCase.preset.projectContext,
      buildingFunction: renderCase.buildingType
    },
    spatialScene: {
      ...renderCase.preset.spatialScene,
      sceneType: renderCase.sceneType
    }
  };
}

function applyRenderPresetToSelections(
  previous: PromptSelections,
  renderPreset: RenderPreset
): PromptSelections {
  return {
    ...previous,
    visualizationTaskType:
      renderPreset.recommendedVisualizationTaskTypes[0] ?? previous.visualizationTaskType,
    projectContext: {
      ...previous.projectContext,
      buildingFunction: renderPreset.buildingType,
      designConcept: renderPreset.designIntentHint
    },
    spatialScene: {
      ...previous.spatialScene,
      sceneType: renderPreset.recommendedSceneTypes[0] ?? previous.spatialScene.sceneType,
      middleGround: renderPreset.promptKeywords.join(", ")
    },
    materialDetail: {
      ...previous.materialDetail,
      facade: renderPreset.recommendedMaterials.slice(0, 2).join(", "),
      ground: renderPreset.recommendedMaterials[2] ?? previous.materialDetail.ground,
      roof: renderPreset.recommendedMaterials[3] ?? previous.materialDetail.roof,
      lightingDetail: renderPreset.recommendedAtmosphere.join(", ")
    },
    visualStyle: renderPreset.recommendedRenderingStyle,
    cameraComposition: renderPreset.recommendedCamera[0] ?? previous.cameraComposition
  };
}

function taxonomyPathKey(path: TaxonomyPath): string {
  return path.join("/");
}

function getPresetsForPath(path: TaxonomyPath): RenderPreset[] {
  const key = taxonomyPathKey(path);
  return renderPresets.filter((preset) => taxonomyPathKey(preset.taxonomyPath) === key);
}

function getBestPresetForPath(path: TaxonomyPath): RenderPreset {
  const exactPreset = getPresetsForPath(path)[0];
  if (exactPreset) {
    return exactPreset;
  }

  return (
    renderPresets.find((preset) =>
      preset.taxonomyPath.every((pathItem, index) => path[index] === pathItem)
    ) ?? renderPresets[0]
  );
}

function getInitialRenderPreset(renderCase: LearningCase | null): RenderPreset {
  return renderPresets[0];
}

function pathMatches(left: TaxonomyPath, right: TaxonomyPath): boolean {
  return taxonomyPathKey(left) === taxonomyPathKey(right);
}

function getCaseTaxonomyPaths(renderCase: LearningCase): TaxonomyPath[] {
  return [
    renderCase.buildingTaxonomyPath ?? [],
    renderCase.taxonomyPath ?? [],
    ...(renderCase.compatibleTaxonomyPaths ?? [])
  ].filter((path) => path.length > 0);
}

function caseMatchesTaxonomyOrPreset(
  renderCase: LearningCase,
  selectedTaxonomyPath: TaxonomyPath,
  selectedRenderPreset: RenderPreset,
  selectedVisualizationTaskType: PromptSelections["visualizationTaskType"]
): boolean {
  if (renderCase.visualizationTaskType !== selectedVisualizationTaskType) {
    return false;
  }

  if (!isBroadPreset(selectedRenderPreset)) {
    return (renderCase.compatiblePresetIds ?? []).includes(selectedRenderPreset.id);
  }

  const casePaths = getCaseTaxonomyPaths(renderCase);

  return casePaths.some(
    (path) =>
      pathMatches(path, selectedTaxonomyPath) || pathMatches(path, selectedRenderPreset.taxonomyPath)
  );
}

function isBroadPreset(renderPreset: RenderPreset): boolean {
  return renderPreset.id === "public-building-general";
}

function taxonomyLabelForPath(path: TaxonomyPath): string {
  const labels: string[] = [];
  let currentLevel = buildingTaxonomy;

  path.forEach((id) => {
    const node = currentLevel.find((item) => item.id === id);
    if (!node) {
      return;
    }

    labels.push(`${node.labelEn} / ${node.labelZh}`);
    currentLevel = node.children ?? [];
  });

  return labels.join(" > ");
}

export function ArchVizPromptAgent({
  learningCases,
  styleReferences
}: ArchVizPromptAgentProps) {
  const initialCase = learningCases[0] ?? null;
  const initialPreset = getInitialRenderPreset(initialCase);

  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCase?.id ?? "");
  const [selectedTaxonomyPath, setSelectedTaxonomyPath] = useState<TaxonomyPath>(
    initialPreset.taxonomyPath
  );
  const [selectedRenderPresetId, setSelectedRenderPresetId] = useState<string>(initialPreset.id);
  const [draftPrompt, setDraftPrompt] = useState<string>(initialCase?.originalPrompt ?? "");
  const [selections, setSelections] = useState<PromptSelections>(
    initialCase ? selectionsFromCase(initialCase) : FALLBACK_SELECTIONS
  );
  const [intentRefinement, setIntentRefinement] = useState<IntentRefinementResult>(() =>
    buildLocalIntentRefinement({
      rawIntent: initialCase?.originalPrompt ?? "",
      visualizationTaskType:
        initialCase?.visualizationTaskType ?? FALLBACK_SELECTIONS.visualizationTaskType,
      buildingTaxonomy: [],
      selectedPreset: initialPreset.buildingCategoryLabel,
      selectedCase: initialCase?.title,
      siteContext: initialCase?.siteContext ?? FALLBACK_SELECTIONS.projectContext.siteContext
    })
  );
  const [intentRefinementStatus, setIntentRefinementStatus] =
    useState<IntentRefinementStatus>(INITIAL_INTENT_REFINEMENT_STATUS);

  const activeRenderPreset = useMemo(
    () => renderPresets.find((preset) => preset.id === selectedRenderPresetId) ?? initialPreset,
    [initialPreset, selectedRenderPresetId]
  );
  const taxonomyLabel = useMemo(
    () => taxonomyLabelForPath(selectedTaxonomyPath),
    [selectedTaxonomyPath]
  );
  const exactRelevantCases = useMemo(
    () =>
      learningCases.filter((item) =>
        caseMatchesTaxonomyOrPreset(
          item,
          selectedTaxonomyPath,
          activeRenderPreset,
          selections.visualizationTaskType
        )
      ),
    [activeRenderPreset, learningCases, selectedTaxonomyPath, selections.visualizationTaskType]
  );
  const visibleLearningCases = exactRelevantCases;
  const activeCase = exactRelevantCases.find((item) => item.id === selectedCaseId) ?? null;
  const intentRefinementRequest = useMemo<IntentRefinementRequest>(
    () => ({
      rawIntent: draftPrompt,
      visualizationTaskType: selections.visualizationTaskType,
      buildingTaxonomy: taxonomyLabel ? [taxonomyLabel] : [],
      selectedPreset: activeRenderPreset.buildingCategoryLabel,
      selectedCase: activeCase?.title,
      siteContext: selections.projectContext.siteContext,
      materialIntent: [
        selections.materialDetail.facade,
        selections.materialDetail.ground,
        selections.materialDetail.roof,
        selections.materialDetail.landscape
      ]
        .filter(Boolean)
        .join(", "),
      cameraIntent: selections.cameraComposition,
      atmosphereIntent: selections.materialDetail.lightingDetail
    }),
    [
      activeCase,
      activeRenderPreset,
      draftPrompt,
      selections.cameraComposition,
      selections.materialDetail.facade,
      selections.materialDetail.ground,
      selections.materialDetail.landscape,
      selections.materialDetail.lightingDetail,
      selections.materialDetail.roof,
      selections.projectContext.siteContext,
      selections.visualizationTaskType,
      taxonomyLabel
    ]
  );

  useEffect(() => {
    const controller = new AbortController();
    const localFallback = buildLocalIntentRefinement(intentRefinementRequest);

    setIntentRefinementStatus("refining");

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/refine-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(intentRefinementRequest),
          signal: controller.signal
        });

        if (!response.ok) {
          setIntentRefinement(localFallback);
          setIntentRefinementStatus("ai-failed");
          return;
        }

        const payload = (await response.json()) as {
          result?: IntentRefinementResult;
          mode?: IntentRefinementStatus;
        };

        if (!isIntentRefinementResult(payload.result)) {
          setIntentRefinement(localFallback);
          setIntentRefinementStatus("ai-failed");
          return;
        }

        setIntentRefinement(payload.result);
        setIntentRefinementStatus(
          payload.result.source === "ai" ? "ai-active" : payload.mode ?? "local-fallback"
        );
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setIntentRefinement(localFallback);
        setIntentRefinementStatus("ai-failed");
      }
    }, 550);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [intentRefinementRequest]);

  const optimized = useMemo(
    () =>
      buildOptimizedPrompt({
        draftPrompt,
        selections,
        renderCase: activeCase,
        renderPreset: activeRenderPreset,
        taxonomyLabel,
        intentRefinement
      }),
    [activeCase, activeRenderPreset, draftPrompt, intentRefinement, selections, taxonomyLabel]
  );

  const onCaseSelect = (selected: LearningCase) => {
    setSelectedCaseId(selected.id);
    setDraftPrompt(selected.originalPrompt);
    setSelections(selectionsFromCase(selected));
  };

  const applyPresetAndSelectRelevantCase = (
    renderPreset: RenderPreset,
    taxonomyPath: TaxonomyPath = selectedTaxonomyPath
  ) => {
    setSelections((previous) => applyRenderPresetToSelections(previous, renderPreset));

    const firstRelevantCase = learningCases.find((item) =>
      caseMatchesTaxonomyOrPreset(
        item,
        taxonomyPath,
        renderPreset,
        renderPreset.recommendedVisualizationTaskTypes[0] ?? selections.visualizationTaskType
      )
    );
    if (firstRelevantCase) {
      setSelectedCaseId(firstRelevantCase.id);
      setDraftPrompt(firstRelevantCase.originalPrompt);
      return;
    }

    setSelectedCaseId("");
    setDraftPrompt(renderPreset.designIntentHint);
  };

  const onTaxonomyPathChange = (path: TaxonomyPath) => {
    setSelectedTaxonomyPath(path);
    const nextPreset = getBestPresetForPath(path);
    setSelectedRenderPresetId(nextPreset.id);
    setSelections((previous) => applyRenderPresetToSelections(previous, nextPreset));
    const firstRelevantCase = learningCases.find((item) =>
      caseMatchesTaxonomyOrPreset(
        item,
        path,
        nextPreset,
        nextPreset.recommendedVisualizationTaskTypes[0] ?? selections.visualizationTaskType
      )
    );
    setSelectedCaseId(firstRelevantCase?.id ?? "");
    setDraftPrompt(firstRelevantCase?.originalPrompt ?? nextPreset.designIntentHint);
  };

  const onRenderPresetChange = (presetId: string) => {
    const nextPreset = renderPresets.find((preset) => preset.id === presetId) ?? renderPresets[0];
    setSelectedRenderPresetId(nextPreset.id);
    setSelectedTaxonomyPath(nextPreset.taxonomyPath);
    applyPresetAndSelectRelevantCase(nextPreset, nextPreset.taxonomyPath);
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
          learningCases={visibleLearningCases}
          selectedCaseId={selectedCaseId}
          taxonomy={buildingTaxonomy}
          renderPresets={renderPresets}
          selectedTaxonomyPath={selectedTaxonomyPath}
          selectedRenderPreset={activeRenderPreset}
          showFallbackCases={!exactRelevantCases.length}
          taxonomyLabel={taxonomyLabel}
          onTaxonomyPathChange={onTaxonomyPathChange}
          onRenderPresetChange={onRenderPresetChange}
          onSelectCase={onCaseSelect}
        />
      </aside>

      <section className="panel panel-center">
        <PromptBuilder
          selections={selections}
          draftPrompt={draftPrompt}
          intentRefinementStatus={intentRefinementStatus}
          intentRefinementSource={intentRefinement.source}
          intentRefinementProvider={intentRefinement.provider}
          onSelectionsChange={(updater) => setSelections((previous) => updater(previous))}
          onDraftPromptChange={setDraftPrompt}
        />
        <GeneratedPromptPanel
          optimized={optimized}
          activeCase={activeCase}
          selectedTaxonomyLabel={taxonomyLabel}
          selectedRenderPresetLabel={activeRenderPreset.buildingCategoryLabel}
          projectIntent={draftPrompt}
          intentRefinement={intentRefinement}
          onRestoreProjectIntent={setDraftPrompt}
        />
      </section>

      <aside className="panel panel-right">
        <StyleReferencePanel
          activeCase={activeCase}
          activeRenderPreset={activeRenderPreset}
          taxonomyLabel={taxonomyLabel}
          styleReferences={styleReferences}
        />
      </aside>
    </main>
  );
}

function isIntentRefinementResult(value: unknown): value is IntentRefinementResult {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const result = value as Partial<IntentRefinementResult>;

  return (
    typeof result.refinedIntent === "string" &&
    Array.isArray(result.designDirectives) &&
    Array.isArray(result.visualPriorities) &&
    Array.isArray(result.riskWarnings) &&
    typeof result.promptStrategy === "string" &&
    (result.source === "ai" || result.source === "local")
  );
}
