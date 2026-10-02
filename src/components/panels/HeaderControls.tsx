import React from 'react';
import type { DesignConfig } from '../../types';
import { FONT_FAMILIES } from '../../utils';

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
            value={header.fontFamily}
            onChange={(e) => onUpdateNested('header.fontFamily', e.target.value)}
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
            value={header.fontSize}
            onChange={(e) => onUpdateNested('header.fontSize', parseFloat(e.target.value))}
            step="0.5"
            disabled={!header.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={header.color}
              onChange={(e) => onUpdateNested('header.color', e.target.value)}
              disabled={!header.enabled}
            />
            <input
              type="text"
              className="color-hex-input"
              value={header.color}
              onChange={(e) => onUpdateNested('header.color', e.target.value)}
              disabled={!header.enabled}
            />
          </div>
        </div>

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

        <div className="control-group">
          <label className="control-label">Border Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={header.borderColor}
              onChange={(e) => onUpdateNested('header.borderColor', e.target.value)}
              disabled={!header.enabled || !header.borderEnabled}
            />
            <input
              type="text"
              className="color-hex-input"
              value={header.borderColor}
              onChange={(e) => onUpdateNested('header.borderColor', e.target.value)}
              disabled={!header.enabled || !header.borderEnabled}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderControls;
