# ArchViz Prompt Agent - Architecture Visualization Prompt Optimization MVP

## Project Overview
ArchViz Prompt Agent is a local-first Next.js + TypeScript MVP for architectural rendering prompt optimization. It turns an architecture visualization brief into a structured, reusable prompt workflow built around building taxonomy, render presets, a structured ArchViz case library, project intent refinement, and generated optimized prompts.

The MVP is designed for architects, visualization designers, and AI rendering workflows that need more control than a free-form prompt box. It keeps all logic local and mock-based while preparing the product architecture for future OpenAI API, embeddings, and RAG integration.

## Core Features
- Multi-level building taxonomy for civil, public, industrial, agricultural, and subtype classification.
- Exact render preset based case filtering through explicit preset compatibility.
- Render preset recommendations for atmosphere, material system, camera, scene type, style, keywords, and negative prompt rules.
- Relevant render case library driven by selected taxonomy and render preset.
- Project Intent / Draft Prompt refinement through local mock Chinese/English keyword logic.
- Structured optimized prompt generation with raw intent, refined intent, subject, scene, material, atmosphere, camera, style, negative prompt, and final English prompt.
- Real structured ArchViz prompt case library using summarized metadata and reusable patterns, not long copied prompt text.
- Case-Based Reference / Derived Aesthetic Strategy panel explaining how selected cases or presets affect prompt generation.
- Copy final English prompt.
- Copy full structured prompt.
- Export prompt as `.txt`.
- Local prompt history with browser `localStorage`.
- Future OpenAI API / RAG integration plan.

## Product Workflow
```text
Building taxonomy
  -> Render preset
  -> Relevant cases
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
  Three-panel workspace UI, taxonomy/preset selector, prompt builder,
  generated prompt panel, case library, and reference strategy panel.

data/
  Local building taxonomy, render presets, mock cases, and structured real
  ArchViz prompt case summaries.

lib/
  Local prompt optimization, intent refinement, and mock data access logic.

types/
  Shared TypeScript interfaces for taxonomy, presets, cases, and prompt state.
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
- Embeddings / RAG prompt case retrieval using taxonomy, preset, and case metadata.
- Image upload and semantic segmentation workflow for material or region-based editing.
- Model-specific prompt export for Midjourney / Stable Diffusion / GPT-4o.
- User-owned prompt case database for project teams and studios.
- Visual reference image library connected to case and preset strategy.

## Resume-Friendly Project Description
中文：
这是一个面向建筑效果图生成与 AI 渲染流程的提示词优化智能体 MVP。项目将建筑功能分类、渲染预设、真实提示词案例库、用户意图提炼与结构化 Prompt 生成结合起来，形成从建筑类型选择到最终提示词导出的完整工作流。

English:
A Next.js + TypeScript MVP for architectural visualization prompt optimization, integrating building taxonomy, render presets, structured case references, intent refinement, and copy/export workflows.

## Notes
- No external APIs are called in the current MVP.
- All prompt optimization, intent refinement, taxonomy matching, and case retrieval are local and mock-based.
- The structured real case library uses summaries, tags, categories, and reusable prompt patterns rather than long copyrighted prompt text.
