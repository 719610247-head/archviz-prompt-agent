import { TagList } from "@/components/TagList";
import type { LearningCase, StyleReference } from "@/types/archviz";

interface StyleReferencePanelProps {
  activeCase: LearningCase | null;
  styleReferences: StyleReference[];
}

export function StyleReferencePanel({
  activeCase,
  styleReferences
}: StyleReferencePanelProps) {
  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Visual References</p>
        <h2>Aesthetic Direction</h2>
      </div>

      <section className="card-like">
        <h3>Selected Case: Optimized Example</h3>
        <p className="muted">{activeCase?.name}</p>
        <p>{activeCase?.optimizedPrompt}</p>
        <TagList tags={activeCase?.styleTags ?? []} />
      </section>

      <section className="card-like">
        <h3>Improvement Notes</h3>
        <ul className="checklist">
          {(activeCase?.improvementNotes ?? []).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
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
