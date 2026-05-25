import { NextResponse } from "next/server";
import { buildLocalIntentRefinement } from "@/lib/intentRefiner";
import type {
  IntentRefinementRequest,
  IntentRefinementResult
} from "@/types/intentRefinement";

export const runtime = "nodejs";

const DEFAULT_PROVIDER = "deepseek";
const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-chat";

const SYSTEM_PROMPT = `You are an Architecture Visualization Prompt Agent.
Your goal is to help architectural designers translate vague project intent into a professional AI image-generation prompt structure.
Do not generate the final long prompt yet. Generate only intent refinement.
Output must be valid JSON only.
Write primarily in English because final image-generation prompts usually work better in English, but understand Chinese user input.
Do not invent specific project facts, site conditions, building functions, materials, or scenes that are not supported by the input.
Do not over-expand beyond the user's original intent.
Keep the architectural expression professional, restrained, clear, and useful for visualization workflows.

Return exactly this JSON object shape:
{
  "refinedIntent": "...",
  "designDirectives": ["...", "..."],
  "visualPriorities": ["...", "..."],
  "riskWarnings": ["...", "..."],
  "promptStrategy": "..."
}`;

export async function POST(request: Request) {
  const body = await parseRequestBody(request);
  const fallback = buildLocalIntentRefinement(body);
  const providerConfig = getLLMProviderConfig();

  if (!providerConfig.apiKey) {
    return NextResponse.json({
      result: fallback,
      mode: "local-fallback",
      provider: providerConfig.provider,
      message: "LLM_API_KEY is not configured. Using local fallback refinement."
    });
  }

  try {
    const response = await fetch(`${providerConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerConfig.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: providerConfig.model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: JSON.stringify(body)
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 900
      })
    });

    if (!response.ok) {
      return NextResponse.json({
        result: fallback,
        mode: "ai-failed",
        provider: providerConfig.provider,
        message: "LLM refinement failed. Using local fallback refinement."
      });
    }

    const llmPayload = (await response.json()) as unknown;
    const outputText = extractChatCompletionText(llmPayload);
    const parsed = JSON.parse(outputText) as unknown;
    const result = normalizeAIResult(parsed, providerConfig.provider);

    if (!result) {
      return NextResponse.json({
        result: fallback,
        mode: "ai-failed",
        provider: providerConfig.provider,
        message: "LLM refinement returned an invalid format. Using local fallback refinement."
      });
    }

    return NextResponse.json({
      result,
      mode: "ai-active",
      provider: providerConfig.provider,
      message: `${formatProviderName(providerConfig.provider)} refinement active.`
    });
  } catch {
    return NextResponse.json({
      result: fallback,
      mode: "ai-failed",
      provider: providerConfig.provider,
      message: "LLM refinement failed. Using local fallback refinement."
    });
  }
}

function getLLMProviderConfig() {
  const provider = sanitizeProvider(process.env.LLM_PROVIDER) || DEFAULT_PROVIDER;

  return {
    provider,
    apiKey: process.env.LLM_API_KEY?.trim() ?? "",
    baseUrl: normalizeBaseUrl(process.env.LLM_BASE_URL) || DEFAULT_BASE_URL,
    model: process.env.LLM_MODEL?.trim() || DEFAULT_MODEL
  };
}

async function parseRequestBody(request: Request): Promise<IntentRefinementRequest> {
  try {
    const body = (await request.json()) as Partial<IntentRefinementRequest>;

    return {
      rawIntent: sanitizeString(body.rawIntent),
      visualizationTaskType: optionalString(body.visualizationTaskType),
      buildingTaxonomy: Array.isArray(body.buildingTaxonomy)
        ? body.buildingTaxonomy.map(sanitizeString).filter(Boolean)
        : [],
      selectedPreset: optionalString(body.selectedPreset),
      selectedCase: optionalString(body.selectedCase),
      siteContext: optionalString(body.siteContext),
      materialIntent: optionalString(body.materialIntent),
      cameraIntent: optionalString(body.cameraIntent),
      atmosphereIntent: optionalString(body.atmosphereIntent)
    };
  } catch {
    return { rawIntent: "" };
  }
}

function normalizeAIResult(value: unknown, provider: string): IntentRefinementResult | null {
  if (!isRecord(value)) {
    return null;
  }

  const refinedIntent = stringValue(value.refinedIntent);
  const designDirectives = stringArrayValue(value.designDirectives);
  const visualPriorities = stringArrayValue(value.visualPriorities);
  const riskWarnings = stringArrayValue(value.riskWarnings);
  const promptStrategy = stringValue(value.promptStrategy);

  if (!refinedIntent || !promptStrategy) {
    return null;
  }

  return {
    refinedIntent,
    designDirectives,
    visualPriorities,
    riskWarnings,
    promptStrategy,
    source: "ai",
    provider
  };
}

function extractChatCompletionText(payload: unknown): string {
  if (!isRecord(payload) || !Array.isArray(payload.choices)) {
    throw new Error("Invalid chat completion payload.");
  }

  const firstChoice = payload.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    throw new Error("Chat completion payload does not include a message.");
  }

  const content = firstChoice.message.content;

  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const text = content
      .map((item) => (isRecord(item) && typeof item.text === "string" ? item.text : ""))
      .filter(Boolean)
      .join("")
      .trim();

    if (text) {
      return text;
    }
  }

  throw new Error("Chat completion message content is empty.");
}

function normalizeBaseUrl(value: string | undefined): string {
  const baseUrl = value?.trim() || "";
  return baseUrl.replace(/\/+$/, "");
}

function sanitizeProvider(value: string | undefined): string {
  return value?.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "") ?? "";
}

function formatProviderName(provider: string): string {
  if (provider === "deepseek") {
    return "DeepSeek";
  }

  if (provider === "openai") {
    return "OpenAI";
  }

  return provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "AI";
}

function sanitizeString(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

function optionalString(value: unknown): string | undefined {
  const sanitized = sanitizeString(value);
  return sanitized || undefined;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stringArrayValue(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map(stringValue).filter(Boolean).slice(0, 8)
    : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
