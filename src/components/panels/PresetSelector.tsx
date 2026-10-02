import React from 'react';
import type { PresetName } from '../../presets';

interface PresetSelectorProps {
  onLoadPreset: (presetName: PresetName) => void;
}

const PRESETS: Array<{ name: PresetName; label: string; description: string }> = [
  {
    name: 'Premium Corporate',
    label: 'Premium Corporate',
    description: 'Professional navy and burgundy palette',
  },
  {
    name: 'Modern',
    label: 'Modern',
    description: 'Clean and contemporary design',
  },
  {
    name: 'Minimal',
    label: 'Minimal',
    description: 'Pure and simple aesthetic',
  },
  {
    name: 'Engineering',
    label: 'Engineering',
    description: 'Technical and precise styling',
  },
  {
    name: 'Legal / Governance',
    label: 'Legal & Governance',
    description: 'Conservative and formal design',
  },
];

const PresetSelector: React.FC<PresetSelectorProps> = ({ onLoadPreset }) => {
  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Design Presets</div>
        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
          Click a preset to apply it to your design.
        </div>
        {PRESETS.map((preset) => (
          <div key={preset.name}>
            <button
              className="preset-button"
              onClick={() => onLoadPreset(preset.name)}
            >
              <div style={{ fontWeight: 500, marginBottom: '2px' }}>
                {preset.label}
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                {preset.description}
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PresetSelector;
