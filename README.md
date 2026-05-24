# ArchViz Prompt Agent MVP

## Project Overview
ArchViz Prompt Agent MVP is a local-first Next.js application for architecture visualization teams to structure, optimize, and compare rendering prompts. It keeps all data and optimization behavior local for fast iteration before production AI integration.

## Current MVP Features
- Three-panel architectural workflow interface:
  - Left: project/render case list
  - Center: modular prompt builder + generated optimized prompt
  - Right: visual style and aesthetic reference panel
- Reusable UI component architecture:
  - `CaseList`
  - `PromptBuilder`
  - `GeneratedPromptPanel`
  - `StyleReferencePanel`
  - `ModuleSelect`
  - `TagList`
- Five local mock learning cases with:
  - title and description
  - derived building type and scene type
  - original prompt
  - optimized prompt
  - style tags
  - material, atmosphere, and camera reference tags
  - improvement notes
- Fourteen structured real prompt case summaries in `data/realPromptCases.ts`, covering representative ArchViz render and editing workflows without copying long source prompts verbatim.
- Multi-level building taxonomy in `data/buildingTaxonomy.ts` for Civil, Industrial, Agricultural, and public-building subtype classification.
- Render presets in `data/renderPresets.ts` that recommend atmosphere, materials, camera, scene types, rendering style, prompt keywords, negative rules, and design intent by building subtype.
- Explicit taxonomy matching for render cases (`taxonomyPath` and optional `compatibleTaxonomyPaths`) to prevent unrelated case leakage across building categories.
- Exact preset-based filtering via `compatiblePresetIds`, so sibling presets such as Museum and Library do not share unrelated cases just because they sit under the same cultural taxonomy branch.
- Local mock prompt optimization logic (`lib/promptOptimizer.ts`) that regenerates structured prompts from module selections and draft text.
- Local mock intent refinement logic (`lib/intentRefiner.ts`) that turns casual Chinese/English project intent text into professional ArchViz intent directives.
- Practical generated prompt actions:
  - copy final English prompt
  - copy full structured prompt
  - export the current prompt as a local `.txt` file (including taxonomy, preset, case, and final prompt content)
  - save the latest prompts to browser `localStorage` (including taxonomy/preset context)
- Local mock API endpoint (`app/api/mock/chat/route.ts`) for serving case/reference payloads.

## Workspace Interaction Model
- The Render Case Library drives the active building type, scene type, and core style references. Selecting a render case automatically updates the workspace instead of asking the user to manually choose Building Type.
- The Building Type Preset layer sits above the case library. Users select a taxonomy path, review the matching render preset, and then continue adjusting scene, material, atmosphere, camera, and style fields manually.
- The case library layer becomes Relevant Render Cases. It filters examples by selected building taxonomy and preset compatibility.
- Relevant Render Cases now use explicit taxonomy path matching only. If no exact match exists, the UI keeps a clean empty state and still allows preset-driven prompt generation.
- When a specific render preset is selected, Relevant Render Cases require explicit preset compatibility. Broad taxonomy matching is reserved for general presets only.
- Project Intent / Draft Prompt represents the user's project intention. It mainly feeds the `Project Intent` section of the generated optimized prompt while the selected case supplies architectural structure and reference logic.
- Scene, material, atmosphere, camera, style, output preferences, and architecture-specific optimization rules are combined into a structured prompt format:
  - Project Intent
  - Architectural Subject
  - Scene and Spatial Composition
  - Material and Facade System
  - Atmosphere and Lighting
  - Camera and Composition
  - Rendering Style
  - Negative Prompt
  - Final English Prompt
- Future prompt library learning can be implemented with embeddings and retrieval-augmented generation (RAG), using selected case vectors to retrieve similar precedent prompts, reference tags, and optimization notes before final prompt assembly.
- Generated prompt output supports local copy, export, and lightweight prompt history actions without calling external services.
- Case-Based Reference explains how selected cases or presets influence building type, scene strategy, materials, atmosphere, camera choices, and final prompt composition.

## Taxonomy, Presets, And Cases
- Building taxonomy layer: organizes projects into Civil Buildings, Industrial Buildings, Agricultural Buildings, and deeper public-building subtypes such as education, commercial, cultural, medical, sports, transportation, and memorial.
- Render preset layer: maps selected taxonomy paths to practical ArchViz recommendations for atmosphere, material system, camera, scene type, rendering style, keywords, negative rules, and design intent.
- Case library layer: supplies mock and real structured cases as reference examples under the selected preset.
- Presets are recommended starting points only. The user can still customize Project Intent, scene, materials, lighting, camera, negative prompt options, and final prompt output.
- Future extensions can connect taxonomy paths, render presets, and prompt cases to embeddings/RAG retrieval and an OpenAI API generation pipeline.

## Real Prompt Case Library
- The real prompt library is currently local, mock-based, and structured as summarized case metadata rather than copied prompt text.
- Each real case includes source category, building type, scene type, view control, material system, atmosphere, camera composition, entourage, negative prompt rules, optimization strategy, reusable prompt pattern, and model suitability.
- The app adapts real structured cases into the same Render Case Library used by the mock examples, so selecting a real case can drive building type, style references, materials, atmosphere, camera guidance, and generated prompt structure.
- A future OpenAI integration can create embeddings from these structured fields and use RAG to retrieve similar cases, prompt patterns, negative rules, and optimization strategies before generating the final prompt.

## Local Development Commands
```bash
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
```

## File Structure
```text
app/
  api/mock/chat/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  ArchVizPromptAgent.tsx
  CaseList.tsx
  GeneratedPromptPanel.tsx
  ModuleSelect.tsx
  PromptBuilder.tsx
  StyleReferencePanel.tsx
  TagList.tsx
data/
  buildingTaxonomy.ts
  mockLearningCases.ts
  renderPresets.ts
  realPromptCases.ts
lib/
  mockApi.ts
  promptOptimizer.ts
types/
  archviz.ts
  buildingTaxonomy.ts
  realPromptCase.ts
  renderPreset.ts
README.md
package.json
tsconfig.json
```

## Future OpenAI API Integration Plan
1. Replace local template optimization in `lib/promptOptimizer.ts` with OpenAI Responses API-driven prompt rewriting.
2. Add secure server-only environment key handling (`OPENAI_API_KEY`) and keep credentials out of client bundles.
3. Introduce prompt quality evaluation loops (scoring, targeted rewrite suggestions, iterative refinements).
4. Add production API safeguards in route handlers:
   - request validation
   - auth and usage limits
   - robust error handling and retry patterns
5. Persist prompt iteration history for learning analytics and project-level context reuse.

## Resume-Friendly Project Description
Built a local-first ArchViz Prompt Agent MVP in Next.js featuring a modular three-panel UX for architectural rendering prompt optimization, reusable typed React components, and a mock optimization engine designed for seamless future OpenAI API integration.

## Notes
- No external APIs are called.
- No new dependencies are installed.
- All current logic and data are local and mock-based.
