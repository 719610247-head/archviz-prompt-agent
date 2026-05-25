# ArchViz Prompt Agent - Architecture Visualization Prompt Optimization MVP

## Project Overview
ArchViz Prompt Agent is a local-first Next.js + TypeScript MVP for architecture visualization prompt optimization. It is positioned as an Architecture Visualization Prompt Agent, not only an architectural rendering prompt generator.

The MVP helps designers move from project context and visualization intent to a structured, copy-ready optimized prompt. It combines building taxonomy, visualization task types, visualization presets, structured local case summaries, local intent refinement, and prompt output actions in a clean three-panel design tool workflow.

All current logic is local and mock-based. The architecture is prepared for future OpenAI API integration, embeddings, and RAG retrieval without depending on external services in the MVP.

## Visualization Task Types
The product supports multiple architecture visualization outputs:

- Photorealistic Exterior Render
- Photorealistic Interior Render
- Aerial Render
- Masterplan
- Section Perspective
- Plan
- Elevation
- Diagram
- Material Editing
- Local Image Refinement

These task types guide case filtering and prompt generation. For example, a masterplan emphasizes site hierarchy and circulation, while material editing emphasizes preserving original geometry and accurate material-region control.

## Core Features
- Multi-level building taxonomy for civil, public, industrial, agricultural, and subtype classification.
- Visualization Task Type as a first-level workflow field for renders, planning drawings, diagrams, and image refinement.
- Visualization Preset recommendations for atmosphere, material system, camera, scene type, style, prompt keywords, and negative prompt rules.
- Relevant Visualization Cases filtered by Visualization Task Type, Building Taxonomy, and Visualization Preset compatibility.
- Site Context field for spatial context such as waterfront, campus, industrial district, civic plaza, interior atrium, or coastal site.
- Case Source metadata for tracking whether a case comes from the local mock set or local structured prompt library.
- Project Intent / Draft Prompt refinement through local mock Chinese/English keyword logic.
- Structured optimized prompt generation with raw intent, refined intent, subject, scene, material, atmosphere, camera, style, negative prompt, and final English prompt.
- Real structured ArchViz prompt case library using summarized metadata and reusable patterns, not long copied prompt text.
- Case-Based Reference / Derived Aesthetic Strategy panel explaining how selected cases or presets influence prompt generation.
- Copy final English prompt and copy full structured prompt.
- Export prompt as `.txt`.
- Local prompt history with browser `localStorage`.
- Future OpenAI API / RAG integration plan.

## Product Model Notes
- `Location` has been renamed to `Site Context` because the field describes spatial and environmental context, not the data source.
- `Local structured prompt library` is treated as `Case Source`, not as a project location.
- Case filtering prioritizes `Visualization Task Type + Building Taxonomy + Visualization Preset`, reducing mismatches between task output, building category, and selected preset.
- Visualization presets are recommended starting points; users can still customize scene, material, atmosphere, camera, style, and prompt intent.

## Product Workflow
```text
Visualization Task Type
  -> Building Taxonomy
  -> Visualization Preset
  -> Relevant Visualization Cases
  -> Project Intent Refinement
  -> Optimized Prompt
  -> Copy / Export / Save
```

## Tech Stack
- Next.js
- React
- TypeScript
- Local mock data
- Browser Clipboard API
- localStorage
- Git

## File Structure
```text
app/
  Next.js app entry, global styles, and mock API route.

components/
  Three-panel workspace UI, taxonomy and visualization preset selector,
  prompt builder, generated prompt panel, case library, and reference panel.

data/
  Local building taxonomy, visualization presets, mock cases, and structured
  real ArchViz prompt case summaries.

lib/
  Local prompt optimization, intent refinement, and mock data access logic.

types/
  Shared TypeScript interfaces for taxonomy, presets, cases, visualization
  task types, and prompt state.
```

## Local Development
```bash
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

## Future Roadmap
- OpenAI API integration for production-grade prompt rewriting and semantic intent extraction.
- Embeddings / RAG prompt case retrieval using visualization task type, taxonomy, preset, and case metadata.
- Image upload and semantic segmentation workflow for material or region-based editing.
- Model-specific prompt export for Midjourney / Stable Diffusion / GPT-4o.
- User-owned prompt case database for project teams and studios.
- Visual reference image library connected to case and preset strategy.

## Resume-Friendly Project Description
中文：
这是一个面向建筑可视化生成与 AI 表达流程的提示词优化智能体 MVP。项目将建筑功能分类、可视化任务类型、渲染与图纸预设、真实提示词案例摘要库、用户意图提炼与结构化 Prompt 生成结合起来，形成从任务类型选择、建筑类型选择、案例参考到最终提示词复制、导出与本地保存的完整工作流。

English:
A Next.js + TypeScript MVP for architectural visualization prompt optimization, integrating visualization task types, building taxonomy, visualization presets, structured case references, intent refinement, and copy/export/history workflows.

## Notes
- No external APIs are called in the current MVP.
- All prompt optimization, intent refinement, taxonomy matching, and case retrieval are local and mock-based.
- The structured real case library uses summaries, tags, categories, source metadata, site context, and reusable prompt patterns rather than long copyrighted prompt text.
