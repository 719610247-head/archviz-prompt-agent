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
      sceneType: "exterior",
      buildingType: "museum",
      materials: {
        facade: "brushed titanium panels",
        ground: "wet granite pavers",
        roof: "standing seam zinc roof",
        landscape: "coastal grasses and low shrubs"
      },
      atmosphere: "dusk",
      cameraComposition: "wide angle",
      outputStyle: "competition board"
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
      sceneType: "street view",
      buildingType: "community center",
      materials: {
        facade: "timber slats with light brick",
        ground: "permeable stone paving",
        roof: "green roof tray system",
        landscape: "canopy trees and rain garden"
      },
      atmosphere: "daylight",
      cameraComposition: "documentary style",
      outputStyle: "realistic render"
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
      sceneType: "aerial view",
      buildingType: "residential",
      materials: {
        facade: "pale concrete with vertical timber fins",
        ground: "compacted gravel and boardwalk",
        roof: "matte dark metal roof",
        landscape: "moss, pines, and meadow planting"
      },
      atmosphere: "soft Nordic",
      cameraComposition: "axonometric",
      outputStyle: "concept render"
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
      sceneType: "exterior",
      buildingType: "commercial",
      materials: {
        facade: "low-iron glass and anodized aluminum",
        ground: "basalt paving with tactile strips",
        roof: "mechanical screen with dark metal cap",
        landscape: "planter bands with hardy shrubs"
      },
      atmosphere: "rainy day",
      cameraComposition: "symmetrical",
      outputStyle: "realistic render"
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
      sceneType: "section perspective",
      buildingType: "school",
      materials: {
        facade: "off-white plaster with charred timber accents",
        ground: "raked gravel with stepping stones",
        roof: "deep eaves with dark ceramic tiles",
        landscape: "bamboo and low moss beds"
      },
      atmosphere: "Japanese minimal",
      cameraComposition: "close-up",
      outputStyle: "diagrammatic render"
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
