import type { LearningCase, StyleReference } from "@/types/archviz";

export const mockLearningCases: LearningCase[] = [
  {
    id: "case-01",
    title: "Waterfront Art Museum Twilight",
    description:
      "Cultural waterfront exterior with reflective materials, dusk lighting, and competition render clarity.",
    buildingType: "museum",
    sceneType: "exterior",
    originalPrompt:
      "Museum near water at sunset, people around, reflective facade, cinematic mood.",
    optimizedPrompt:
      "Exterior perspective of a contemporary art museum on a waterfront promenade, titanium-clad facade with warm interior glow, wet granite plaza and native coastal planting, dusk sky with long reflections on water, eye-level wide-angle framing, balanced pedestrian scale, realistic competition-grade render with controlled contrast and material fidelity.",
    styleTags: ["waterfront", "cultural", "cinematic", "metal facade", "competition"],
    materialTags: ["brushed titanium panels", "wet granite pavers", "standing seam zinc roof"],
    atmosphereTags: ["dusk", "warm interior glow", "water reflections"],
    cameraTags: ["eye-level", "wide angle", "pedestrian scale"],
    improvementNotes: [
      "Clarified site context and circulation around the museum.",
      "Specified facade, ground, and landscape materials for sharper texture control.",
      "Defined camera lens intent and visual hierarchy for jury readability."
    ],
    preset: {
      projectContext: {
        projectName: "Harbor Light Museum",
        location: "Qingdao Waterfront District",
        designConcept: "A luminous cultural lantern connecting city promenade and sea horizon.",
        buildingFunction: "museum"
      },
      spatialScene: {
        sceneType: "exterior",
        foreground: "Visitors walking on wet granite promenade with soft reflections",
        middleGround: "Main museum volume with titanium facade and transparent ground floor",
        background: "Harbor waterline, low skyline silhouette, and dusk cloud layers"
      },
      materialDetail: {
        facade: "brushed titanium panels",
        ground: "wet granite pavers",
        roof: "standing seam zinc roof",
        landscape: "coastal grasses and low shrubs",
        lightingDetail: "warm interior glow with cool ambient dusk fill"
      },
      visualStyle: "competition board",
      cameraComposition: "wide angle",
      negativePrompts: [
        "avoid distorted geometry",
        "avoid messy people",
        "avoid overexposed image",
        "avoid unreadable facade",
        "avoid random objects"
      ]
    }
  },
  {
    id: "case-02",
    title: "Neighborhood Community Center Plaza",
    description:
      "Human-scale civic street scene focused on daily public life, timber warmth, and accessible frontage.",
    buildingType: "community center",
    sceneType: "street",
    originalPrompt:
      "Community center with public space and people, warm and welcoming architecture.",
    optimizedPrompt:
      "Street view of a low-rise community center opening to a civic forecourt, timber and light brick facade, permeable stone paving with canopy trees, daylight atmosphere, eye-level documentary composition capturing families and elderly users, realistic render emphasizing inclusive circulation and transparent ground-floor program.",
    styleTags: ["community", "human scale", "timber", "daylight", "documentary"],
    materialTags: ["timber slats", "light brick", "permeable stone paving"],
    atmosphereTags: ["neutral daylight", "welcoming civic mood", "soft canopy shadows"],
    cameraTags: ["street view", "eye-level", "documentary composition"],
    improvementNotes: [
      "Added user groups and social activity to strengthen narrative.",
      "Refined material palette to support approachable public identity.",
      "Improved street-level readability and accessibility cues."
    ],
    preset: {
      projectContext: {
        projectName: "Lotus Block Community Hub",
        location: "Shanghai Inner Ring Neighborhood",
        designConcept: "Porous civic ground floor that blends daily life, learning, and social wellness.",
        buildingFunction: "community center"
      },
      spatialScene: {
        sceneType: "street",
        foreground: "Families and elderly users crossing a permeable stone plaza",
        middleGround: "Community center facade with timber screens and transparent lobby",
        background: "Tree canopy, neighborhood streetscape, and mixed-use blocks"
      },
      materialDetail: {
        facade: "timber slats with light brick",
        ground: "permeable stone paving",
        roof: "green roof tray system",
        landscape: "canopy trees and rain garden",
        lightingDetail: "neutral daylight with soft shadow transitions under canopies"
      },
      visualStyle: "realistic render",
      cameraComposition: "documentary composition",
      negativePrompts: [
        "avoid distorted geometry",
        "avoid messy people",
        "avoid unreadable facade",
        "avoid random objects"
      ]
    }
  },
  {
    id: "case-03",
    title: "Forest Edge Housing Cluster",
    description:
      "Aerial residential cluster study with forest-edge massing, courtyard rhythm, and soft Nordic tone.",
    buildingType: "residential",
    sceneType: "aerial",
    originalPrompt:
      "Residential project in nature, calm mood, modern style.",
    optimizedPrompt:
      "Aerial-oblique view of a mid-density residential cluster at forest edge, pale concrete and vertical timber facade articulation, compact courtyards with gravel paths, soft Nordic overcast daylight, axonometric-informed composition highlighting massing rhythm and shared landscape, concept render balancing calm atmosphere with construction realism.",
    styleTags: ["residential", "soft Nordic", "forest", "axonometric", "concept"],
    materialTags: ["pale concrete", "vertical timber fins", "compacted gravel"],
    atmosphereTags: ["soft overcast", "calm forest edge", "low-contrast shadows"],
    cameraTags: ["aerial-oblique", "axonometric-informed", "massing rhythm"],
    improvementNotes: [
      "Translated vague mood into measurable climate and light conditions.",
      "Introduced massing logic and courtyard relationships.",
      "Aligned render tone with early-stage design communication."
    ],
    preset: {
      projectContext: {
        projectName: "Pine Court Residences",
        location: "Hangzhou Forest Fringe",
        designConcept: "Layered housing bars that preserve tree corridors and shared courtyards.",
        buildingFunction: "residential"
      },
      spatialScene: {
        sceneType: "aerial",
        foreground: "Tree canopy edges framing the residential blocks",
        middleGround: "Clustered courtyard buildings with stepped terraces",
        background: "Forest belt fading into distant foothills"
      },
      materialDetail: {
        facade: "pale concrete with vertical timber fins",
        ground: "compacted gravel and boardwalk",
        roof: "matte dark metal roof",
        landscape: "moss, pines, and meadow planting",
        lightingDetail: "soft overcast light with low-contrast shadows"
      },
      visualStyle: "Nordic soft tone",
      cameraComposition: "axonometric",
      negativePrompts: [
        "avoid distorted geometry",
        "avoid overexposed image",
        "avoid unreadable facade",
        "avoid random objects"
      ]
    }
  },
  {
    id: "case-04",
    title: "Transit-Adjacent Commercial Podium",
    description:
      "Dense commercial street-corner view with transit energy, transparent retail, and rainy reflections.",
    buildingType: "commercial",
    sceneType: "exterior",
    originalPrompt:
      "Commercial building by station, dynamic and realistic image.",
    optimizedPrompt:
      "Exterior street-corner perspective of a mixed-use commercial podium near transit hub, high-transparency low-iron glass and anodized aluminum facade, basalt paving and wayfinding strips, rainy day reflections with active storefronts, symmetrical yet dynamic composition, realistic render focused on urban energy and façade depth.",
    styleTags: ["commercial", "urban", "rainy day", "glass facade", "high detail"],
    materialTags: ["low-iron glass", "anodized aluminum", "basalt paving"],
    atmosphereTags: ["rainy day", "active storefront glow", "urban energy"],
    cameraTags: ["street-corner perspective", "symmetrical composition", "dynamic frontage"],
    improvementNotes: [
      "Anchored building in a specific transit context.",
      "Enhanced weather behavior for reflective surface realism.",
      "Used composition rules to retain legibility in dense scenes."
    ],
    preset: {
      projectContext: {
        projectName: "Metro Gate Exchange",
        location: "Shenzhen Transit Core",
        designConcept: "A porous retail podium connecting metro flow with public streets.",
        buildingFunction: "commercial"
      },
      spatialScene: {
        sceneType: "exterior",
        foreground: "Reflective wet pavement with directional wayfinding strips",
        middleGround: "Transparent commercial podium with layered retail frontage",
        background: "Transit viaduct and dense urban skyline"
      },
      materialDetail: {
        facade: "low-iron glass and anodized aluminum",
        ground: "basalt paving with tactile strips",
        roof: "mechanical screen with dark metal cap",
        landscape: "planter bands with hardy shrubs",
        lightingDetail: "cinematic rainy reflections with highlighted storefront edges"
      },
      visualStyle: "cinematic atmosphere",
      cameraComposition: "symmetrical composition",
      negativePrompts: [
        "avoid distorted geometry",
        "avoid messy people",
        "avoid overexposed image",
        "avoid unreadable facade",
        "avoid random objects"
      ]
    }
  },
  {
    id: "case-05",
    title: "Cultural School Courtyard Section",
    description:
      "Section perspective for a quiet cultural school courtyard with precise joinery and minimal material rhythm.",
    buildingType: "school",
    sceneType: "section perspective",
    originalPrompt:
      "School design section perspective with Japanese minimal feeling.",
    optimizedPrompt:
      "Section perspective through a cultural school courtyard, layered classroom volumes with deep eaves, off-white plaster and charred timber accents, raked gravel ground and controlled bamboo planting, Japanese minimal atmosphere, close-up framing on thresholds and material joints, diagrammatic render with clean annotation-ready composition.",
    styleTags: ["school", "section", "Japanese minimal", "courtyard", "diagrammatic"],
    materialTags: ["off-white plaster", "charred timber accents", "raked gravel"],
    atmosphereTags: ["Japanese minimal", "soft ambient light", "quiet courtyard"],
    cameraTags: ["section perspective", "close-up threshold framing", "annotation-ready"],
    improvementNotes: [
      "Focused on threshold experience and child-scale detailing.",
      "Converted abstract style request into material and landscape decisions.",
      "Prepared output for annotation-heavy design review."
    ],
    preset: {
      projectContext: {
        projectName: "Courtyard Arts School",
        location: "Kyoto Cultural Quarter",
        designConcept: "Quiet courtyard-centered learning spaces with layered thresholds.",
        buildingFunction: "school"
      },
      spatialScene: {
        sceneType: "section perspective",
        foreground: "Timber threshold details and student seating edge",
        middleGround: "Layered classroom volumes around raked courtyard",
        background: "Bamboo garden screen and sky aperture above eaves"
      },
      materialDetail: {
        facade: "off-white plaster with charred timber accents",
        ground: "raked gravel with stepping stones",
        roof: "deep eaves with dark ceramic tiles",
        landscape: "bamboo and low moss beds",
        lightingDetail: "soft ambient light with crisp highlights on joinery edges"
      },
      visualStyle: "diagrammatic architecture visualization",
      cameraComposition: "eye-level",
      negativePrompts: [
        "avoid distorted geometry",
        "avoid messy people",
        "avoid unreadable facade",
        "avoid random objects"
      ]
    }
  }
];

export const mockStyleReferences: StyleReference[] = [
  {
    id: "style-01",
    title: "Nordic Calm",
    description:
      "Low-contrast daylight, restrained palette, tactile natural materials, and quiet human occupation.",
    tags: ["soft Nordic", "diffuse light", "timber", "calm composition"]
  },
  {
    id: "style-02",
    title: "Urban Cinematic",
    description:
      "Moody weather, reflective ground plane, strong edge lighting, and dense but readable street life.",
    tags: ["cinematic", "rainy day", "night glow", "street narrative"]
  },
  {
    id: "style-03",
    title: "Minimal Cultural",
    description:
      "Precise joinery, disciplined negative space, and material rhythm that supports contemplative scenes.",
    tags: ["Japanese minimal", "material rhythm", "courtyard", "quiet tone"]
  }
];
