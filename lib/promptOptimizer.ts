import type { LearningCase, OptimizationResult, PromptSelections } from "@/types/archviz";
import type { IntentRefinementResult } from "@/types/intentRefinement";
import type { RenderPreset } from "@/types/renderPreset";
import { refineProjectIntent } from "@/lib/intentRefiner";

interface OptimizationInput {
  draftPrompt: string;
  selections: PromptSelections;
  renderCase: LearningCase | null;
  renderPreset: RenderPreset | null;
  taxonomyLabel: string;
  intentRefinement?: IntentRefinementResult | null;
}

export function buildOptimizedPrompt({
  draftPrompt,
  selections,
  renderCase,
  renderPreset,
  taxonomyLabel,
  intentRefinement
}: OptimizationInput): OptimizationResult {
  const presetTitle = renderPreset?.buildingCategoryLabel ?? "Custom visualization preset";
  const presetAtmosphere = renderPreset?.recommendedAtmosphere.join(", ") ?? "";
  const presetMaterials = renderPreset?.recommendedMaterials.join(", ") ?? "";
  const presetCamera = renderPreset?.recommendedCamera.join(", ") ?? "";
  const presetKeywords = renderPreset?.promptKeywords.join(", ") ?? "";
  const presetNegativeRules = renderPreset?.negativePromptRules ?? [];
  const visualizationTaskGuidance = getVisualizationTaskGuidance(selections.visualizationTaskType);
  const caseTitle = renderCase?.title ?? "No specific visualization case selected";
  const caseStructure =
    renderCase?.description ??
    "Use the selected building taxonomy and preset as the primary reference structure.";
  const sourceCategory = renderCase?.sourceCategory ?? "preset-based reference";
  const viewControl = renderCase?.viewControl ?? selections.cameraComposition;
  const styleReferences = renderCase?.styleTags.join(", ") ?? selections.visualStyle;
  const materialReferences = [
    renderCase?.materialTags.join(", "),
    presetMaterials,
    selections.materialDetail.facade,
    selections.materialDetail.ground,
    selections.materialDetail.roof
  ]
    .filter(Boolean)
    .join(", ");
  const atmosphereReferences = [
    renderCase?.atmosphereTags.join(", "),
    presetAtmosphere,
    selections.materialDetail.lightingDetail
  ]
    .filter(Boolean)
    .join(", ");
  const cameraReferences = [
    renderCase?.cameraTags.join(", "),
    presetCamera,
    selections.cameraComposition
  ]
    .filter(Boolean)
    .join(", ");

  const localIntentRefinement = refineProjectIntent({
    rawIntent: draftPrompt,
    taxonomyLabel,
    renderPreset,
    renderCase
  });
  const activeIntentRefinement = intentRefinement ?? localIntentRefinement.refinement;
  const negativePrompt = buildNegativePrompt([
    ...selections.negativePrompts,
    ...presetNegativeRules
  ]);
  const intentDirectiveText = activeIntentRefinement.designDirectives.join(" ");
  const visualPriorityText = activeIntentRefinement.visualPriorities.join(" ");
  const riskWarningText = activeIntentRefinement.riskWarnings.join(" ");

  const finalEnglishPrompt = [
    activeIntentRefinement.refinedIntent,
    `${selections.projectContext.projectName}, ${selections.projectContext.buildingFunction}, taxonomy: ${taxonomyLabel || "custom taxonomy"}, site context: ${selections.projectContext.siteContext}.`,
    `Visualization task: ${selections.visualizationTaskType}; task guidance: ${visualizationTaskGuidance}.`,
    `Visualization preset: ${presetTitle}; preset keywords: ${presetKeywords || "architectural clarity, spatial hierarchy, material fidelity"}.`,
    `Selected visualization case reference: ${caseTitle} (${sourceCategory}); ${caseStructure}.`,
    `Scene: ${capitalize(selections.spatialScene.sceneType)} with view control ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}; middle ground: ${selections.spatialScene.middleGround}; background: ${selections.spatialScene.background}.`,
    `Material and facade system: facade ${selections.materialDetail.facade}; ground ${selections.materialDetail.ground}; roof ${selections.materialDetail.roof}; landscape ${selections.materialDetail.landscape}; references ${materialReferences}.`,
    `Atmosphere and lighting: ${selections.materialDetail.lightingDetail}; references ${atmosphereReferences}.`,
    `Camera and composition: ${selections.cameraComposition}; references ${cameraReferences}.`,
    `Rendering style: ${selections.visualStyle}; style references ${styleReferences}.`,
    `Refined intent directives: ${intentDirectiveText}`,
    `Visual priorities: ${visualPriorityText}`,
    `Prompt strategy: ${activeIntentRefinement.promptStrategy}`,
    "Architecture visualization prompt rules: treat taxonomy and preset as recommended starting points, preserve editable user adjustments, keep geometry legible, maintain facade rhythm, use realistic material scale, and avoid decorative clutter.",
    `Negative prompt: ${negativePrompt}.`
  ].join(" ");

  const englishPrompt = [
    "[Raw User Intent]",
    localIntentRefinement.rawIntent,
    "",
    "[Refined Project Intent]",
    activeIntentRefinement.refinedIntent,
    `Refinement Source: ${activeIntentRefinement.source}.`,
    `Intent Directives: ${intentDirectiveText}`,
    `Visual Priorities: ${visualPriorityText}`,
    `Risk Warnings: ${riskWarningText}`,
    `Prompt Strategy: ${activeIntentRefinement.promptStrategy}`,
    "",
    "[Architectural Subject]",
    `Visualization Task Type: ${selections.visualizationTaskType}.`,
    `Task-Specific Guidance: ${visualizationTaskGuidance}.`,
    `Building Taxonomy: ${taxonomyLabel || "Custom taxonomy"}.`,
    `Selected Visualization Preset: ${presetTitle}.`,
    `Selected Visualization Case: ${caseTitle}.`,
    `Source Category: ${sourceCategory}.`,
    `Case Source: ${renderCase?.caseSource ?? "preset-based local workflow"}.`,
    `Case Structure: ${caseStructure}.`,
    `Project Name: ${selections.projectContext.projectName}.`,
    `Building Type: ${selections.projectContext.buildingFunction}.`,
    `Site Context: ${selections.projectContext.siteContext}.`,
    `Design Concept: ${selections.projectContext.designConcept}.`,
    "",
    "[Scene and Spatial Composition]",
    `Scene Type: ${selections.spatialScene.sceneType}.`,
    `Preset Scene Recommendations: ${renderPreset?.recommendedSceneTypes.join(", ") ?? "custom scene"}.`,
    `View Control: ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}.`,
    `Middle Ground: ${selections.spatialScene.middleGround}.`,
    `Background: ${selections.spatialScene.background}.`,
    `Task-Specific Guidance: ${visualizationTaskGuidance}.`,
    `Refined Intent Influence: ${intentDirectiveText} ${visualPriorityText}`,
    "",
    "[Material and Facade System]",
    `Facade Material: ${selections.materialDetail.facade}.`,
    `Ground Material: ${selections.materialDetail.ground}.`,
    `Roof Material: ${selections.materialDetail.roof}.`,
    `Landscape Material: ${selections.materialDetail.landscape}.`,
    `Preset Material Recommendations: ${presetMaterials || "custom materials"}.`,
    `Material References: ${materialReferences}.`,
    `Task-Specific Guidance: ${visualizationTaskGuidance}.`,
    `Refined Intent Influence: ${intentDirectiveText} ${visualPriorityText}`,
    "",
    "[Atmosphere and Lighting]",
    `Lighting Detail: ${selections.materialDetail.lightingDetail}.`,
    `Preset Atmosphere Recommendations: ${presetAtmosphere || "custom atmosphere"}.`,
    `Atmosphere References: ${atmosphereReferences}.`,
    `Refined Intent Influence: ${intentDirectiveText} ${visualPriorityText}`,
    "",
    "[Camera and Composition]",
    `Camera Mode: ${selections.cameraComposition}.`,
    `Preset Camera Recommendations: ${presetCamera || "custom camera"}.`,
    `Camera References: ${cameraReferences}.`,
    `Task-Specific Guidance: ${visualizationTaskGuidance}.`,
    `Refined Intent Influence: ${intentDirectiveText} ${visualPriorityText}`,
    "",
    "[Rendering Style]",
    `Style Direction: ${selections.visualStyle}.`,
    `Preset Rendering Style: ${renderPreset?.recommendedRenderingStyle ?? "custom style"}.`,
    `Style References: ${styleReferences}.`,
    `Reusable Pattern: ${renderCase?.reusablePromptPattern ?? renderPreset?.designIntentHint ?? finalEnglishPrompt}.`,
    `Model Suitability: ${renderCase?.modelSuitability?.join(", ") ?? "local template optimization"}.`,
    `Prompt Strategy: ${activeIntentRefinement.promptStrategy}.`,
    "Optimization Rules: visualization task, taxonomy, and preset guide the prompt; selected case supplies reference structure, and manual workspace edits remain authoritative.",
    "",
    "[Negative Prompt]",
    negativePrompt,
    "",
    "[Final English Prompt]",
    finalEnglishPrompt
  ].join("\n");

  const explanation = [
    `Raw user intent is refined through ${activeIntentRefinement.source === "ai" ? `${formatProviderLabel(activeIntentRefinement.provider)} LLM intent refinement` : "local mock semantic keyword matching"}.`,
    `Taxonomy (${taxonomyLabel || "custom taxonomy"}), preset (${presetTitle}), and selected case (${caseTitle}) are used as context for intent refinement.`,
    "Refined intent directives, visual priorities, risk warnings, and prompt strategy influence architectural subject framing, scene composition, material language, atmosphere, camera, rendering style, and final prompt assembly.",
    `Visualization task guidance (${selections.visualizationTaskType}) adjusts the generated prompt for the selected output workflow.`,
    "Preset guidance remains a recommended starting point while manual workspace adjustments stay editable.",
    "Negative constraints combine default quality safeguards with preset-specific risk control."
  ].join("\n");

  return {
    englishPrompt,
    chineseExplanation: explanation,
    copyReadyFinalPrompt: finalEnglishPrompt,
    improvementChecklist: [
      "Visualization task matching is explicit and case filtering is strict by selected task and preset compatibility.",
      `Project Intent refinement source: ${activeIntentRefinement.source}.`,
      "Selected visualization case and preset both influence prompt structure without locking user edits.",
      "Final English prompt integrates refined intent directives rather than only raw intent text."
    ]
  };
}

function buildNegativePrompt(negativePrompts: string[]): string {
  const uniquePrompts = Array.from(new Set(negativePrompts));

  if (!uniquePrompts.length) {
    return "avoid distorted geometry, avoid messy people, avoid overexposed image, avoid unreadable facade, avoid random objects";
  }

  return uniquePrompts.join(", ");
}

function capitalize(value: string): string {
  if (!value.length) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getVisualizationTaskGuidance(taskType: PromptSelections["visualizationTaskType"]): string {
  if (taskType.startsWith("Masterplan")) {
    return "emphasize plan readability, site hierarchy, landscape system, circulation, and low-saturation professional drawing clarity";
  }

  if (taskType.startsWith("Section Perspective")) {
    return "emphasize sectional depth, cut-plane clarity, interior/exterior spatial relationships, people scale, and light penetration";
  }

  if (taskType.startsWith("Photorealistic Exterior Render")) {
    return "emphasize facade articulation, atmosphere, camera perspective, material fidelity, and site entourage";
  }

  if (taskType.startsWith("Photorealistic Interior Render")) {
    return "emphasize interior spatial depth, material tactility, daylight quality, furniture scale, and circulation legibility";
  }

  if (taskType.startsWith("Aerial Render")) {
    return "emphasize roofscape, massing hierarchy, site edges, landscape structure, and readable urban context";
  }

  if (taskType.startsWith("Plan")) {
    return "emphasize clean plan organization, room hierarchy, circulation paths, lineweight clarity, and annotation-ready composition";
  }

  if (taskType.startsWith("Elevation")) {
    return "emphasize facade rhythm, openings, material bands, shadow depth, and orthographic elevation clarity";
  }

  if (taskType.startsWith("Diagram")) {
    return "emphasize simplified relationships, labeled systems, circulation logic, spatial hierarchy, and restrained graphic clarity";
  }

  if (taskType.startsWith("Material Editing")) {
    return "preserve original geometry, control semantic material regions, avoid camera changes, and prioritize material replacement accuracy";
  }

  if (taskType.startsWith("Local Image Refinement")) {
    return "preserve surrounding image context, refine only the selected local area, match lighting and texture, and avoid global design changes";
  }

  return "maintain architectural clarity, material fidelity, and coherent visual hierarchy";
}

function formatProviderLabel(provider: string | undefined): string {
  if (provider === "deepseek") {
    return "DeepSeek";
  }

  if (provider === "openai") {
    return "OpenAI";
  }

  return "provider-agnostic";
}

// TODO(LLM): Replace template assembly with provider-agnostic LLM prompt optimization.
// TODO(LLM): Add taxonomy-aware retrieval and evaluation loops for prompt quality.
