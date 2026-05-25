import type { LearningCase } from "@/types/archviz";
import type { BuildingTaxonomyNode, TaxonomyPath } from "@/types/buildingTaxonomy";
import type { RenderPreset } from "@/types/renderPreset";
import { TagList } from "@/components/TagList";

interface CaseListProps {
  learningCases: LearningCase[];
  selectedCaseId: string;
  taxonomy: BuildingTaxonomyNode[];
  renderPresets: RenderPreset[];
  selectedTaxonomyPath: TaxonomyPath;
  selectedRenderPreset: RenderPreset;
  showFallbackCases: boolean;
  taxonomyLabel: string;
  onTaxonomyPathChange: (path: TaxonomyPath) => void;
  onRenderPresetChange: (presetId: string) => void;
  onSelectCase: (selected: LearningCase) => void;
}

export function CaseList({
  learningCases,
  selectedCaseId,
  taxonomy,
  renderPresets,
  selectedTaxonomyPath,
  selectedRenderPreset,
  showFallbackCases,
  taxonomyLabel,
  onTaxonomyPathChange,
  onRenderPresetChange,
  onSelectCase
}: CaseListProps) {
  const levelOneNodes = taxonomy;
  const levelOneId = selectedTaxonomyPath[0] ?? levelOneNodes[0]?.id ?? "";
  const levelOneNode = findNode(levelOneNodes, levelOneId);
  const levelTwoNodes = levelOneNode?.children ?? [];
  const levelTwoId = selectedTaxonomyPath[1] ?? "";
  const levelTwoNode = levelTwoId ? findNode(levelTwoNodes, levelTwoId) : null;
  const levelThreeNodes = levelTwoNode?.children ?? [];
  const levelThreeId = selectedTaxonomyPath[2] ?? "";
  const matchingPresets = renderPresets.filter(
    (preset) => pathKey(preset.taxonomyPath) === pathKey(selectedTaxonomyPath)
  );

  const updateLevelOne = (nextId: string) => {
    const nextNode = findNode(levelOneNodes, nextId);
    const nextPath = nextNode?.children?.[0]?.children?.[0]
      ? [nextId, nextNode.children[0].id, nextNode.children[0].children[0].id]
      : nextNode?.children?.[0]
        ? [nextId, nextNode.children[0].id]
        : [nextId];
    onTaxonomyPathChange(nextPath);
  };

  const updateLevelTwo = (nextId: string) => {
    const nextNode = findNode(levelTwoNodes, nextId);
    const nextPath = nextNode?.children?.[0]
      ? [levelOneId, nextId, nextNode.children[0].id]
      : [levelOneId, nextId];
    onTaxonomyPathChange(nextPath);
  };

  const updateLevelThree = (nextId: string) => {
    onTaxonomyPathChange([levelOneId, levelTwoId, nextId]);
  };

  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Project Cases</p>
        <h2>Building Type Preset</h2>
      </div>

      <section className="card-like compact-card">
        <div className="taxonomy-select-grid">
          <label>
            <span>Level 1</span>
            <select value={levelOneId} onChange={(event) => updateLevelOne(event.target.value)}>
              {levelOneNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.labelEn} / {node.labelZh}
                </option>
              ))}
            </select>
          </label>

          {levelTwoNodes.length ? (
            <label>
              <span>Level 2</span>
              <select value={levelTwoId} onChange={(event) => updateLevelTwo(event.target.value)}>
                {levelTwoNodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.labelEn} / {node.labelZh}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {levelThreeNodes.length ? (
            <label>
              <span>Level 3</span>
              <select
                value={levelThreeId}
                onChange={(event) => updateLevelThree(event.target.value)}
              >
                {levelThreeNodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.labelEn} / {node.labelZh}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {matchingPresets.length > 1 ? (
            <label>
              <span>Visualization Preset</span>
              <select
                value={selectedRenderPreset.id}
                onChange={(event) => onRenderPresetChange(event.target.value)}
              >
                {matchingPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.buildingCategoryLabel}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        <div className="preset-summary-card">
          <div className="section-title-row">
            <strong>{selectedRenderPreset.buildingCategoryLabel}</strong>
            <span className="case-badge real">Preset</span>
          </div>
          <p className="muted">{taxonomyLabel}</p>
          <p>{selectedRenderPreset.designIntentHint}</p>
          <TagList
            tags={[
              ...selectedRenderPreset.recommendedAtmosphere,
              ...selectedRenderPreset.recommendedMaterials.slice(0, 3),
              ...selectedRenderPreset.recommendedCamera,
              ...selectedRenderPreset.recommendedSceneTypes,
              selectedRenderPreset.recommendedRenderingStyle
            ]}
            subtle
          />
        </div>
      </section>

      <div className="panel-head compact-panel-head">
        <p className="eyebrow">Filtered Examples</p>
        <h2>Relevant Visualization Cases</h2>
      </div>

      {showFallbackCases ? (
        <p className="muted">
          No exact visualization case found for {selectedRenderPreset.buildingCategoryLabel}. You can still use the selected visualization preset as a starting point.
        </p>
      ) : (
        <>
          <p className="muted">Showing {learningCases.length} case(s) matched to this preset.</p>
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
      )}
    </>
  );
}

function findNode(nodes: BuildingTaxonomyNode[], id: string): BuildingTaxonomyNode | null {
  return nodes.find((node) => node.id === id) ?? null;
}

function pathKey(path: TaxonomyPath): string {
  return path.join("/");
}
