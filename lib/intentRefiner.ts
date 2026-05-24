import type { LearningCase } from "@/types/archviz";
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
}

const DEFAULT_RAW_INTENT =
  "Create a clear architectural visualization that communicates design intent and spatial hierarchy.";

export function refineProjectIntent({
  rawIntent,
  taxonomyLabel,
  renderPreset,
  renderCase
}: IntentRefinerInput): RefinedIntentResult {
  const normalizedRawIntent = rawIntent.trim() || DEFAULT_RAW_INTENT;
  const signalText = normalizedRawIntent.toLowerCase();
  const directives = new Set<string>();

  addSignalDirectives(signalText, directives);
  addChineseSignalDirectives(normalizedRawIntent, directives);

  if (!directives.size) {
    directives.add("Maintain clear spatial hierarchy, legible architectural subject, and balanced visual readability.");
  }

  const contextLine = [
    `taxonomy ${taxonomyLabel || "custom taxonomy"}`,
    renderPreset ? `preset ${renderPreset.buildingCategoryLabel}` : null,
    renderCase ? `case ${renderCase.title}` : "no specific case"
  ]
    .filter(Boolean)
    .join(", ");

  const refinedIntent = `Professional ArchViz intent: ${normalizedRawIntent}. Translate this into a coherent rendering strategy for ${contextLine}. ${Array.from(
    directives
  ).join(" ")}`;

  return {
    rawIntent: normalizedRawIntent,
    refinedIntent,
    intentDirectives: Array.from(directives)
  };
}

function addSignalDirectives(signalText: string, directives: Set<string>): void {
  if (includesAny(signalText, ["calm", "quiet"])) {
    directives.add("Use a calm atmosphere, restrained visual tone, soft daylight, and low visual noise.");
  }

  if (includesAny(signalText, ["civic", "public", "open"])) {
    directives.add("Highlight accessible frontage, readable circulation, public activity, and human-scale civic space.");
  }

  if (includesAny(signalText, ["culture", "museum", "gallery", "exhibition"])) {
    directives.add("Strengthen cultural identity, gallery-like clarity, sculptural massing, and controlled material expression.");
  }

  if (includesAny(signalText, ["commercial", "retail", "active"])) {
    directives.add("Emphasize active street frontage, transparent facade behavior, warm lighting, and pedestrian flow.");
  }

  if (includesAny(signalText, ["rainy", "wet"])) {
    directives.add("Include wet ground reflections, soft overcast light, reflective pavement, and atmospheric depth.");
  }

  if (includesAny(signalText, ["dusk", "sunset"])) {
    directives.add("Use warm interior glow, long shadows, dusk sky gradient, and cinematic lighting control.");
  }

  if (includesAny(signalText, ["material", "texture", "facade"])) {
    directives.add("Increase material fidelity, facade texture readability, and realistic surface detail.");
  }

  if (includesAny(signalText, ["people", "activity", "crowd"])) {
    directives.add("Add controlled human activity, avoid overcrowding, and keep the architectural subject clear.");
  }
}

function addChineseSignalDirectives(rawIntent: string, directives: Set<string>): void {
  if (includesAny(rawIntent, ["安静", "宁静"])) {
    directives.add("Use a calm atmosphere, restrained visual tone, soft daylight, and low visual noise.");
  }

  if (includesAny(rawIntent, ["公共性", "开放"])) {
    directives.add("Highlight accessible frontage, readable circulation, public activity, and human-scale civic space.");
  }

  if (includesAny(rawIntent, ["文化", "展览", "博物馆", "美术馆"])) {
    directives.add("Strengthen cultural identity, gallery-like clarity, sculptural massing, and controlled material expression.");
  }

  if (includesAny(rawIntent, ["商业", "活力", "零售"])) {
    directives.add("Emphasize active street frontage, transparent facade behavior, warm lighting, and pedestrian flow.");
  }

  if (includesAny(rawIntent, ["雨天", "湿润"])) {
    directives.add("Include wet ground reflections, soft overcast light, reflective pavement, and atmospheric depth.");
  }

  if (includesAny(rawIntent, ["黄昏", "日落"])) {
    directives.add("Use warm interior glow, long shadows, dusk sky gradient, and cinematic lighting control.");
  }

  if (includesAny(rawIntent, ["材质", "纹理", "立面"])) {
    directives.add("Increase material fidelity, facade texture readability, and realistic surface detail.");
  }

  if (includesAny(rawIntent, ["人群", "活动"])) {
    directives.add("Add controlled human activity, avoid overcrowding, and keep the architectural subject clear.");
  }
}

function includesAny(source: string, keywords: string[]): boolean {
  return keywords.some((keyword) => source.includes(keyword));
}

// TODO(OpenAI): Replace mock intent refinement with LLM-based semantic intent extraction.
