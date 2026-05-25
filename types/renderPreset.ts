import type {
  BuildingFunction,
  CameraComposition,
  SceneType,
  VisualizationTaskType,
  VisualStyle
} from "@/types/archviz";
import type { TaxonomyPath } from "@/types/buildingTaxonomy";

export interface RenderPreset {
  id: string;
  taxonomyPath: TaxonomyPath;
  buildingCategoryLabel: string;
  buildingType: BuildingFunction;
  recommendedVisualizationTaskTypes: VisualizationTaskType[];
  recommendedAtmosphere: string[];
  recommendedMaterials: string[];
  recommendedCamera: CameraComposition[];
  recommendedSceneTypes: SceneType[];
  recommendedRenderingStyle: VisualStyle;
  promptKeywords: string[];
  negativePromptRules: string[];
  designIntentHint: string;
}
