import React from 'react';
import type { DesignConfig } from '../../types';
import { FONT_FAMILIES } from '../../utils';

interface FooterControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const FooterControls: React.FC<FooterControlsProps> = ({ design, onUpdateNested }) => {
  const footer = design.footer;

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Footer</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={footer.enabled}
              onChange={(e) => onUpdateNested('footer.enabled', e.target.checked)}
            />
            {' Enabled'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Left Content</label>
          <input
            type="text"
            className="control-input"
            value={footer.leftContent}
            onChange={(e) => onUpdateNested('footer.leftContent', e.target.value)}
            disabled={!footer.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Center Content</label>
          <input
            type="text"
            className="control-input"
            value={footer.centerContent}
            onChange={(e) => onUpdateNested('footer.centerContent', e.target.value)}
            disabled={!footer.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Right Content</label>
          <input
            type="text"
            className="control-input"
            value={footer.rightContent}
            onChange={(e) => onUpdateNested('footer.rightContent', e.target.value)}
            placeholder="Use {page} for page numbers"
            disabled={!footer.enabled}
          />
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Footer Styling</div>

        <div className="control-group">
          <label className="control-label">Font Family</label>
          <select
            className="control-select"
            value={footer.fontFamily}
            onChange={(e) => onUpdateNested('footer.fontFamily', e.target.value)}
            disabled={!footer.enabled}
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
            value={footer.fontSize}
            onChange={(e) => onUpdateNested('footer.fontSize', parseFloat(e.target.value))}
            step="0.5"
            disabled={!footer.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={footer.color}
              onChange={(e) => onUpdateNested('footer.color', e.target.value)}
              disabled={!footer.enabled}
            />
            <input
              type="text"
              className="color-hex-input"
              value={footer.color}
              onChange={(e) => onUpdateNested('footer.color', e.target.value)}
              disabled={!footer.enabled}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Spacing (px)</label>
          <input
            type="number"
            className="control-input"
            value={footer.spacing}
            onChange={(e) => onUpdateNested('footer.spacing', parseFloat(e.target.value))}
            disabled={!footer.enabled}
          />
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Footer Border</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={footer.borderEnabled}
              onChange={(e) => onUpdateNested('footer.borderEnabled', e.target.checked)}
              disabled={!footer.enabled}
            />
            {' Enabled'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Border Thickness (px)</label>
          <input
            type="number"
            className="control-input"
            value={footer.borderThickness}
            onChange={(e) => onUpdateNested('footer.borderThickness', parseFloat(e.target.value))}
            step="0.5"
            disabled={!footer.enabled || !footer.borderEnabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Border Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={footer.borderColor}
              onChange={(e) => onUpdateNested('footer.borderColor', e.target.value)}
              disabled={!footer.enabled || !footer.borderEnabled}
            />
            <input
              type="text"
              className="color-hex-input"
              value={footer.borderColor}
              onChange={(e) => onUpdateNested('footer.borderColor', e.target.value)}
              disabled={!footer.enabled || !footer.borderEnabled}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterControls;
