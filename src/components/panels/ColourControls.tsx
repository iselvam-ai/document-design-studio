import React from 'react';
import type { DesignConfig } from '../../types';

interface ColourControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const ColourControls: React.FC<ColourControlsProps> = ({ design, onUpdateNested }) => {
  const colors = design.colors;

  const renderColorControl = (key: string, label: string, path: string) => (
    <div key={key} className="control-group">
      <label className="control-label">{label}</label>
      <div className="color-picker-row">
        <input
          type="color"
          className="color-picker-input"
          value={colors[key as keyof typeof colors]}
          onChange={(e) => onUpdateNested(path, e.target.value)}
        />
        <input
          type="text"
          className="color-hex-input"
          value={colors[key as keyof typeof colors]}
          onChange={(e) => onUpdateNested(path, e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Colour Palette</div>

        {renderColorControl('primary', 'Primary', 'colors.primary')}
        {renderColorControl('secondary', 'Secondary', 'colors.secondary')}
        {renderColorControl('accent', 'Accent', 'colors.accent')}
        {renderColorControl('background', 'Page Background', 'colors.background')}
        {renderColorControl('text', 'Text', 'colors.text')}
        {renderColorControl('lightText', 'Light Text', 'colors.lightText')}
        {renderColorControl('border', 'Border', 'colors.border')}
        {renderColorControl('headerFooterBg', 'Header/Footer Background', 'colors.headerFooterBg')}
      </div>
    </>
  );
};

export default ColourControls;
