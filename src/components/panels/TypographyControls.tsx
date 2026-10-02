import React, { useState } from 'react';
import type { DesignConfig, TypographyConfig } from '../../types';
import { FONT_FAMILIES } from '../../utils';
import PaletteColorField from './PaletteColorField';

interface TypographyControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

type TypographyKey = keyof TypographyConfig;

// Where each style appears in the document; spacing/alignment only apply to some of them.
const STYLE_GROUPS: Array<{ group: string; styles: Array<{ key: TypographyKey; label: string }> }> = [
  {
    group: 'Headings',
    styles: [
      { key: 'documentTitle', label: 'Document Title' },
      { key: 'subtitle', label: 'Subtitle' },
      { key: 'partTitle', label: 'Part Title (Heading 1)' },
      { key: 'articleTitle', label: 'Article Title (Heading 2)' },
      { key: 'sectionTitle', label: 'Section Title (Heading 3)' },
    ],
  },
  {
    group: 'Text',
    styles: [
      { key: 'leadParagraph', label: 'Lead Paragraph' },
      { key: 'body', label: 'Body Text' },
      { key: 'caption', label: 'Caption' },
    ],
  },
  {
    group: 'Table',
    styles: [
      { key: 'tableHeader', label: 'Table Header' },
      { key: 'tableBody', label: 'Table Body' },
    ],
  },
  {
    group: 'Page',
    styles: [
      { key: 'header', label: 'Page Header' },
      { key: 'footer', label: 'Page Footer' },
    ],
  },
];

const ALL_STYLES = STYLE_GROUPS.flatMap((g) => g.styles);
const NO_SPACING: TypographyKey[] = ['tableHeader', 'tableBody', 'header', 'footer'];
const NO_ALIGNMENT: TypographyKey[] = ['header', 'footer'];

const ALIGNMENT_OPTIONS = ['Left', 'Center', 'Right', 'Justify'];

const TypographyControls: React.FC<TypographyControlsProps> = ({ design, onUpdateNested }) => {
  const [selectedStyle, setSelectedStyle] = useState<TypographyKey>('documentTitle');

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

        <PaletteColorField
          label="Color"
          value={typo.color}
          palette={design.colors}
          onChange={(color) => onUpdateNested(`${basePath}.color`, color)}
        />

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

        {!NO_ALIGNMENT.includes(key) && (
          <div className="control-group">
            <label className="control-label">Alignment</label>
            <select
              className="control-select"
              value={typo.alignment}
              onChange={(e) => onUpdateNested(`${basePath}.alignment`, e.target.value)}
            >
              {ALIGNMENT_OPTIONS.map((align) => (
                <option key={align} value={align}>
                  {align}
                </option>
              ))}
            </select>
          </div>
        )}

        {!NO_SPACING.includes(key) && (
          <>
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
          </>
        )}
      </div>
    );
  };

  const selected = ALL_STYLES.find((style) => style.key === selectedStyle) ?? ALL_STYLES[0];

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Text Styles</div>
        <div className="control-group">
          <label className="control-label">Style</label>
          <select
            className="control-select"
            value={selected.key}
            onChange={(e) => setSelectedStyle(e.target.value as TypographyKey)}
          >
            {STYLE_GROUPS.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.styles.map((style) => (
                  <option key={style.key} value={style.key}>
                    {style.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
      {renderTypographyPanel(selected.key, selected.label)}
    </>
  );
};

export default TypographyControls;
