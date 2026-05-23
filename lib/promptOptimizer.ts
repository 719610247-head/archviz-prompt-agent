import type {
  OptimizationResult,
  PromptSelections
} from "@/types/archviz";

interface OptimizationInput {
  draftPrompt: string;
  selections: PromptSelections;
}

export function buildOptimizedPrompt({
  draftPrompt,
  selections
}: OptimizationInput): OptimizationResult {
  const baseIntent = draftPrompt.trim().length
    ? draftPrompt.trim()
    : "Architectural visualization for design communication";

  const structuredPrompt = [
    "[Project Intent]",
    baseIntent,
    "",
    "[Scene Setup]",
    `${capitalize(selections.sceneType)} view of a ${selections.buildingType}.`,
    "",
    "[Material System]",
    `Facade: ${selections.materials.facade}.`,
    `Ground: ${selections.materials.ground}.`,
    `Roof: ${selections.materials.roof}.`,
    `Landscape: ${selections.materials.landscape}.`,
    "",
    "[Atmosphere + Light]",
    `${capitalize(selections.atmosphere)} atmosphere with physically plausible lighting behavior.`,
    "",
    "[Camera + Composition]",
    `${capitalize(selections.cameraComposition)} composition with clear depth layering and legible human scale.`,
    "",
    "[Output Direction]",
    `${capitalize(selections.outputStyle)} with architecture-first storytelling, accurate material response, and balanced post-processing.`,
    "",
    "[Quality Constraints]",
    "Avoid visual clutter, preserve facade readability, keep vegetation scale consistent, and maintain realistic shadows."
  ].join("\n");

  const improvementChecklist = [
    "Scene and building type are explicitly anchored.",
    "All key material categories are defined.",
    "Atmosphere and camera logic are aligned for narrative clarity.",
    "Output style is tuned for architectural communication."
  ];

  return {
    structuredPrompt,
    summary: `${capitalize(selections.outputStyle)} optimized for ${selections.sceneType} ${selections.buildingType} presentation.`,
    improvementChecklist
  };
}

function capitalize(value: string): string {
  if (!value.length) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

// TODO(OpenAI): Replace template assembly with OpenAI Responses API prompt optimization.
// TODO(OpenAI): Add evaluation loop to score prompt quality and suggest iterative refinements.
