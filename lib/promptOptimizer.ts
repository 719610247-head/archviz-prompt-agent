import type { OptimizationResult, PromptSelections } from "@/types/archviz";

interface OptimizationInput {
  draftPrompt: string;
  selections: PromptSelections;
}

export function buildOptimizedPrompt({
  draftPrompt,
  selections
}: OptimizationInput): OptimizationResult {
  const projectIntent = draftPrompt.trim().length
    ? draftPrompt.trim()
    : "Create a clear architectural visualization that communicates design intent and spatial hierarchy.";

  const englishPrompt = [
    "[Project Context]",
    `Project Name: ${selections.projectContext.projectName}.`,
    `Location: ${selections.projectContext.location}.`,
    `Design Concept: ${selections.projectContext.designConcept}.`,
    `Building Function: ${selections.projectContext.buildingFunction}.`,
    "",
    "[Spatial Scene]",
    `Scene Type: ${selections.spatialScene.sceneType}.`,
    `Foreground: ${selections.spatialScene.foreground}.`,
    `Middle Ground: ${selections.spatialScene.middleGround}.`,
    `Background: ${selections.spatialScene.background}.`,
    "",
    "[Material and Detail]",
    `Facade Material: ${selections.materialDetail.facade}.`,
    `Ground Material: ${selections.materialDetail.ground}.`,
    `Roof Material: ${selections.materialDetail.roof}.`,
    `Landscape Material: ${selections.materialDetail.landscape}.`,
    `Lighting Detail: ${selections.materialDetail.lightingDetail}.`,
    "",
    "[Visual Style]",
    `${selections.visualStyle}.`,
    "",
    "[Camera and Composition]",
    `${selections.cameraComposition}.`,
    "",
    "[Design Intent]",
    projectIntent,
    "",
    "[Negative Prompt]",
    buildNegativePrompt(selections.negativePrompts)
  ].join("\n");

  const chineseExplanation = [
    `该提示词围绕项目“${selections.projectContext.projectName}”构建，地点为“${selections.projectContext.location}”，并强调“${selections.projectContext.designConcept}”这一设计概念。`,
    `空间场景采用 ${selections.spatialScene.sceneType} 视角，明确前景/中景/背景层次，保证画面叙事清晰。`,
    `材料与细节部分指定了立面、地面、屋面、景观和光照细节，提升渲染可控性与真实感。`,
    `视觉风格为“${selections.visualStyle}”，构图方式为“${selections.cameraComposition}”，用于强化表达目标。`,
    `负面约束用于降低几何畸变、立面不可读和杂乱元素等常见问题。`
  ].join("\n");

  const copyReadyFinalPrompt = [
    `${projectIntent}`,
    `Project ${selections.projectContext.projectName} in ${selections.projectContext.location}, ${selections.projectContext.buildingFunction}, concept: ${selections.projectContext.designConcept}.`,
    `${capitalize(selections.spatialScene.sceneType)} scene with foreground ${selections.spatialScene.foreground}, middle ground ${selections.spatialScene.middleGround}, background ${selections.spatialScene.background}.`,
    `Materials: facade ${selections.materialDetail.facade}; ground ${selections.materialDetail.ground}; roof ${selections.materialDetail.roof}; landscape ${selections.materialDetail.landscape}; lighting ${selections.materialDetail.lightingDetail}.`,
    `Visual style: ${selections.visualStyle}. Camera/composition: ${selections.cameraComposition}.`,
    `Negative prompt: ${buildNegativePrompt(selections.negativePrompts)}.`
  ].join(" ");

  return {
    englishPrompt,
    chineseExplanation,
    copyReadyFinalPrompt,
    improvementChecklist: [
      "Project context is explicit and traceable.",
      "Scene depth is separated into foreground, middle ground, and background.",
      "Material and lighting constraints are fully defined.",
      "Style, composition, and negative constraints are aligned for cleaner output."
    ]
  };
}

function buildNegativePrompt(negativePrompts: string[]): string {
  if (!negativePrompts.length) {
    return "avoid distorted geometry, avoid messy people, avoid overexposed image, avoid unreadable facade, avoid random objects";
  }

  return negativePrompts.join(", ");
}

function capitalize(value: string): string {
  if (!value.length) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

// TODO(OpenAI): Replace template assembly with OpenAI Responses API prompt optimization.
// TODO(OpenAI): Add evaluation loop to score prompt quality and suggest iterative refinements.
