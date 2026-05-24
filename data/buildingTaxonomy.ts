import type { BuildingTaxonomyNode } from "@/types/buildingTaxonomy";

export const buildingTaxonomy: BuildingTaxonomyNode[] = [
  {
    id: "civil-buildings",
    labelEn: "Civil Buildings",
    labelZh: "民用建筑",
    children: [
      {
        id: "residential-buildings",
        labelEn: "Residential Buildings",
        labelZh: "居住建筑"
      },
      {
        id: "public-buildings",
        labelEn: "Public Buildings",
        labelZh: "公共建筑",
        children: [
          {
            id: "educational-buildings",
            labelEn: "Educational Buildings",
            labelZh: "教育建筑"
          },
          {
            id: "office-buildings",
            labelEn: "Office Buildings",
            labelZh: "办公建筑"
          },
          {
            id: "research-buildings",
            labelEn: "Research Buildings",
            labelZh: "科研建筑"
          },
          {
            id: "commercial-buildings",
            labelEn: "Commercial Buildings",
            labelZh: "商业建筑"
          },
          {
            id: "financial-buildings",
            labelEn: "Financial Buildings",
            labelZh: "金融建筑"
          },
          {
            id: "cultural-entertainment",
            labelEn: "Cultural and Entertainment Buildings",
            labelZh: "文娱建筑"
          },
          {
            id: "medical-buildings",
            labelEn: "Medical Buildings",
            labelZh: "医疗建筑"
          },
          {
            id: "sports-buildings",
            labelEn: "Sports Buildings",
            labelZh: "体育建筑"
          },
          {
            id: "transportation-buildings",
            labelEn: "Transportation Buildings",
            labelZh: "交通建筑"
          },
          {
            id: "civil-affairs-buildings",
            labelEn: "Civil Affairs Buildings",
            labelZh: "民政建筑"
          },
          {
            id: "judicial-buildings",
            labelEn: "Judicial Buildings",
            labelZh: "司法建筑"
          },
          {
            id: "religious-buildings",
            labelEn: "Religious Buildings",
            labelZh: "宗教建筑"
          },
          {
            id: "landscape-garden-buildings",
            labelEn: "Landscape / Garden Buildings",
            labelZh: "园林建筑"
          },
          {
            id: "memorial-buildings",
            labelEn: "Memorial Buildings",
            labelZh: "纪念建筑"
          }
        ]
      }
    ]
  },
  {
    id: "industrial-buildings",
    labelEn: "Industrial Buildings",
    labelZh: "工业建筑"
  },
  {
    id: "agricultural-buildings",
    labelEn: "Agricultural Buildings",
    labelZh: "农业建筑"
  }
];
