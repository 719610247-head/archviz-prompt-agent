export const SCENE_TYPES = [
  "exterior",
  "interior",
  "aerial",
  "street",
  "masterplan",
  "section perspective",
  "blue-hour exterior",
  "interior close-up",
  "material editing",
  "local editing",
  "cityscape"
] as const;

export const BUILDING_FUNCTIONS = [
  "museum",
  "community center",
  "public building",
  "library",
  "residential",
  "commercial",
  "school",
  "cultural building",
  "office building",
  "research building",
  "financial building",
  "medical building",
  "sports building",
  "transportation hub",
  "memorial building",
  "factory",
  "industrial renovation",
  "agricultural production building",
  "market",
  "mixed-use complex",
  "campus",
  "swimming hall",
  "cityscape",
  "eco-city",
  "art center",
  "glass corridor",
  "material editing",
  "local editing"
] as const;

export const VISUAL_STYLES = [
  "realistic render",
  "competition board",
  "Japanese minimal",
  "Nordic soft tone",
  "cinematic atmosphere",
  "diagrammatic architecture visualization",
  "photoreal commercial render",
  "aerial masterplan visualization",
  "AI concept visualization",
  "material edit preview"
] as const;

export const CAMERA_COMPOSITIONS = [
  "eye-level",
  "wide angle",
  "axonometric",
  "symmetrical composition",
  "documentary composition",
  "bird's-eye",
  "drone aerial",
  "close-up",
  "one-point perspective",
  "segmentation mask",
  "zoomed local edit"
] as const;

export const NEGATIVE_PROMPT_OPTIONS = [
  "avoid distorted geometry",
  "avoid messy people",
  "avoid overexposed image",
  "avoid unreadable facade",
  "avoid random objects"
] as const;

export type SceneType = (typeof SCENE_TYPES)[number];
export type BuildingFunction = (typeof BUILDING_FUNCTIONS)[number];
export type VisualStyle = (typeof VISUAL_STYLES)[number];
export type CameraComposition = (typeof CAMERA_COMPOSITIONS)[number];
export type NegativePromptOption = (typeof NEGATIVE_PROMPT_OPTIONS)[number];

export interface ProjectContext {
  projectName: string;
  location: string;
  designConcept: string;
  buildingFunction: BuildingFunction;
}

export interface SpatialScene {
  sceneType: SceneType;
  foreground: string;
  middleGround: string;
  background: string;
}

export interface MaterialDetail {
  facade: string;
  ground: string;
  roof: string;
  landscape: string;
  lightingDetail: string;
}

export interface PromptSelections {
  projectContext: ProjectContext;
  spatialScene: SpatialScene;
  materialDetail: MaterialDetail;
  visualStyle: VisualStyle;
  cameraComposition: CameraComposition;
  negativePrompts: NegativePromptOption[];
}

export interface LearningCase {
  id: string;
  title: string;
  description: string;
  buildingType: BuildingFunction;
  sceneType: SceneType;
  originalPrompt: string;
  optimizedPrompt: string;
  styleTags: string[];
  materialTags: string[];
  atmosphereTags: string[];
  cameraTags: string[];
  improvementNotes: string[];
  preset: PromptSelections;
  sourceCategory?: string;
  viewControl?: string;
  entourage?: string;
  optimizationStrategy?: string;
  reusablePromptPattern?: string;
  modelSuitability?: string[];
}

export interface StyleReference {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface OptimizationResult {
  englishPrompt: string;
  chineseExplanation: string;
  copyReadyFinalPrompt: string;
  improvementChecklist: string[];
}
