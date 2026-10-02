import React from 'react';
import type { DesignConfig } from '../../types';
import { FONT_FAMILIES } from '../../utils';
import PaletteColorField from './PaletteColorField';

interface HeaderControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ design, onUpdateNested }) => {
  const header = design.header;

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Header</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={header.enabled}
              onChange={(e) => onUpdateNested('header.enabled', e.target.checked)}
            />
            {' Enabled'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Left Content</label>
          <input
            type="text"
            className="control-input"
            value={header.leftContent}
            onChange={(e) => onUpdateNested('header.leftContent', e.target.value)}
            disabled={!header.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Center Content</label>
          <input
            type="text"
            className="control-input"
            value={header.centerContent}
            onChange={(e) => onUpdateNested('header.centerContent', e.target.value)}
            disabled={!header.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Right Content</label>
          <input
            type="text"
            className="control-input"
            value={header.rightContent}
            onChange={(e) => onUpdateNested('header.rightContent', e.target.value)}
            disabled={!header.enabled}
          />
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Header Styling</div>

        <div className="control-group">
          <label className="control-label">Font Family</label>
          <select
            className="control-select"
            value={design.typography.header.fontFamily}
            onChange={(e) => onUpdateNested('typography.header.fontFamily', e.target.value)}
            disabled={!header.enabled}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Font Size (px)</label>
          <input
            type="number"
            className="control-input"
            value={design.typography.header.fontSize}
            onChange={(e) => onUpdateNested('typography.header.fontSize', parseFloat(e.target.value))}
            step="0.5"
            disabled={!header.enabled}
          />
        </div>

        <PaletteColorField
          label="Color"
          value={design.typography.header.color}
          palette={design.colors}
          onChange={(color) => onUpdateNested('typography.header.color', color)}
          disabled={!header.enabled}
        />

        <div className="control-group">
          <label className="control-label">Spacing (px)</label>
          <input
            type="number"
            className="control-input"
            value={header.spacing}
            onChange={(e) => onUpdateNested('header.spacing', parseFloat(e.target.value))}
            disabled={!header.enabled}
          />
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Header Border</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={header.borderEnabled}
              onChange={(e) => onUpdateNested('header.borderEnabled', e.target.checked)}
              disabled={!header.enabled}
            />
            {' Enabled'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Border Thickness (px)</label>
          <input
            type="number"
            className="control-input"
            value={header.borderThickness}
            onChange={(e) => onUpdateNested('header.borderThickness', parseFloat(e.target.value))}
            step="0.5"
            disabled={!header.enabled || !header.borderEnabled}
          />
        </div>

        <PaletteColorField
          label="Border Color"
          value={header.borderColor}
          palette={design.colors}
          onChange={(color) => onUpdateNested('header.borderColor', color)}
          disabled={!header.enabled || !header.borderEnabled}
          allowCustom
        />
      </div>
    </>
  );
};

export default HeaderControls;
