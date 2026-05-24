export interface BuildingTaxonomyNode {
  id: string;
  labelEn: string;
  labelZh: string;
  children?: BuildingTaxonomyNode[];
}

export type TaxonomyPath = string[];
