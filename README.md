# ArchViz Prompt Agent - Architecture Visualization Prompt Optimization MVP

## Project Overview
ArchViz Prompt Agent is a local-first Next.js + TypeScript MVP for architecture visualization prompt optimization. It supports a broader visualization workflow beyond single exterior renders, including photorealistic exterior and interior views, aerial renders, masterplans, section perspectives, plans, elevations, diagrams, material editing, and local image refinement.

The product model combines a multi-level building taxonomy, visualization task type, visualization presets, structured local case summaries, project intent refinement, and structured optimized prompt generation. All current logic is local and mock-based, with a product path toward OpenAI API, embeddings, and RAG retrieval.

## Core Features
- Multi-level building taxonomy for civil, public, industrial, agricultural, and subtype classification.
- Visualization Task Type as a first-level workflow field for renders, planning drawings, diagrams, and image refinement.
- Exact visualization preset based case filtering through explicit task, preset, and taxonomy compatibility.
- Visualization preset recommendations for atmosphere, material system, camera, scene type, style, keywords, and negative prompt rules.
- Relevant Visualization Cases driven by selected task type, selected preset, and building taxonomy.
- Site Context field for spatial context such as waterfront, campus, industrial district, civic plaza, interior atrium, or coastal site.
- Case Source metadata kept separate from project spatial context.
- Project Intent / Draft Prompt refinement through local mock Chinese/English keyword logic.
- Structured optimized prompt generation with raw intent, refined intent, subject, scene, material, atmosphere, camera, style, negative prompt, and final English prompt.
- Real structured ArchViz prompt case library using summarized metadata and reusable patterns, not long copied prompt text.
- Case-Based Reference / Derived Aesthetic Strategy panel explaining how selected cases or presets affect prompt generation.
- Copy final English prompt and copy full structured prompt.
- Export prompt as `.txt`.
- Local prompt history with browser `localStorage`.
- Future OpenAI API / RAG integration plan.

## Product Workflow
```text
Visualization task type
  -> Building taxonomy
  -> Visualization preset
  -> Relevant visualization cases
  -> Project intent refinement
  -> Optimized prompt
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
