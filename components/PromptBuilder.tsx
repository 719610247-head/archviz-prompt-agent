import {
  CAMERA_COMPOSITIONS,
  NEGATIVE_PROMPT_OPTIONS,
  SCENE_TYPES,
  VISUALIZATION_TASK_TYPES,
  VISUAL_STYLES,
  type NegativePromptOption,
  type PromptSelections
} from "@/types/archviz";
import { ModuleSelect } from "@/components/ModuleSelect";

interface PromptBuilderProps {
  selections: PromptSelections;
  draftPrompt: string;
  onSelectionsChange: (updater: (previous: PromptSelections) => PromptSelections) => void;
  onDraftPromptChange: (nextValue: string) => void;
}

export function PromptBuilder({
  selections,
  draftPrompt,
  onSelectionsChange,
  onDraftPromptChange
}: PromptBuilderProps) {
  const updateMaterial = (field: keyof PromptSelections["materialDetail"], value: string) => {
    onSelectionsChange((previous) => ({
      ...previous,
      materialDetail: {
        ...previous.materialDetail,
        [field]: value
      }
    }));
  };

  const toggleNegativePrompt = (option: NegativePromptOption) => {
    onSelectionsChange((previous) => {
      const exists = previous.negativePrompts.includes(option);
      return {
        ...previous,
        negativePrompts: exists
          ? previous.negativePrompts.filter((item) => item !== option)
          : [...previous.negativePrompts, option]
      };
    });
  };

  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Prompt Builder</p>
        <h2>ArchViz Prompt Optimization Workspace</h2>
      </div>

      <div className="card-like">
        <h3>1. Project Context</h3>
        <p className="muted">
          Building Type is derived from the selected visualization case or preset:{" "}
          <strong>{selections.projectContext.buildingFunction}</strong>
        </p>
        <div className="builder-grid">
          <ModuleSelect
            label="Visualization Task Type"
            value={selections.visualizationTaskType}
            options={VISUALIZATION_TASK_TYPES}
            onChange={(value) =>
              onSelectionsChange((previous) => ({
                ...previous,
                visualizationTaskType: value
              }))
            }
          />

          <label>
            <span>Project Name</span>
            <input
              value={selections.projectContext.projectName}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  projectContext: {
                    ...previous.projectContext,
                    projectName: event.target.value
                  }
                }))
              }
            />
          </label>

          <label>
            <span>Site Context</span>
            <input
              value={selections.projectContext.siteContext}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  projectContext: {
                    ...previous.projectContext,
                    siteContext: event.target.value
                  }
                }))
              }
            />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>
            <span>Design Concept</span>
            <textarea
              rows={2}
              value={selections.projectContext.designConcept}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  projectContext: {
                    ...previous.projectContext,
                    designConcept: event.target.value
                  }
                }))
              }
            />
          </label>
        </div>
      </div>

      <div className="card-like">
        <h3>2. Spatial Scene</h3>
        <div className="builder-grid">
          <ModuleSelect
            label="Scene Type"
            value={selections.spatialScene.sceneType}
            options={SCENE_TYPES}
            onChange={(value) =>
              onSelectionsChange((previous) => ({
                ...previous,
                spatialScene: {
                  ...previous.spatialScene,
                  sceneType: value
                }
              }))
            }
          />

          <label>
            <span>Foreground</span>
            <input
              value={selections.spatialScene.foreground}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  spatialScene: {
                    ...previous.spatialScene,
                    foreground: event.target.value
                  }
                }))
              }
            />
          </label>

          <label>
            <span>Middle Ground</span>
            <input
              value={selections.spatialScene.middleGround}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  spatialScene: {
                    ...previous.spatialScene,
                    middleGround: event.target.value
                  }
                }))
              }
            />
          </label>

          <label>
            <span>Background</span>
            <input
              value={selections.spatialScene.background}
              onChange={(event) =>
                onSelectionsChange((previous) => ({
                  ...previous,
                  spatialScene: {
                    ...previous.spatialScene,
                    background: event.target.value
                  }
                }))
              }
            />
          </label>
        </div>
      </div>

      <div className="card-like">
        <h3>3. Material and Detail</h3>
        <div className="material-grid">
          <label>
            <span>Facade Material</span>
            <input
              value={selections.materialDetail.facade}
              onChange={(event) => updateMaterial("facade", event.target.value)}
            />
          </label>
          <label>
            <span>Ground Material</span>
            <input
              value={selections.materialDetail.ground}
              onChange={(event) => updateMaterial("ground", event.target.value)}
            />
          </label>
          <label>
            <span>Roof Material</span>
            <input
              value={selections.materialDetail.roof}
              onChange={(event) => updateMaterial("roof", event.target.value)}
            />
          </label>
          <label>
            <span>Landscape Material</span>
            <input
              value={selections.materialDetail.landscape}
              onChange={(event) => updateMaterial("landscape", event.target.value)}
            />
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            <span>Lighting Detail</span>
            <input
              value={selections.materialDetail.lightingDetail}
              onChange={(event) => updateMaterial("lightingDetail", event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="card-like">
        <h3>4. Visual Style</h3>
        <ModuleSelect
          label="Visual Style"
          value={selections.visualStyle}
          options={VISUAL_STYLES}
          onChange={(value) => onSelectionsChange((previous) => ({ ...previous, visualStyle: value }))}
        />
      </div>

      <div className="card-like">
        <h3>5. Camera and Composition</h3>
        <ModuleSelect
          label="Camera + Composition"
          value={selections.cameraComposition}
          options={CAMERA_COMPOSITIONS}
          onChange={(value) =>
            onSelectionsChange((previous) => ({ ...previous, cameraComposition: value }))
          }
        />
      </div>

      <div className="card-like">
        <h3>6. Negative Prompt</h3>
        <div className="checkbox-grid">
          {NEGATIVE_PROMPT_OPTIONS.map((option) => (
            <label key={option} className="check-option">
              <input
                type="checkbox"
                checked={selections.negativePrompts.includes(option)}
                onChange={() => toggleNegativePrompt(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card-like">
        <h3>Project Intent / Draft Prompt</h3>
        <textarea
          rows={4}
          value={draftPrompt}
          onChange={(event) => onDraftPromptChange(event.target.value)}
          placeholder="Describe the user's project intention, design goal, spatial story, and use scenario..."
        />
      </div>
    </>
  );
}
