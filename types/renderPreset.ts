import type {
  BuildingFunction,
  CameraComposition,
  SceneType,
  VisualStyle
} from "@/types/archviz";
import type { TaxonomyPath } from "@/types/buildingTaxonomy";

export interface RenderPreset {
  id: string;
  taxonomyPath: TaxonomyPath;
  buildingCategoryLabel: string;
  buildingType: BuildingFunction;
  recommendedAtmosphere: string[];
  recommendedMaterials: string[];
  recommendedCamera: CameraComposition[];
  recommendedSceneTypes: SceneType[];
  recommendedRenderingStyle: VisualStyle;
  promptKeywords: string[];
  negativePromptRules: string[];
  designIntentHint: string;
}
