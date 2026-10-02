import React from 'react';
import type { DesignConfig } from '../../types';
import { FONT_FAMILIES } from '../../utils';

interface TypographyControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

type TypographyKey = 'documentTitle' | 'subtitle' | 'sectionTitle' | 'body';

const ALIGNMENT_OPTIONS = ['Left', 'Center', 'Right'];

const TypographyControls: React.FC<TypographyControlsProps> = ({ design, onUpdateNested }) => {
  const typographies: Array<{ key: TypographyKey; label: string }> = [
    { key: 'documentTitle', label: 'Document Title' },
    { key: 'subtitle', label: 'Subtitle' },
    { key: 'sectionTitle', label: 'Section Title' },
    { key: 'body', label: 'Body Text' },
  ];

  const renderTypographyPanel = (key: TypographyKey, label: string) => {
    const typo = design.typography[key];
    const basePath = `typography.${key}`;

    return (
      <div key={key} className="panel-section">
        <div className="panel-title">{label}</div>

        <div className="control-group">
          <label className="control-label">Font Family</label>
          <select
            className="control-select"
            value={typo.fontFamily}
            onChange={(e) => onUpdateNested(`${basePath}.fontFamily`, e.target.value)}
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
            value={typo.fontSize}
            onChange={(e) => onUpdateNested(`${basePath}.fontSize`, parseFloat(e.target.value))}
            step="0.5"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Font Weight</label>
          <input
            type="number"
            className="control-input"
            value={typo.fontWeight}
            onChange={(e) => onUpdateNested(`${basePath}.fontWeight`, parseFloat(e.target.value))}
            step="100"
            min="100"
            max="900"
          />
        </div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={typo.italic}
              onChange={(e) => onUpdateNested(`${basePath}.italic`, e.target.checked)}
            />
            {' Italic'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={typo.color}
              onChange={(e) => onUpdateNested(`${basePath}.color`, e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={typo.color}
              onChange={(e) => onUpdateNested(`${basePath}.color`, e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Line Height</label>
          <input
            type="number"
            className="control-input"
            value={typo.lineHeight}
            onChange={(e) => onUpdateNested(`${basePath}.lineHeight`, parseFloat(e.target.value))}
            step="0.1"
            min="1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Letter Spacing (px)</label>
          <input
            type="number"
            className="control-input"
            value={typo.letterSpacing}
            onChange={(e) => onUpdateNested(`${basePath}.letterSpacing`, parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Alignment</label>
          <select
            className="control-select"
            value={typo.alignment}
            onChange={(e) => onUpdateNested(`${basePath}.alignment`, e.target.value as 'Left' | 'Center' | 'Right')}
          >
            {ALIGNMENT_OPTIONS.map((align) => (
              <option key={align} value={align}>
                {align}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Paragraph Spacing Before (px)</label>
          <input
            type="number"
            className="control-input"
            value={typo.paragraphSpacingBefore}
            onChange={(e) => onUpdateNested(`${basePath}.paragraphSpacingBefore`, parseFloat(e.target.value))}
            step="1"
            min="0"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Paragraph Spacing After (px)</label>
          <input
            type="number"
            className="control-input"
            value={typo.paragraphSpacingAfter}
            onChange={(e) => onUpdateNested(`${basePath}.paragraphSpacingAfter`, parseFloat(e.target.value))}
            step="1"
            min="0"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {typographies.map(({ key, label }) => renderTypographyPanel(key, label))}
    </>
  );
};

export default TypographyControls;
