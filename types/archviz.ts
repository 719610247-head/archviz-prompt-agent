export const SCENE_TYPES = [
  "exterior",
  "interior",
  "aerial view",
  "street view",
  "masterplan",
  "section perspective"
] as const;

export const BUILDING_TYPES = [
  "museum",
  "community center",
  "residential",
  "commercial",
  "school",
  "cultural building"
] as const;

export const ATMOSPHERES = [
  "daylight",
  "dusk",
  "rainy day",
  "foggy",
  "cinematic",
  "soft Nordic",
  "Japanese minimal"
] as const;

export const CAMERA_COMPOSITIONS = [
  "eye-level",
  "axonometric",
  "wide angle",
  "close-up",
  "symmetrical",
  "documentary style"
] as const;

export const OUTPUT_STYLES = [
  "realistic render",
  "competition board",
  "concept render",
  "diagrammatic render"
] as const;

export type SceneType = (typeof SCENE_TYPES)[number];
export type BuildingType = (typeof BUILDING_TYPES)[number];
export type Atmosphere = (typeof ATMOSPHERES)[number];
export type CameraComposition = (typeof CAMERA_COMPOSITIONS)[number];
export type OutputStyle = (typeof OUTPUT_STYLES)[number];

export interface MaterialSystem {
  facade: string;
  ground: string;
  roof: string;
  landscape: string;
}

export interface PromptSelections {
  sceneType: SceneType;
  buildingType: BuildingType;
  materials: MaterialSystem;
  atmosphere: Atmosphere;
  cameraComposition: CameraComposition;
  outputStyle: OutputStyle;
}

export interface LearningCase {
  id: string;
  name: string;
  originalPrompt: string;
  optimizedPrompt: string;
  styleTags: string[];
  improvementNotes: string[];
  preset: PromptSelections;
}

export interface StyleReference {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface OptimizationResult {
  structuredPrompt: string;
  summary: string;
  improvementChecklist: string[];
}
