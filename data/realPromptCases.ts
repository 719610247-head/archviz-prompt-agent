import type {
  CameraComposition,
  LearningCase,
  NegativePromptOption,
  VisualStyle
} from "@/types/archviz";
import type { RealPromptCase } from "@/types/realPromptCase";

const DEFAULT_NEGATIVE_PROMPTS: NegativePromptOption[] = [
  "avoid distorted geometry",
  "avoid messy people",
  "avoid overexposed image",
  "avoid unreadable facade",
  "avoid random objects"
];

export const realPromptCases: RealPromptCase[] = [
  {
    id: "real-01",
    title: "Community Museum Aerial Render",
    sourceCategory: "public culture aerial",
    visualizationTaskType: "Aerial Render / 鸟瞰效果图",
    buildingType: "museum",
    sceneType: "aerial",
    siteContext: "civic plaza district",
    caseSource: "Local structured prompt library",
    viewControl: "High oblique aerial view with clear roofscape, entry plaza, and surrounding blocks.",
    materialSystem: ["warm stone", "low-iron glass", "bronze shading fins", "planted roof"],
    atmosphere: ["clear daylight", "civic calm", "soft urban haze"],
    cameraComposition: ["drone aerial", "three-quarter view", "readable site boundary"],
    entourage: ["small visitor groups", "public plaza activity", "trees and benches"],
    negativePromptRules: [
      "avoid toy-like massing",
      "avoid warped roofs",
      "avoid oversized people",
      "avoid cluttered surroundings"
    ],
    optimizationStrategy: [
      "Prioritize urban context before material detail.",
      "Separate roofscape, plaza, and street edge for spatial readability."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    compatiblePresetIds: ["museum-art-gallery"],
    reusablePromptPattern:
      "Aerial architectural visualization of a civic museum, clear massing and roofscape, active entry plaza, material palette specified, realistic daylight, readable urban context.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "DALL-E style ideation"]
  },
  {
    id: "real-02",
    title: "Factory Renovation Aerial Render",
    sourceCategory: "adaptive reuse aerial",
    visualizationTaskType: "Aerial Render / 鸟瞰效果图",
    buildingType: "factory",
    sceneType: "aerial",
    siteContext: "industrial neighborhood",
    caseSource: "Local structured prompt library",
    viewControl: "Oblique aerial view showing preserved industrial sheds, new public spine, and phased renovation zones.",
    materialSystem: ["weathered brick", "exposed steel truss", "new glass inserts", "sawtooth roof"],
    atmosphere: ["late afternoon", "adaptive reuse clarity", "warm industrial texture"],
    cameraComposition: ["drone aerial", "diagonal circulation spine", "before-after legibility"],
    entourage: ["small workers", "visitors", "service vehicles", "courtyard planting"],
    negativePromptRules: [
      "avoid generic warehouse boxes",
      "avoid collapsing roof geometry",
      "avoid excessive rust",
      "avoid illegible renovation boundaries"
    ],
    optimizationStrategy: [
      "Contrast retained industrial fabric with new interventions.",
      "Use circulation and roof rhythm as the organizing structure."
    ],
    taxonomyPath: ["industrial-buildings"],
    buildingTaxonomyPath: ["industrial-buildings"],
    compatiblePresetIds: ["industrial-renovation"],
    reusablePromptPattern:
      "Adaptive reuse aerial render of a renovated factory campus, preserved brick and steel structure, new glass public spine, readable phasing, realistic site activity.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "ControlNet reference workflow"]
  },
  {
    id: "real-03",
    title: "Factory Market Blue-Hour Scene",
    sourceCategory: "adaptive reuse atmosphere",
    visualizationTaskType: "Photorealistic Exterior Render / 写实外部效果图",
    buildingType: "market",
    sceneType: "blue-hour exterior",
    siteContext: "renovated industrial neighborhood",
    caseSource: "Local structured prompt library",
    viewControl: "Street-level blue-hour view looking into a renovated factory market hall.",
    materialSystem: ["brick shell", "black steel canopy", "glass storefronts", "warm timber stalls"],
    atmosphere: ["blue hour", "warm interior glow", "wet pavement reflections"],
    cameraComposition: ["eye-level", "wide angle", "strong entry axis"],
    entourage: ["market visitors", "food stalls", "bicycles", "soft silhouettes"],
    negativePromptRules: [
      "avoid chaotic crowds",
      "avoid neon overload",
      "avoid unreadable signage",
      "avoid smeared reflections"
    ],
    optimizationStrategy: [
      "Balance cool ambient light with warm market interiors.",
      "Keep the historic shell readable behind active foreground life."
    ],
    taxonomyPath: ["industrial-buildings"],
    buildingTaxonomyPath: ["industrial-buildings"],
    compatibleTaxonomyPaths: [["civil-buildings", "public-buildings", "commercial-buildings"]],
    compatiblePresetIds: ["industrial-renovation", "commercial-building"],
    reusablePromptPattern:
      "Blue-hour street render of an adaptive reuse factory market, warm interior stalls inside a brick shell, wet reflective ground, controlled lively public atmosphere.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "image-to-image refinement"]
  },
  {
    id: "real-04",
    title: "Seaside Art Museum Aerial Render",
    sourceCategory: "coastal culture aerial",
    visualizationTaskType: "Aerial Render / 鸟瞰效果图",
    buildingType: "museum",
    sceneType: "aerial",
    siteContext: "coastal site and seaside promenade",
    caseSource: "Local structured prompt library",
    viewControl: "Bird's-eye coastal composition showing museum, shoreline promenade, water edge, and landscape terraces.",
    materialSystem: ["white concrete", "glass curtain wall", "stone promenade", "coastal planting"],
    atmosphere: ["bright coastal daylight", "sea breeze clarity", "subtle water shimmer"],
    cameraComposition: ["bird's-eye", "coastline diagonal", "large-scale site context"],
    entourage: ["promenade visitors", "small boats", "terrace seating", "native grasses"],
    negativePromptRules: [
      "avoid fantasy coastlines",
      "avoid scale mismatch",
      "avoid noisy waves",
      "avoid overexposed white facade"
    ],
    optimizationStrategy: [
      "Use shoreline geometry to anchor the composition.",
      "Control white materials with soft shadow and facade articulation."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    compatiblePresetIds: ["museum-art-gallery"],
    reusablePromptPattern:
      "Coastal aerial museum render with white concrete volumes, shoreline promenade, water reflections, landscape terraces, realistic scale and clear architectural hierarchy.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "aerial concept boards"]
  },
  {
    id: "real-05",
    title: "Vertical Forest Urban Complex",
    sourceCategory: "green mixed-use tower",
    visualizationTaskType: "Photorealistic Exterior Render / 写实外部效果图",
    buildingType: "mixed-use complex",
    sceneType: "street",
    siteContext: "dense urban district",
    caseSource: "Local structured prompt library",
    viewControl: "Urban street-canyon view emphasizing planted balconies, podium frontage, and tower depth.",
    materialSystem: ["glass tower skin", "concrete balcony slabs", "integrated planters", "stone podium"],
    atmosphere: ["clear daylight", "green urban freshness", "high-density calm"],
    cameraComposition: ["wide angle", "vertical framing", "street-to-sky composition"],
    entourage: ["pedestrians", "cyclists", "retail frontage", "street trees"],
    negativePromptRules: [
      "avoid random vegetation blobs",
      "avoid impossible balcony plants",
      "avoid distorted tower taper",
      "avoid cluttered street objects"
    ],
    optimizationStrategy: [
      "Specify planter logic and structural rhythm.",
      "Keep vegetation integrated with facade modules rather than scattered decor."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "commercial-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "commercial-buildings"],
    compatiblePresetIds: ["commercial-building"],
    reusablePromptPattern:
      "Photoreal street view of a vertical forest mixed-use complex, modular planted balconies, active podium, disciplined tower geometry, realistic urban scale.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "facade variation studies"]
  },
  {
    id: "real-06",
    title: "Modern Campus Masterplan",
    sourceCategory: "education masterplan",
    visualizationTaskType: "Masterplan / 总平面图 / 总体规划图",
    buildingType: "campus",
    sceneType: "masterplan",
    siteContext: "urban campus",
    caseSource: "Local structured prompt library",
    viewControl: "Aerial masterplan view with academic clusters, pedestrian axes, landscape courts, and mobility edges.",
    materialSystem: ["light brick", "glass learning commons", "green roofs", "permeable paving"],
    atmosphere: ["bright overcast", "planning clarity", "open academic environment"],
    cameraComposition: ["axonometric", "campus grid", "clear landscape hierarchy"],
    entourage: ["students", "sports fields", "bike paths", "tree allees"],
    negativePromptRules: [
      "avoid miniature model look",
      "avoid repeated cloned buildings",
      "avoid unreadable circulation",
      "avoid excessive road dominance"
    ],
    optimizationStrategy: [
      "Organize by circulation, open space, and program clusters.",
      "Use consistent roof and landscape language for masterplan cohesion."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "educational-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "educational-buildings"],
    compatiblePresetIds: ["school-campus"],
    reusablePromptPattern:
      "Architectural campus masterplan render, academic buildings around courtyards, readable pedestrian network, landscape hierarchy, soft daylight, clean planning visualization.",
    modelSuitability: ["Stable Diffusion", "ControlNet massing workflow", "diagram-to-render workflow"]
  },
  {
    id: "real-07",
    title: "Middle School Exterior Render",
    sourceCategory: "education exterior",
    visualizationTaskType: "Photorealistic Exterior Render / 写实外部效果图",
    buildingType: "school",
    sceneType: "exterior",
    siteContext: "school campus edge",
    caseSource: "Local structured prompt library",
    viewControl: "Eye-level exterior view of school entrance, classroom wings, courtyard edge, and safe drop-off zone.",
    materialSystem: ["light brick", "colored metal panels", "glass lobby", "rubberized play surface"],
    atmosphere: ["morning daylight", "safe and welcoming", "soft shadows"],
    cameraComposition: ["eye-level", "documentary composition", "student-scale framing"],
    entourage: ["students", "teachers", "parents", "school planting"],
    negativePromptRules: [
      "avoid unsafe traffic",
      "avoid exaggerated cartoon colors",
      "avoid distorted window grids",
      "avoid crowded faces"
    ],
    optimizationStrategy: [
      "Make child-scale details and entry sequence explicit.",
      "Use restrained color accents to support identity without visual noise."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "educational-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "educational-buildings"],
    compatiblePresetIds: ["school-campus"],
    reusablePromptPattern:
      "Realistic middle school exterior render, welcoming entrance, classroom wings, safe student circulation, light brick and color accents, morning daylight.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "client presentation render"]
  },
  {
    id: "real-08",
    title: "Indoor Swimming Hall",
    sourceCategory: "sports interior",
    visualizationTaskType: "Photorealistic Interior Render / 写实室内效果图",
    buildingType: "swimming hall",
    sceneType: "interior",
    siteContext: "interior sports hall",
    caseSource: "Local structured prompt library",
    viewControl: "Interior wide-angle view across pool lanes toward roof structure, seating, and daylight wall.",
    materialSystem: ["glulam roof beams", "ceramic pool tile", "acoustic ceiling panels", "translucent facade"],
    atmosphere: ["humid soft light", "clean reflections", "public sports calm"],
    cameraComposition: ["wide angle", "low eye-level", "linear pool perspective"],
    entourage: ["swimmers", "lifeguard", "spectators", "pool equipment"],
    negativePromptRules: [
      "avoid impossible water physics",
      "avoid slippery visual clutter",
      "avoid warped lane lines",
      "avoid harsh glare"
    ],
    optimizationStrategy: [
      "Control reflection, lane geometry, and roof rhythm.",
      "Keep safety equipment and people secondary to spatial clarity."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "sports-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "sports-buildings"],
    compatiblePresetIds: ["sports-building"],
    reusablePromptPattern:
      "Interior render of a modern swimming hall, clear pool lanes, warm roof structure, diffuse daylight, controlled water reflections, realistic sports facility atmosphere.",
    modelSuitability: ["Stable Diffusion", "Midjourney", "interior lighting studies"]
  },
  {
    id: "real-09",
    title: "Futuristic Metropolis",
    sourceCategory: "speculative urban concept",
    visualizationTaskType: "Masterplan / 总平面图 / 总体规划图",
    buildingType: "cityscape",
    sceneType: "cityscape",
    siteContext: "high-density urban district",
    caseSource: "Local structured prompt library",
    viewControl: "High aerial cityscape with layered transit, landmark towers, public decks, and luminous urban depth.",
    materialSystem: ["high-performance glass", "brushed metal", "light bridges", "green sky terraces"],
    atmosphere: ["cinematic dusk", "clean futurism", "controlled glow"],
    cameraComposition: ["drone aerial", "deep perspective", "layered skyline"],
    entourage: ["small transit vehicles", "pedestrian decks", "sky gardens", "light trails"],
    negativePromptRules: [
      "avoid chaotic sci-fi clutter",
      "avoid unreadable scale",
      "avoid melted tower geometry",
      "avoid excessive bloom"
    ],
    optimizationStrategy: [
      "Anchor speculation in believable urban infrastructure.",
      "Use glow and transit as hierarchy, not decoration."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "landscape-garden-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "landscape-garden-buildings"],
    compatibleTaxonomyPaths: [["civil-buildings", "public-buildings", "transportation-buildings"]],
    compatiblePresetIds: [],
    reusablePromptPattern:
      "Futuristic metropolis aerial concept, layered transit and landmark towers, green terraces, cinematic dusk glow, coherent urban planning and readable scale.",
    modelSuitability: ["Midjourney", "DALL-E style ideation", "concept exploration"]
  },
  {
    id: "real-10",
    title: "Eco-City Masterplan",
    sourceCategory: "sustainable urban masterplan",
    visualizationTaskType: "Masterplan / 总平面图 / 总体规划图",
    buildingType: "eco-city",
    sceneType: "masterplan",
    siteContext: "eco-city planning district",
    caseSource: "Local structured prompt library",
    viewControl: "Bird's-eye masterplan showing mixed districts, blue-green corridors, renewable infrastructure, and transit loops.",
    materialSystem: ["green roofs", "timber hybrid blocks", "solar canopies", "water-sensitive landscape"],
    atmosphere: ["bright planning render", "clean ecological clarity", "soft aerial haze"],
    cameraComposition: ["bird's-eye", "district-scale overview", "blue-green network emphasis"],
    entourage: ["light rail", "cyclists", "wetlands", "urban farms"],
    negativePromptRules: [
      "avoid decorative ecology",
      "avoid random green patches",
      "avoid traffic-dominated roads",
      "avoid confusing district boundaries"
    ],
    optimizationStrategy: [
      "Make ecological systems legible as infrastructure.",
      "Balance urban density with open-space continuity."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "landscape-garden-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "landscape-garden-buildings"],
    compatiblePresetIds: [],
    reusablePromptPattern:
      "Eco-city masterplan visualization with mixed-use districts, blue-green infrastructure, transit loops, renewable systems, and clear sustainable urban hierarchy.",
    modelSuitability: ["Stable Diffusion", "ControlNet planning base", "competition boards"]
  },
  {
    id: "real-11",
    title: "Zaha-Style Organic Art Center",
    sourceCategory: "organic cultural concept",
    visualizationTaskType: "Photorealistic Exterior Render / 写实外部效果图",
    buildingType: "art center",
    sceneType: "exterior",
    siteContext: "civic plaza",
    caseSource: "Local structured prompt library",
    viewControl: "Low exterior perspective emphasizing fluid roofline, continuous plaza, and sculptural entry.",
    materialSystem: ["white GFRC panels", "curved glass", "seamless plaza paving", "integrated landscape ribbons"],
    atmosphere: ["dramatic daylight", "fluid cultural landmark", "high contrast shadows"],
    cameraComposition: ["wide angle", "low perspective", "sweeping diagonal composition"],
    entourage: ["visitors", "plaza groups", "reflecting pool", "minimal planting"],
    negativePromptRules: [
      "avoid melted forms",
      "avoid impossible structure",
      "avoid over-smooth plastic finish",
      "avoid messy entourage"
    ],
    optimizationStrategy: [
      "Describe geometry as controlled organic surfaces, not vague fluidity.",
      "Keep seams, entrances, and plaza edges architecturally believable."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    compatiblePresetIds: ["museum-art-gallery"],
    reusablePromptPattern:
      "Organic art center exterior render with flowing white shell, curved glass entry, continuous civic plaza, sculptural but buildable geometry, dramatic daylight.",
    modelSuitability: ["Midjourney", "DALL-E style ideation", "concept massing exploration"]
  },
  {
    id: "real-12",
    title: "Glass Corridor Interior Rendering",
    sourceCategory: "interior circulation",
    visualizationTaskType: "Photorealistic Interior Render / 写实室内效果图",
    buildingType: "glass corridor",
    sceneType: "interior",
    siteContext: "interior atrium corridor",
    caseSource: "Local structured prompt library",
    viewControl: "One-point corridor view with transparent side walls, floor reflections, and exterior landscape beyond.",
    materialSystem: ["structural glass", "slim steel mullions", "terrazzo floor", "wood acoustic ceiling"],
    atmosphere: ["soft daylight", "quiet transition space", "clean reflections"],
    cameraComposition: ["one-point perspective", "eye-level", "strong vanishing point"],
    entourage: ["few occupants", "wayfinding signs", "indoor planters", "distant landscape"],
    negativePromptRules: [
      "avoid mirror maze confusion",
      "avoid warped mullions",
      "avoid excessive reflections",
      "avoid blocked circulation"
    ],
    optimizationStrategy: [
      "Use mullion rhythm and floor joints to stabilize perspective.",
      "Control transparency so interior and exterior layers remain readable."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "office-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "office-buildings"],
    compatiblePresetIds: ["office-building"],
    reusablePromptPattern:
      "Interior render of a glass corridor, one-point perspective, slim mullions, terrazzo floor reflections, soft daylight, calm circulation atmosphere.",
    modelSuitability: ["Stable Diffusion", "Midjourney", "interior reference workflow"]
  },
  {
    id: "real-13",
    title: "Semantic Segmentation Material Editing",
    sourceCategory: "image editing workflow",
    visualizationTaskType: "Material Editing / 材质编辑",
    buildingType: "material editing",
    sceneType: "material editing",
    siteContext: "existing architectural image",
    caseSource: "Local structured prompt library",
    viewControl: "Material replacement guided by facade, roof, ground, and landscape masks.",
    materialSystem: ["segmented facade zones", "roof mask", "ground mask", "landscape mask"],
    atmosphere: ["preserve original lighting", "preserve shadows", "maintain camera match"],
    cameraComposition: ["segmentation mask", "locked composition", "same perspective"],
    entourage: ["preserve existing people", "preserve vehicles when useful", "avoid changing context"],
    negativePromptRules: [
      "avoid changing building shape",
      "avoid moving camera",
      "avoid altering masked-out areas",
      "avoid inconsistent shadows"
    ],
    optimizationStrategy: [
      "Separate edit instructions by semantic mask.",
      "Preserve geometry, lighting direction, scale, and camera while changing materials."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "research-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "research-buildings"],
    compatiblePresetIds: [],
    reusablePromptPattern:
      "Local material editing pattern: preserve composition and geometry, replace only specified semantic regions, match existing light, scale, shadow, and texture grain.",
    modelSuitability: ["inpainting", "ControlNet segmentation", "image-to-image editing"]
  },
  {
    id: "real-14",
    title: "Close-Up Zoom Local Editing",
    sourceCategory: "detail refinement workflow",
    visualizationTaskType: "Local Image Refinement / 局部图像优化",
    buildingType: "local editing",
    sceneType: "local editing",
    siteContext: "zoomed architectural detail",
    caseSource: "Local structured prompt library",
    viewControl: "Zoomed-in local crop focusing on facade joint, entrance detail, furniture, or landscape edge.",
    materialSystem: ["facade joint detail", "door hardware", "paving texture", "planting edge"],
    atmosphere: ["preserve local lighting", "match original render grain", "small-scale realism"],
    cameraComposition: ["zoomed local edit", "close-up", "locked crop"],
    entourage: ["preserve adjacent objects", "avoid adding unrelated props", "keep detail scale consistent"],
    negativePromptRules: [
      "avoid changing global design",
      "avoid inventing new massing",
      "avoid texture mismatch",
      "avoid blurry repair edges"
    ],
    optimizationStrategy: [
      "Constrain the edit to one local design issue.",
      "Match resolution, shadows, and material aging to the surrounding image."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "research-buildings"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "research-buildings"],
    compatiblePresetIds: [],
    reusablePromptPattern:
      "Close-up local edit pattern: refine only the selected architectural detail, preserve surrounding geometry and lighting, improve material fidelity and edge continuity.",
    modelSuitability: ["inpainting", "high-resolution fix", "detail pass workflow"]
  },
  {
    id: "real-15",
    title: "Contemporary Library Quiet Daylight",
    sourceCategory: "public knowledge interior",
    visualizationTaskType: "Photorealistic Interior Render / 写实室内效果图",
    buildingType: "library",
    sceneType: "interior",
    siteContext: "interior reading atrium",
    caseSource: "Local structured prompt library",
    viewControl: "Eye-level one-point perspective through reading areas, stacks, and public circulation.",
    materialSystem: ["wood ceiling", "bookshelf walls", "translucent glass", "stone floor"],
    atmosphere: ["quiet daylight", "reading calm", "warm interior glow", "restrained civic atmosphere"],
    cameraComposition: ["eye-level", "one-point perspective", "human scale"],
    entourage: ["readers", "small study groups", "clear circulation", "library furniture"],
    negativePromptRules: [
      "avoid cluttered books",
      "avoid harsh glare",
      "avoid warped shelving grids",
      "avoid overcrowded reading tables"
    ],
    optimizationStrategy: [
      "Keep public knowledge space calm and legible.",
      "Use bookshelves, reading tables, and circulation lines as spatial cues."
    ],
    taxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    buildingTaxonomyPath: ["civil-buildings", "public-buildings", "cultural-entertainment"],
    compatiblePresetIds: ["library"],
    reusablePromptPattern:
      "Calm contemporary library render with readable circulation, warm interior glow, bookshelf walls, soft daylight, human-scale reading spaces, and restrained civic atmosphere.",
    modelSuitability: ["Midjourney", "Stable Diffusion", "interior reference workflow"]
  }
];

export const realLearningCases: LearningCase[] = realPromptCases.map(realPromptCaseToLearningCase);

function realPromptCaseToLearningCase(realCase: RealPromptCase): LearningCase {
  const visualStyle = visualStyleForCase(realCase);

  return {
    id: realCase.id,
    title: realCase.title,
    description: `${realCase.sourceCategory}: ${realCase.optimizationStrategy[0]}`,
    visualizationTaskType: realCase.visualizationTaskType,
    buildingType: realCase.buildingType,
    sceneType: realCase.sceneType,
    siteContext: realCase.siteContext,
    caseSource: realCase.caseSource,
    originalPrompt: `Structured summary case for ${realCase.title}.`,
    optimizedPrompt: realCase.reusablePromptPattern,
    styleTags: [realCase.sourceCategory, visualStyle, ...realCase.modelSuitability],
    materialTags: realCase.materialSystem,
    atmosphereTags: realCase.atmosphere,
    cameraTags: [realCase.viewControl, ...realCase.cameraComposition],
    improvementNotes: [
      ...realCase.optimizationStrategy,
      `Entourage guidance: ${realCase.entourage.join(", ")}.`,
      `Negative rules: ${realCase.negativePromptRules.join(", ")}.`
    ],
    preset: {
      projectContext: {
        projectName: realCase.title,
        siteContext: realCase.siteContext,
        designConcept: realCase.optimizationStrategy.join(" "),
        buildingFunction: realCase.buildingType
      },
      visualizationTaskType: realCase.visualizationTaskType,
      spatialScene: {
        sceneType: realCase.sceneType,
        foreground: realCase.entourage.join(", "),
        middleGround: realCase.viewControl,
        background: `${realCase.sourceCategory} context with ${realCase.atmosphere.join(", ")}`
      },
      materialDetail: {
        facade: realCase.materialSystem.slice(0, 2).join(", "),
        ground: realCase.materialSystem[2] ?? realCase.materialSystem[0],
        roof: realCase.materialSystem[3] ?? realCase.materialSystem[0],
        landscape: realCase.entourage.slice(-2).join(", "),
        lightingDetail: realCase.atmosphere.join(", ")
      },
      visualStyle,
      cameraComposition: cameraForCase(realCase),
      negativePrompts: DEFAULT_NEGATIVE_PROMPTS
    },
    sourceCategory: realCase.sourceCategory,
    viewControl: realCase.viewControl,
    entourage: realCase.entourage.join(", "),
    optimizationStrategy: realCase.optimizationStrategy.join(" "),
    reusablePromptPattern: realCase.reusablePromptPattern,
    modelSuitability: realCase.modelSuitability,
    taxonomyPath: realCase.taxonomyPath,
    buildingTaxonomyPath: realCase.buildingTaxonomyPath,
    compatibleTaxonomyPaths: realCase.compatibleTaxonomyPaths,
    renderPresetId: realCase.renderPresetId,
    compatiblePresetIds: realCase.compatiblePresetIds
  };
}

function visualStyleForCase(realCase: RealPromptCase): VisualStyle {
  if (realCase.sceneType === "masterplan") {
    return "aerial masterplan visualization";
  }

  if (realCase.sourceCategory.includes("workflow")) {
    return "material edit preview";
  }

  if (
    realCase.sourceCategory.includes("speculative") ||
    realCase.sourceCategory.includes("organic")
  ) {
    return "AI concept visualization";
  }

  if (
    realCase.sourceCategory.includes("atmosphere") ||
    realCase.atmosphere.some((item) => item.includes("dusk") || item.includes("blue hour"))
  ) {
    return "cinematic atmosphere";
  }

  return "photoreal commercial render";
}

function cameraForCase(realCase: RealPromptCase): CameraComposition {
  const cameraText = realCase.cameraComposition.join(" ").toLowerCase();

  if (cameraText.includes("segmentation")) {
    return "segmentation mask";
  }

  if (cameraText.includes("zoomed")) {
    return "zoomed local edit";
  }

  if (cameraText.includes("one-point")) {
    return "one-point perspective";
  }

  if (cameraText.includes("close-up")) {
    return "close-up";
  }

  if (cameraText.includes("bird")) {
    return "bird's-eye";
  }

  if (cameraText.includes("drone")) {
    return "drone aerial";
  }

  if (cameraText.includes("axonometric")) {
    return "axonometric";
  }

  if (cameraText.includes("wide")) {
    return "wide angle";
  }

  return "eye-level";
}
