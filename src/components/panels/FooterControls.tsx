import React from 'react';
import type { DesignConfig, PageNumberConfig, PageNumberFormat } from '../../types';
import { FONT_FAMILIES } from '../../utils';
import PaletteColorField from './PaletteColorField';

interface FooterControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const PAGE_NUMBER_FORMATS: Array<{ value: PageNumberFormat; label: string }> = [
  { value: 'Arabic', label: 'Arabic (1, 2, 3)' },
  { value: 'Roman', label: 'Roman (i, ii, iii)' },
];

const PAGE_NUMBER_POSITIONS: Array<{ value: PageNumberConfig['position']; label: string }> = [
  { value: 'BottomLeft', label: 'Left' },
  { value: 'BottomCenter', label: 'Center' },
  { value: 'BottomRight', label: 'Right' },
];

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
        <div className="panel-title">Page Number</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={footer.includePageNumber}
              onChange={(e) => onUpdateNested('footer.includePageNumber', e.target.checked)}
              disabled={!footer.enabled}
            />
            {' Include page number in footer'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">Format</label>
          <select
            className="control-select"
            value={design.pageNumber.format === 'None' ? 'Arabic' : design.pageNumber.format}
            onChange={(e) => onUpdateNested('pageNumber.format', e.target.value as PageNumberFormat)}
            disabled={!footer.enabled || !footer.includePageNumber}
          >
            {PAGE_NUMBER_FORMATS.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Position</label>
          <select
            className="control-select"
            value={design.pageNumber.position}
            onChange={(e) => onUpdateNested('pageNumber.position', e.target.value)}
            disabled={!footer.enabled || !footer.includePageNumber}
          >
            {PAGE_NUMBER_POSITIONS.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>Used when no footer slot contains {'{page}'}.</span>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Footer Styling</div>

        <div className="control-group">
          <label className="control-label">Font Family</label>
          <select
            className="control-select"
            value={design.typography.footer.fontFamily}
            onChange={(e) => onUpdateNested('typography.footer.fontFamily', e.target.value)}
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
            value={design.typography.footer.fontSize}
            onChange={(e) => onUpdateNested('typography.footer.fontSize', parseFloat(e.target.value))}
            step="0.5"
            disabled={!footer.enabled}
          />
        </div>

        <PaletteColorField
          label="Color"
          value={design.typography.footer.color}
          palette={design.colors}
          onChange={(color) => onUpdateNested('typography.footer.color', color)}
          disabled={!footer.enabled}
        />

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

        <PaletteColorField
          label="Border Color"
          value={footer.borderColor}
          palette={design.colors}
          onChange={(color) => onUpdateNested('footer.borderColor', color)}
          disabled={!footer.enabled || !footer.borderEnabled}
          allowCustom
        />
      </div>
    </>
  );
};

export default FooterControls;
