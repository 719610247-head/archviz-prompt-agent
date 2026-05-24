import type { LearningCase, OptimizationResult, PromptSelections } from "@/types/archviz";

interface OptimizationInput {
  draftPrompt: string;
  selections: PromptSelections;
  renderCase: LearningCase | null;
}

export function buildOptimizedPrompt({
  draftPrompt,
  selections,
  renderCase
}: OptimizationInput): OptimizationResult {
  const projectIntent = draftPrompt.trim().length
    ? draftPrompt.trim()
    : "Create a clear architectural visualization that communicates design intent and spatial hierarchy.";
  const negativePrompt = buildNegativePrompt(selections.negativePrompts);
  const caseTitle = renderCase?.title ?? "Custom local render case";
  const caseStructure = renderCase?.description ?? "Local mock render case structure";
  const sourceCategory = renderCase?.sourceCategory ?? "local mock case";
  const viewControl = renderCase?.viewControl ?? selections.cameraComposition;
  const styleReferences = renderCase?.styleTags.join(", ") ?? selections.visualStyle;
  const materialReferences =
    renderCase?.materialTags.join(", ") ??
    [
      selections.materialDetail.facade,
      selections.materialDetail.ground,
      selections.materialDetail.roof
    ].join(", ");
  const atmosphereReferences =
    renderCase?.atmosphereTags.join(", ") ?? selections.materialDetail.lightingDetail;
  const cameraReferences = renderCase?.cameraTags.join(", ") ?? selections.cameraComposition;

  const finalEnglishPrompt = [
    projectIntent,
    `${selections.projectContext.projectName}, ${selections.projectContext.buildingFunction} in ${selections.projectContext.location}, concept: ${selections.projectContext.designConcept}.`,
    `${capitalize(selections.spatialScene.sceneType)} composition based on ${caseTitle} (${sourceCategory}): ${caseStructure}.`,
    `View control: ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}; middle ground: ${selections.spatialScene.middleGround}; background: ${selections.spatialScene.background}.`,
    `Facade system: ${selections.materialDetail.facade}; ground: ${selections.materialDetail.ground}; roof: ${selections.materialDetail.roof}; landscape: ${selections.materialDetail.landscape}.`,
    `Atmosphere and lighting: ${selections.materialDetail.lightingDetail}; references: ${atmosphereReferences}.`,
    `Camera: ${selections.cameraComposition}; camera references: ${cameraReferences}.`,
    `Rendering style: ${selections.visualStyle}; style references: ${styleReferences}; material references: ${materialReferences}.`,
    "Architecture prompt rules: maintain readable facade logic, disciplined spatial hierarchy, realistic material scale, clean edges, coherent entourage, and controlled exposure.",
    `Negative prompt: ${negativePrompt}.`
  ].join(" ");

  const englishPrompt = [
    "[Project Intent]",
    projectIntent,
    "",
    "[Architectural Subject]",
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
    `View Control: ${viewControl}.`,
    `Foreground: ${selections.spatialScene.foreground}.`,
    `Middle Ground: ${selections.spatialScene.middleGround}.`,
    `Background: ${selections.spatialScene.background}.`,
    "",
    "[Material and Facade System]",
    `Facade Material: ${selections.materialDetail.facade}.`,
    `Ground Material: ${selections.materialDetail.ground}.`,
    `Roof Material: ${selections.materialDetail.roof}.`,
    `Landscape Material: ${selections.materialDetail.landscape}.`,
    `Material References: ${materialReferences}.`,
    "",
    "[Atmosphere and Lighting]",
    `Lighting Detail: ${selections.materialDetail.lightingDetail}.`,
    `Atmosphere References: ${atmosphereReferences}.`,
    "",
    "[Camera and Composition]",
    `Camera Mode: ${selections.cameraComposition}.`,
    `Camera References: ${cameraReferences}.`,
    "",
    "[Rendering Style]",
    `Style Direction: ${selections.visualStyle}.`,
    `Style References: ${styleReferences}.`,
    `Reusable Pattern: ${renderCase?.reusablePromptPattern ?? finalEnglishPrompt}.`,
    `Model Suitability: ${renderCase?.modelSuitability?.join(", ") ?? "local template optimization"}.`,
    "Optimization Rules: keep architectural geometry legible, preserve facade rhythm, avoid decorative clutter, balance human scale with material fidelity.",
    "",
    "[Negative Prompt]",
    negativePrompt,
    "",
    "[Final English Prompt]",
    finalEnglishPrompt
  ].join("\n");

  const chineseExplanation = [
    `该提示词围绕项目“${selections.projectContext.projectName}”构建，地点为“${selections.projectContext.location}”，并强调“${selections.projectContext.designConcept}”这一设计概念。`,
    `建筑类型由所选案例“${caseTitle}”自动推导为“${selections.projectContext.buildingFunction}”，用户输入主要进入 Project Intent 部分。`,
    `空间场景采用 ${selections.spatialScene.sceneType} 视角，明确前景/中景/背景层次，保证画面叙事清晰。`,
    "材料、氛围、镜头和风格参考来自案例结构，并可结合当前模块选择继续调整。",
    `视觉风格为“${selections.visualStyle}”，构图方式为“${selections.cameraComposition}”，用于强化表达目标。`,
    "负面约束用于降低几何畸变、立面不可读和杂乱元素等常见问题。"
  ].join("\n");

  return {
    englishPrompt,
    chineseExplanation,
    copyReadyFinalPrompt: finalEnglishPrompt,
    improvementChecklist: [
      "Render case structure drives building type, scene type, and references.",
      "User input is focused into the Project Intent section.",
      "Scene depth is separated into foreground, middle ground, and background.",
      "Material, atmosphere, camera, and style constraints are aligned for cleaner output."
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
