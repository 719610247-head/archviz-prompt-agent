import type { LearningCase } from "@/types/archviz";
import type { IntentRefinementRequest, IntentRefinementResult } from "@/types/intentRefinement";
import type { RenderPreset } from "@/types/renderPreset";

interface IntentRefinerInput {
  rawIntent: string;
  taxonomyLabel: string;
  renderPreset: RenderPreset | null;
  renderCase: LearningCase | null;
}

export interface RefinedIntentResult {
  rawIntent: string;
  refinedIntent: string;
  intentDirectives: string[];
  refinement: IntentRefinementResult;
}

const DEFAULT_RAW_INTENT =
  "Create a clear architectural visualization that communicates design intent and spatial hierarchy.";

export function refineProjectIntent({
  rawIntent,
  taxonomyLabel,
  renderPreset,
  renderCase
}: IntentRefinerInput): RefinedIntentResult {
  const refinement = buildLocalIntentRefinement({
    rawIntent,
    visualizationTaskType: renderCase?.visualizationTaskType,
    buildingTaxonomy: taxonomyLabel ? [taxonomyLabel] : [],
    selectedPreset: renderPreset?.buildingCategoryLabel,
    selectedCase: renderCase?.title,
    siteContext: renderCase?.siteContext,
    materialIntent: renderPreset?.recommendedMaterials.join(", "),
    cameraIntent: renderPreset?.recommendedCamera.join(", "),
    atmosphereIntent: renderPreset?.recommendedAtmosphere.join(", ")
  });

  return {
    rawIntent: normalizeRawIntent(rawIntent),
    refinedIntent: refinement.refinedIntent,
    intentDirectives: refinement.designDirectives,
    refinement
  };
}

export function buildLocalIntentRefinement(
  request: IntentRefinementRequest
): IntentRefinementResult {
  const normalizedRawIntent = normalizeRawIntent(request.rawIntent);
  const signalText = normalizedRawIntent.toLowerCase();
  const designDirectives = new Set<string>();
  const visualPriorities = new Set<string>();
  const riskWarnings = new Set<string>();

  addSignalDirectives(signalText, normalizedRawIntent, designDirectives, visualPriorities);
  addTaskTypeDirectives(request.visualizationTaskType, designDirectives, visualPriorities);

  if (!designDirectives.size) {
    designDirectives.add(
      "Maintain clear spatial hierarchy, legible architectural subject, and balanced visual readability."
    );
  }

  if (!visualPriorities.size) {
    visualPriorities.add("Keep the architectural subject readable before adding atmosphere or entourage.");
    visualPriorities.add("Use material scale, facade rhythm, and lighting control to support design intent.");
  }

  riskWarnings.add("Avoid inventing unsupported program details, site facts, or excessive formal complexity.");
  if (includesAny(signalText, ["people", "activity", "crowd"]) || includesAny(normalizedRawIntent, ["人群", "活动"])) {
    riskWarnings.add("Keep human activity controlled so it does not obscure the architectural subject.");
  }

  const contextLine = [
    request.visualizationTaskType ? `task ${request.visualizationTaskType}` : null,
    request.buildingTaxonomy?.length ? `taxonomy ${request.buildingTaxonomy.join(" > ")}` : null,
    request.selectedPreset ? `preset ${request.selectedPreset}` : null,
    request.selectedCase ? `case ${request.selectedCase}` : "no specific case",
    request.siteContext ? `site context ${request.siteContext}` : null
  ]
    .filter(Boolean)
    .join(", ");

  return {
    refinedIntent: `Professional architecture visualization intent: ${normalizedRawIntent}. Translate the intent into a controlled visual strategy for ${contextLine || "the selected project context"}. ${Array.from(
      designDirectives
    ).join(" ")}`,
    designDirectives: Array.from(designDirectives),
    visualPriorities: Array.from(visualPriorities),
    riskWarnings: Array.from(riskWarnings),
    promptStrategy: `Use the refined intent as the primary semantic brief, then combine it with the selected visualization task type, building taxonomy, preset guidance, case structure, site context, material intent, atmosphere intent, and camera intent. Keep the final prompt specific, professional, and visually restrained.`,
    source: "local",
    provider: "local"
  };
}

function normalizeRawIntent(rawIntent: string): string {
  return rawIntent.trim() || DEFAULT_RAW_INTENT;
}

function addSignalDirectives(
  signalText: string,
  rawIntent: string,
  designDirectives: Set<string>,
  visualPriorities: Set<string>
): void {
  if (includesAny(signalText, ["calm", "quiet"]) || includesAny(rawIntent, ["安静", "宁静"])) {
    designDirectives.add(
      "Use a calm atmosphere, restrained visual tone, soft daylight, and low visual noise."
    );
    visualPriorities.add("Prioritize quiet spatial order and gentle light over dramatic effects.");
  }

  if (includesAny(signalText, ["civic", "public", "open"]) || includesAny(rawIntent, ["公共性", "开放"])) {
    designDirectives.add(
      "Highlight accessible frontage, readable circulation, public activity, and human-scale civic space."
    );
    visualPriorities.add("Make entry, circulation, and public interface easy to read.");
  }

  if (
    includesAny(signalText, ["culture", "museum", "gallery", "exhibition"]) ||
    includesAny(rawIntent, ["文化", "展览", "博物馆", "美术馆"])
  ) {
    designDirectives.add(
      "Strengthen cultural identity, gallery-like clarity, sculptural massing, and controlled material expression."
    );
    visualPriorities.add("Balance cultural atmosphere with clear massing and material restraint.");
  }

  if (
    includesAny(signalText, ["commercial", "retail", "active"]) ||
    includesAny(rawIntent, ["商业", "活力", "零售"])
  ) {
    designDirectives.add(
      "Emphasize active street frontage, transparent facade behavior, warm lighting, and pedestrian flow."
    );
    visualPriorities.add("Show activity at the public edge without overcrowding the frame.");
  }

  if (includesAny(signalText, ["rainy", "wet"]) || includesAny(rawIntent, ["雨天", "湿润"])) {
    designDirectives.add(
      "Include wet ground reflections, soft overcast light, reflective pavement, and atmospheric depth."
    );
    visualPriorities.add("Use reflections to support atmosphere while preserving material readability.");
  }

  if (includesAny(signalText, ["dusk", "sunset"]) || includesAny(rawIntent, ["黄昏", "日落"])) {
    designDirectives.add(
      "Use warm interior glow, long shadows, dusk sky gradient, and cinematic lighting control."
    );
    visualPriorities.add("Balance warm artificial glow with facade legibility.");
  }

  if (
    includesAny(signalText, ["material", "texture", "facade"]) ||
    includesAny(rawIntent, ["材质", "纹理", "立面"])
  ) {
    designDirectives.add(
      "Increase material fidelity, facade texture readability, and realistic surface detail."
    );
    visualPriorities.add("Make material joints, scale, and texture believable.");
  }

  if (includesAny(signalText, ["people", "activity", "crowd"]) || includesAny(rawIntent, ["人群", "活动"])) {
    designDirectives.add(
      "Add controlled human activity, avoid overcrowding, and keep the architectural subject clear."
    );
    visualPriorities.add("Use people for scale and program signal, not as the main subject.");
  }
}

function addTaskTypeDirectives(
  taskType: string | undefined,
  designDirectives: Set<string>,
  visualPriorities: Set<string>
): void {
  if (!taskType) {
    return;
  }

  if (taskType.startsWith("Masterplan")) {
    designDirectives.add("Emphasize site hierarchy, landscape system, circulation, and plan readability.");
    visualPriorities.add("Keep drawing style clear, low-noise, and professionally legible.");
  }

  if (taskType.startsWith("Section Perspective")) {
    designDirectives.add(
      "Emphasize sectional depth, cut-plane clarity, interior/exterior relationships, and people scale."
    );
    visualPriorities.add("Make spatial layers and light penetration easy to understand.");
  }

  if (taskType.startsWith("Material Editing")) {
    designDirectives.add(
      "Preserve original geometry and camera while controlling semantic material replacement accurately."
    );
    visualPriorities.add("Prioritize material-region accuracy over composition changes.");
  }

  if (taskType.startsWith("Local Image Refinement")) {
    designDirectives.add("Refine only the local target area while preserving surrounding context.");
    visualPriorities.add("Match existing lighting, texture, scale, and perspective.");
  }
}

function includesAny(source: string, keywords: string[]): boolean {
  return keywords.some((keyword) => source.includes(keyword));
}

// TODO(OpenAI): Replace mock intent refinement with LLM-based semantic intent extraction when Phase 2A API mode is enabled.
