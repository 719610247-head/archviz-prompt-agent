import type { LearningCase } from "@/types/archviz";
import { TagList } from "@/components/TagList";

interface CaseListProps {
  learningCases: LearningCase[];
  selectedCaseId: string;
  onSelectCase: (selected: LearningCase) => void;
}

export function CaseList({
  learningCases,
  selectedCaseId,
  onSelectCase
}: CaseListProps) {
  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Project Cases</p>
        <h2>Render Case Library</h2>
      </div>

      <div className="case-list">
        {learningCases.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === selectedCaseId ? "case-card active" : "case-card"}
            onClick={() => onSelectCase(item)}
          >
            <div className="case-card-head">
              <strong>{item.title}</strong>
              <span className={item.sourceCategory ? "case-badge real" : "case-badge"}>
                {item.sourceCategory ? "Real Structured Case" : "Mock Case"}
              </span>
            </div>
            <p>{item.description}</p>
            <TagList tags={[item.buildingType, item.sceneType, ...item.styleTags]} />
          </button>
        ))}
      </div>
    </>
  );
}
