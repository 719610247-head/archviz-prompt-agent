# ArchViz Prompt Agent - Architecture Visualization Prompt Optimization MVP

Live Demo: https://archviz-prompt-agent.vercel.app/

## Project Overview
ArchViz Prompt Agent is a Next.js + TypeScript MVP for architecture visualization prompt optimization. It is positioned as an Architecture Visualization Prompt Agent, not only an architectural rendering prompt generator.

The MVP helps designers move from project context and visualization intent to a structured, copy-ready optimized prompt. It combines building taxonomy, visualization task types, visualization presets, structured local case summaries, provider-agnostic LLM intent refinement, local fallback logic, and prompt output actions in a clean three-panel design tool workflow.

## Phase 2A: Provider-Agnostic LLM Intent Refinement
Phase 2A upgrades the original local rule-based Prompt Builder into an AI-assisted Prompt Agent. The integration now uses a provider-agnostic LLM configuration with an OpenAI-compatible Chat Completions request format.

The default recommended provider is DeepSeek:

```bash
LLM_PROVIDER=deepseek
LLM_API_KEY=your_api_key_here
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat
```

When `LLM_API_KEY` is configured, the app calls the server-side `/api/refine-intent` route to refine the user's Project Intent / Draft Prompt into:

- Refined Project Intent
- Design Directives
- Visual Priorities
- Risk Warnings
- Prompt Strategy

The API route reads the provider key only on the server. The frontend never receives or exposes the API key. If the key is missing, the LLM call fails, or the response JSON is invalid, the app automatically uses the local fallback intent refiner and labels the result as `local`.

## Environment Setup
Create a local `.env.local` file for development:

```bash
LLM_PROVIDER=deepseek
LLM_API_KEY=your_api_key_here
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat
```

To switch to another OpenAI-compatible provider later, update `LLM_PROVIDER`, `LLM_BASE_URL`, and `LLM_MODEL` while keeping the same Chat Completions-compatible API shape.

Safety notes:
- Keep real API keys only in `.env.local`.
- Never commit `.env.local` or any real API key.
- `.env.example` intentionally contains an empty `LLM_API_KEY=`.
- `.gitignore` protects local environment files.

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
- AI-assisted Project Intent / Draft Prompt refinement through provider-agnostic LLM configuration.
- Local fallback refinement through Chinese/English keyword logic.
- Structured optimized prompt generation with raw intent, refined intent, subject, scene, material, atmosphere, camera, style, negative prompt, and final English prompt.
- Real structured ArchViz prompt case library using summarized metadata and reusable patterns, not long copied prompt text.
- Case-Based Reference / Derived Aesthetic Strategy panel explaining how selected cases or presets influence prompt generation.
- Copy final English prompt and copy full structured prompt.
- Export prompt as `.txt`.
- Local prompt history with refinement result saved for future learning workflows.

## Product Model Notes
- `Location` has been renamed to `Site Context` because the field describes spatial and environmental context, not the data source.
- `Local structured prompt library` is treated as `Case Source`, not as a project location.
- Case filtering prioritizes `Visualization Task Type + Building Taxonomy + Visualization Preset`, reducing mismatches between task output, building category, and selected preset.
- Visualization presets are recommended starting points; users can still customize scene, material, atmosphere, camera, style, and prompt intent.
- LLM refinement is an assistive layer; the optimized prompt still respects selected taxonomy, preset, case structure, and manual user edits.

## Product Workflow
```text
Visualization Task Type
  -> Building Taxonomy
  -> Visualization Preset
  -> Relevant Visualization Cases
  -> DeepSeek / LLM or Local Intent Refinement
  -> Optimized Prompt
  -> Copy / Export / Save
```

## Tech Stack
- Next.js
- React
- TypeScript
- Provider-agnostic LLM API route using OpenAI-compatible Chat Completions
- DeepSeek as the default recommended provider
- Local mock data
- Browser Clipboard API
- localStorage
- Git
- Vercel deployment

## File Structure
```text
app/
  Next.js app entry, global styles, and API routes including /api/refine-intent.

components/
  Three-panel workspace UI, taxonomy and visualization preset selector,
  prompt builder, generated prompt panel, case library, and reference panel.

data/
  Local building taxonomy, visualization presets, mock cases, and structured
  real ArchViz prompt case summaries.

lib/
  Local intent refinement, LLM/local prompt optimization, and mock data access logic.

types/
  Shared TypeScript interfaces for taxonomy, presets, cases, visualization
  task types, intent refinement, and prompt state.
```

## Local Development
```bash
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

The app works without `LLM_API_KEY` by using local fallback mode. Add the provider variables to `.env.local` to enable LLM-assisted intent refinement.

## Future Roadmap
- Embeddings / RAG prompt case retrieval using visualization task type, taxonomy, preset, and case metadata.
- Learning from local prompt history and successful user-generated prompt cases.
- Image upload and semantic segmentation workflow for material or region-based editing.
- Model-specific prompt export for Midjourney / Stable Diffusion / GPT-4o.
- User-owned prompt case database for project teams and studios.
- Visual reference image library connected to case and preset strategy.
- Optional provider switch presets for DeepSeek, OpenAI, and other OpenAI-compatible LLM APIs.

## Resume-Friendly Project Description
中文：
这是一个面向建筑可视化生成与 AI 表达流程的提示词优化智能体 MVP。项目将建筑功能分类、可视化任务类型、渲染与图纸预设、真实提示词案例摘要库、通用 LLM 用户意图提炼、本地 fallback 机制与结构化 Prompt 生成结合起来，形成从任务类型选择、建筑类型选择、案例参考到最终提示词复制、导出与本地保存的完整工作流。Phase 2A 默认支持 DeepSeek，并保留切换 OpenAI-compatible API 的能力。

English:
A Next.js + TypeScript MVP for architectural visualization prompt optimization, integrating visualization task types, building taxonomy, visualization presets, structured case references, provider-agnostic LLM intent refinement, local fallback logic, and copy/export/history workflows. Phase 2A defaults to DeepSeek while preserving future OpenAI-compatible provider switching.

## Notes
- Real LLM calls are made only through the server-side `/api/refine-intent` route when `LLM_API_KEY` is configured.
- The frontend never exposes the LLM API key.
- The app remains usable without an API key through local fallback mode.
- The structured real case library uses summaries, tags, categories, source metadata, site context, and reusable prompt patterns rather than long copyrighted prompt text.
