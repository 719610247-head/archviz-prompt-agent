import type { BuildingFunction, SceneType } from "@/types/archviz";
import type { TaxonomyPath } from "@/types/buildingTaxonomy";

export interface RealPromptCase {
  id: string;
  title: string;
  sourceCategory: string;
  buildingType: BuildingFunction;
  sceneType: SceneType;
  viewControl: string;
  materialSystem: string[];
  atmosphere: string[];
  cameraComposition: string[];
  entourage: string[];
  negativePromptRules: string[];
  optimizationStrategy: string[];
  reusablePromptPattern: string;
  modelSuitability: string[];
  taxonomyPath: TaxonomyPath;
  compatibleTaxonomyPaths?: TaxonomyPath[];
  compatiblePresetIds?: string[];
}
