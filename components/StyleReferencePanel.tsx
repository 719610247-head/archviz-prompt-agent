import { TagList } from "@/components/TagList";
import type { LearningCase, StyleReference } from "@/types/archviz";
import type { RenderPreset } from "@/types/renderPreset";

interface StyleReferencePanelProps {
  activeCase: LearningCase | null;
  activeRenderPreset: RenderPreset;
  taxonomyLabel: string;
  styleReferences: StyleReference[];
}

export function StyleReferencePanel({
  activeCase,
  activeRenderPreset,
  taxonomyLabel,
  styleReferences
}: StyleReferencePanelProps) {
  const hasCase = Boolean(activeCase);
  const title = hasCase ? "Selected Case Reference" : "Preset-Based Reference";
  const subtitle = hasCase
    ? activeCase?.title ?? ""
    : `${activeRenderPreset.buildingCategoryLabel} (${taxonomyLabel})`;

  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Case-Based Reference</p>
        <h2>Derived Aesthetic Strategy</h2>
      </div>

      <section className="card-like">
        <div className="section-title-row">
          <h3>{title}</h3>
          <span className={hasCase ? "case-badge real" : "case-badge"}>{hasCase ? "Case" : "Preset"}</span>
        </div>
        <p className="muted">{subtitle}</p>
        <p>{hasCase ? activeCase?.optimizedPrompt : activeRenderPreset.designIntentHint}</p>
        <TagList
          tags={
            hasCase
              ? (activeCase?.styleTags ?? [])
              : [
                  ...activeRenderPreset.promptKeywords,
                  activeRenderPreset.recommendedRenderingStyle
                ]
          }
        />
      </section>

      <section className="card-like">
        <h3>Derived References</h3>
        <p className="muted">
          Building Type:{" "}
          <strong>{hasCase ? activeCase?.buildingType : activeRenderPreset.buildingType}</strong> ·
          Scene Type:{" "}
          <strong>
            {hasCase
              ? activeCase?.sceneType
              : activeRenderPreset.recommendedSceneTypes.join(", ")}
          </strong>
        </p>
        <div className="derived-reference-grid">
          <div>
            <strong>Materials</strong>
            <TagList
              tags={hasCase ? activeCase?.materialTags ?? [] : activeRenderPreset.recommendedMaterials}
              subtle
            />
          </div>
          <div>
            <strong>Atmosphere</strong>
            <TagList
              tags={hasCase ? activeCase?.atmosphereTags ?? [] : activeRenderPreset.recommendedAtmosphere}
              subtle
            />
          </div>
          <div>
            <strong>Camera</strong>
            <TagList
              tags={hasCase ? activeCase?.cameraTags ?? [] : activeRenderPreset.recommendedCamera}
              subtle
            />
          </div>
          <div>
            <strong>Strategy Notes</strong>
            <ul className="checklist">
              {(hasCase
                ? activeCase?.improvementNotes ?? []
                : [
                    activeRenderPreset.designIntentHint,
                    `Recommended style: ${activeRenderPreset.recommendedRenderingStyle}.`,
                    `Prompt keywords: ${activeRenderPreset.promptKeywords.join(", ")}.`
                  ]
              ).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Prompt Influence</strong>
            <p className="muted">
              This reference guides architectural subject framing, scene composition, material language, atmosphere, camera direction, and rendering style in the generated prompt.
            </p>
          </div>
        </div>
      </section>

      <section className="card-like">
        <h3>Style Reference Panel</h3>
        <div className="style-stack">
          {styleReferences.map((reference) => (
            <article key={reference.id} className="reference-card">
              <strong>{reference.title}</strong>
              <p>{reference.description}</p>
              <TagList tags={reference.tags} subtle />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
