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
- Local mock prompt optimization logic (`lib/promptOptimizer.ts`) that regenerates structured prompts from module selections and draft text.
- Local mock API endpoint (`app/api/mock/chat/route.ts`) for serving case/reference payloads.

## Workspace Interaction Model
- The Render Case Library drives the active building type, scene type, and core style references. Selecting a render case automatically updates the workspace instead of asking the user to manually choose Building Type.
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
  mockLearningCases.ts
lib/
  mockApi.ts
  promptOptimizer.ts
types/
  archviz.ts
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
