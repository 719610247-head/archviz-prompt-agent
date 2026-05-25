import type { BuildingFunction, SceneType, VisualizationTaskType } from "@/types/archviz";
import type { TaxonomyPath } from "@/types/buildingTaxonomy";

export interface RealPromptCase {
  id: string;
  title: string;
  sourceCategory: string;
  visualizationTaskType: VisualizationTaskType;
  buildingType: BuildingFunction;
  sceneType: SceneType;
  siteContext: string;
  caseSource: string;
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
  buildingTaxonomyPath: TaxonomyPath;
  compatibleTaxonomyPaths?: TaxonomyPath[];
  renderPresetId?: string;
  compatiblePresetIds?: string[];
}
