export type IntentRefinementSource = "ai" | "local";

export interface IntentRefinementResult {
  refinedIntent: string;
  designDirectives: string[];
  visualPriorities: string[];
  riskWarnings: string[];
  promptStrategy: string;
  source: IntentRefinementSource;
  provider?: string;
}

export interface IntentRefinementRequest {
  rawIntent: string;
  visualizationTaskType?: string;
  buildingTaxonomy?: string[];
  selectedPreset?: string;
  selectedCase?: string;
  siteContext?: string;
  materialIntent?: string;
  cameraIntent?: string;
  atmosphereIntent?: string;
}

export type IntentRefinementStatus =
  | "ai-active"
  | "local-fallback"
  | "refining"
  | "ai-failed";
