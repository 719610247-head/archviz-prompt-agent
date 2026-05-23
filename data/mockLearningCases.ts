import type { LearningCase, StyleReference } from "@/types/archviz";

export const mockLearningCases: LearningCase[] = [
  {
    id: "case-01",
    name: "Waterfront Art Museum Twilight",
    originalPrompt:
      "Museum near water at sunset, people around, reflective facade, cinematic mood.",
    optimizedPrompt:
      "Exterior perspective of a contemporary art museum on a waterfront promenade, titanium-clad facade with warm interior glow, wet granite plaza and native coastal planting, dusk sky with long reflections on water, eye-level wide-angle framing, balanced pedestrian scale, realistic competition-grade render with controlled contrast and material fidelity.",
    styleTags: ["waterfront", "cultural", "cinematic", "metal facade", "competition"],
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
    name: "Neighborhood Community Center Plaza",
    originalPrompt:
      "Community center with public space and people, warm and welcoming architecture.",
    optimizedPrompt:
      "Street view of a low-rise community center opening to a civic forecourt, timber and light brick facade, permeable stone paving with canopy trees, daylight atmosphere, eye-level documentary composition capturing families and elderly users, realistic render emphasizing inclusive circulation and transparent ground-floor program.",
    styleTags: ["community", "human scale", "timber", "daylight", "documentary"],
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
    name: "Forest Edge Housing Cluster",
    originalPrompt:
      "Residential project in nature, calm mood, modern style.",
    optimizedPrompt:
      "Aerial-oblique view of a mid-density residential cluster at forest edge, pale concrete and vertical timber facade articulation, compact courtyards with gravel paths, soft Nordic overcast daylight, axonometric-informed composition highlighting massing rhythm and shared landscape, concept render balancing calm atmosphere with construction realism.",
    styleTags: ["residential", "soft Nordic", "forest", "axonometric", "concept"],
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
    name: "Transit-Adjacent Commercial Podium",
    originalPrompt:
      "Commercial building by station, dynamic and realistic image.",
    optimizedPrompt:
      "Exterior street-corner perspective of a mixed-use commercial podium near transit hub, high-transparency low-iron glass and anodized aluminum facade, basalt paving and wayfinding strips, rainy day reflections with active storefronts, symmetrical yet dynamic composition, realistic render focused on urban energy and façade depth.",
    styleTags: ["commercial", "urban", "rainy day", "glass facade", "high detail"],
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
    name: "Cultural School Courtyard Section",
    originalPrompt:
      "School design section perspective with Japanese minimal feeling.",
    optimizedPrompt:
      "Section perspective through a cultural school courtyard, layered classroom volumes with deep eaves, off-white plaster and charred timber accents, raked gravel ground and controlled bamboo planting, Japanese minimal atmosphere, close-up framing on thresholds and material joints, diagrammatic render with clean annotation-ready composition.",
    styleTags: ["school", "section", "Japanese minimal", "courtyard", "diagrammatic"],
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
