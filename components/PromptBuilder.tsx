import {
  ATMOSPHERES,
  BUILDING_TYPES,
  CAMERA_COMPOSITIONS,
  OUTPUT_STYLES,
  SCENE_TYPES,
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
  const updateMaterial = (field: keyof PromptSelections["materials"], value: string) => {
    onSelectionsChange((previous) => ({
      ...previous,
      materials: {
        ...previous.materials,
        [field]: value
      }
    }));
  };

  return (
    <>
      <div className="panel-head">
        <p className="eyebrow">Prompt Builder</p>
        <h2>ArchViz Prompt Optimization Workspace</h2>
      </div>

      <div className="builder-grid">
        <ModuleSelect
          label="Scene Type"
          value={selections.sceneType}
          options={SCENE_TYPES}
          onChange={(value) => onSelectionsChange((previous) => ({ ...previous, sceneType: value }))}
        />

        <ModuleSelect
          label="Building Type"
          value={selections.buildingType}
          options={BUILDING_TYPES}
          onChange={(value) => onSelectionsChange((previous) => ({ ...previous, buildingType: value }))}
        />

        <ModuleSelect
          label="Atmosphere"
          value={selections.atmosphere}
          options={ATMOSPHERES}
          onChange={(value) => onSelectionsChange((previous) => ({ ...previous, atmosphere: value }))}
        />

        <ModuleSelect
          label="Camera + Composition"
          value={selections.cameraComposition}
          options={CAMERA_COMPOSITIONS}
          onChange={(value) =>
            onSelectionsChange((previous) => ({ ...previous, cameraComposition: value }))
          }
        />

        <ModuleSelect
          label="Output Style"
          value={selections.outputStyle}
          options={OUTPUT_STYLES}
          onChange={(value) => onSelectionsChange((previous) => ({ ...previous, outputStyle: value }))}
        />
      </div>

      <div className="material-grid card-like">
        <h3>Material System</h3>

        <label>
          <span>Facade Material</span>
          <input
            value={selections.materials.facade}
            onChange={(event) => updateMaterial("facade", event.target.value)}
          />
        </label>

        <label>
          <span>Ground Material</span>
          <input
            value={selections.materials.ground}
            onChange={(event) => updateMaterial("ground", event.target.value)}
          />
        </label>

        <label>
          <span>Roof Material</span>
          <input
            value={selections.materials.roof}
            onChange={(event) => updateMaterial("roof", event.target.value)}
          />
        </label>

        <label>
          <span>Landscape Material</span>
          <input
            value={selections.materials.landscape}
            onChange={(event) => updateMaterial("landscape", event.target.value)}
          />
        </label>
      </div>

      <div className="card-like">
        <h3>Draft Prompt</h3>
        <textarea
          rows={4}
          value={draftPrompt}
          onChange={(event) => onDraftPromptChange(event.target.value)}
          placeholder="Describe design intent, spatial story, and use scenario..."
        />
      </div>
    </>
  );
}
