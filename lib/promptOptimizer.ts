import type { LearningCase, OptimizationResult, PromptSelections } from "@/types/archviz";
import type { RenderPreset } from "@/types/renderPreset";
import { refineProjectIntent } from "@/lib/intentRefiner";

interface OptimizationInput {
  draftPrompt: string;
  selections: PromptSelections;
  renderCase: LearningCase | null;
  renderPreset: RenderPreset | null;
  taxonomyLabel: string;
}

export function buildOptimizedPrompt({
  draftPrompt,
  selections,
  renderCase,
  renderPreset,
  taxonomyLabel
}: OptimizationInput): OptimizationResult {
  const presetTitle = renderPreset?.buildingCategoryLabel ?? "Custom render preset";
  const presetAtmosphere = renderPreset?.recommendedAtmosphere.join(", ") ?? "";
  const presetMaterials = renderPreset?.recommendedMaterials.join(", ") ?? "";
  const presetCamera = renderPreset?.recommendedCamera.join(", ") ?? "";
  const presetKeywords = renderPreset?.promptKeywords.join(", ") ?? "";
  const presetNegativeRules = renderPreset?.negativePromptRules ?? [];
  const caseTitle = renderCase?.title ?? "No specific render case selected";
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

  const intentRefinement = refineProjectIntent({
    rawIntent: draftPrompt,
    taxonomyLabel,
    renderPreset,
    renderCase
  });
  const negativePrompt = buildNegativePrompt([
    ...selections.negativePrompts,
    ...presetNegativeRules
  ]);
  const intentDirectiveText = intentRefinement.intentDirectives.join(" ");

  const finalEnglishPrompt = [
    intentRefinement.refinedIntent,
    `${selections.projectContext.projectName}, ${selections.projectContext.buildingFunction}, taxonomy: ${taxonomyLabel || "custom taxonomy"}.`,
    `Render preset: ${presetTitle}; preset keywords: ${presetKeywords || "architectural clarity, spatial hierarchy, material fidelity"}.`,
    `Selected render case reference: ${caseTitle} (${sourceCategory}); ${caseStructure}.`,
    `Scene: ${capitalize(selections.spatialScene.sceneType)} with view control ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}; middle ground: ${selections.spatialScene.middleGround}; background: ${selections.spatialScene.background}.`,
    `Material and facade system: facade ${selections.materialDetail.facade}; ground ${selections.materialDetail.ground}; roof ${selections.materialDetail.roof}; landscape ${selections.materialDetail.landscape}; references ${materialReferences}.`,
    `Atmosphere and lighting: ${selections.materialDetail.lightingDetail}; references ${atmosphereReferences}.`,
    `Camera and composition: ${selections.cameraComposition}; references ${cameraReferences}.`,
    `Rendering style: ${selections.visualStyle}; style references ${styleReferences}.`,
    `Refined intent directives: ${intentDirectiveText}`,
    "Architecture prompt rules: treat taxonomy and preset as recommended starting points, preserve editable user adjustments, keep geometry legible, maintain facade rhythm, use realistic material scale, and avoid decorative clutter.",
    `Negative prompt: ${negativePrompt}.`
  ].join(" ");

  const englishPrompt = [
    "[Raw User Intent]",
    intentRefinement.rawIntent,
    "",
    "[Refined Project Intent]",
    intentRefinement.refinedIntent,
    `Intent Directives: ${intentDirectiveText}`,
    "",
    "[Architectural Subject]",
    `Building Taxonomy: ${taxonomyLabel || "Custom taxonomy"}.`,
    `Selected Render Preset: ${presetTitle}.`,
    `Selected Render Case: ${caseTitle}.`,
    `Source Category: ${sourceCategory}.`,
    `Case Structure: ${caseStructure}.`,
    `Project Name: ${selections.projectContext.projectName}.`,
    `Building Type: ${selections.projectContext.buildingFunction}.`,
    `Location: ${selections.projectContext.location}.`,
    `Design Concept: ${selections.projectContext.designConcept}.`,
    "",
    "[Scene and Spatial Composition]",
    `Scene Type: ${selections.spatialScene.sceneType}.`,
    `Preset Scene Recommendations: ${renderPreset?.recommendedSceneTypes.join(", ") ?? "custom scene"}.`,
    `View Control: ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}.`,
    `Middle Ground: ${selections.spatialScene.middleGround}.`,
    `Background: ${selections.spatialScene.background}.`,
    `Refined Intent Influence: ${intentDirectiveText}`,
    "",
    "[Material and Facade System]",
    `Facade Material: ${selections.materialDetail.facade}.`,
    `Ground Material: ${selections.materialDetail.ground}.`,
    `Roof Material: ${selections.materialDetail.roof}.`,
    `Landscape Material: ${selections.materialDetail.landscape}.`,
    `Preset Material Recommendations: ${presetMaterials || "custom materials"}.`,
    `Material References: ${materialReferences}.`,
    `Refined Intent Influence: ${intentDirectiveText}`,
    "",
    "[Atmosphere and Lighting]",
    `Lighting Detail: ${selections.materialDetail.lightingDetail}.`,
    `Preset Atmosphere Recommendations: ${presetAtmosphere || "custom atmosphere"}.`,
    `Atmosphere References: ${atmosphereReferences}.`,
    `Refined Intent Influence: ${intentDirectiveText}`,
    "",
    "[Camera and Composition]",
    `Camera Mode: ${selections.cameraComposition}.`,
    `Preset Camera Recommendations: ${presetCamera || "custom camera"}.`,
    `Camera References: ${cameraReferences}.`,
    `Refined Intent Influence: ${intentDirectiveText}`,
    "",
    "[Rendering Style]",
    `Style Direction: ${selections.visualStyle}.`,
    `Preset Rendering Style: ${renderPreset?.recommendedRenderingStyle ?? "custom style"}.`,
    `Style References: ${styleReferences}.`,
    `Reusable Pattern: ${renderCase?.reusablePromptPattern ?? renderPreset?.designIntentHint ?? finalEnglishPrompt}.`,
    `Model Suitability: ${renderCase?.modelSuitability?.join(", ") ?? "local template optimization"}.`,
    "Optimization Rules: taxonomy and preset guide the prompt, selected case supplies reference structure, and manual workspace edits remain authoritative.",
    "",
    "[Negative Prompt]",
    negativePrompt,
    "",
    "[Final English Prompt]",
    finalEnglishPrompt
  ].join("\n");

  const explanation = [
    `Raw user intent is refined into a professional ArchViz intent using local mock semantic keyword matching.`,
    `Taxonomy (${taxonomyLabel || "custom taxonomy"}), preset (${presetTitle}), and selected case (${caseTitle}) are used as context for intent refinement.`,
    "Refined intent directives influence architectural subject framing, scene composition, material language, atmosphere, camera, rendering style, and final prompt assembly.",
    "Preset guidance remains a recommended starting point while manual workspace adjustments stay editable.",
    "Negative constraints combine default quality safeguards with preset-specific risk control."
  ].join("\n");

  return {
    englishPrompt,
    chineseExplanation: explanation,
    copyReadyFinalPrompt: finalEnglishPrompt,
    improvementChecklist: [
      "Taxonomy matching is explicit and case filtering is strict by taxonomy path compatibility.",
      "Project Intent is refined locally and reused across multiple prompt sections.",
      "Selected case and preset both influence prompt structure without locking user edits.",
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

// TODO(OpenAI): Replace template assembly with OpenAI Responses API prompt optimization.
// TODO(OpenAI): Add taxonomy-aware retrieval and evaluation loops for prompt quality.
