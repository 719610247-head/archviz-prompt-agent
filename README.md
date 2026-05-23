# ArchViz Prompt Agent MVP

## Project Overview
ArchViz Prompt Agent MVP is a local-first Next.js interface for architecture visualization teams to structure, improve, and compare rendering prompts. It combines domain modules (scene, building type, materials, atmosphere, camera, output style) with mock learning cases and a generated optimization result panel.

## MVP Features
- Three-panel architecture workflow UI:
  - Left: project/render case list
  - Center: modular prompt builder + generated optimized prompt
  - Right: visual style and aesthetic references
- Reusable component architecture:
  - `CaseList`
  - `PromptBuilder`
  - `GeneratedPromptPanel`
  - `StyleReferencePanel`
  - `ModuleSelect`
  - `TagList`
- Five local mock learning cases with:
  - original prompt
  - optimized prompt
  - style tags
  - improvement notes
- Local mock optimization logic that regenerates structured prompts from selected modules and draft text.
- Mock API route for local data payload (`app/api/mock/chat/route.ts`).

## Local Run Commands
```bash
npm run dev
npm run typecheck
npm run build
npm run start
```

## Future OpenAI API Integration Plan
1. Replace `lib/promptOptimizer.ts` template assembly with OpenAI Responses API calls for context-aware prompt rewriting.
2. Add secure server-side key management via environment variables (`OPENAI_API_KEY`) and route-only usage.
3. Add evaluation and iteration loop:
   - prompt quality scoring
   - rewrite suggestions
   - user feedback-based refinements
4. Add production controls in API routes:
   - request validation
   - auth and usage limits
   - structured error handling and retry strategy

## Resume-Friendly Project Description
Designed and built a local-first ArchViz Prompt Agent MVP in Next.js with a modular three-panel interface for architectural rendering prompt optimization. Implemented reusable typed UI components, mock case-based learning workflows, and a structured prompt generation engine with clear extension points for future OpenAI API integration.

## Notes
- No external APIs are called in the MVP.
- No new dependencies are required.
- All logic and data remain local and mock-based.
