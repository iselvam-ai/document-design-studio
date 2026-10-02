import React from 'react';
import type { ColorPalette } from '../../types';
import { PALETTE_COLORS, getPaletteKey, paletteRef, resolveColor } from '../../utils';

interface PaletteColorFieldProps {
  label: string;
  value: string;
  palette: ColorPalette;
  onChange: (value: string) => void;
  disabled?: boolean;
  // When true, a custom colour outside the palette can also be chosen.
  allowCustom?: boolean;
}

const PaletteColorField: React.FC<PaletteColorFieldProps> = ({
  label,
  value,
  palette,
  onChange,
  disabled = false,
  allowCustom = false,
}) => {
  const selectedKey = getPaletteKey(value);
  const selected = PALETTE_COLORS.find((c) => c.key === selectedKey);
  const resolved = resolveColor(value, palette);

  return (
    <div className="control-group">
      <label className="control-label">{label}</label>
      <div className="palette-swatches" role="group" aria-label={label}>
        {PALETTE_COLORS.map((color) => (
          <button
            key={color.key}
            type="button"
            className={`palette-swatch ${selectedKey === color.key ? 'selected' : ''}`}
            style={{ backgroundColor: palette[color.key] }}
            title={`${color.label} (${palette[color.key]})`}
            aria-label={color.label}
            aria-pressed={selectedKey === color.key}
            data-palette-key={color.key}
            onClick={() => onChange(paletteRef(color.key))}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="palette-selection">
        {selected ? `${selected.label} · ${resolved}` : `Custom · ${resolved}`}
        {!selected && !allowCustom && ' (choose a palette colour)'}
      </div>
      {allowCustom && (
        <div className="color-picker-row">
          <input
            type="color"
            className="color-picker-input"
            value={/^#[0-9a-f]{6}$/i.test(resolved) ? resolved : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            aria-label={`${label} custom colour`}
          />
          <input
            type="text"
            className="color-hex-input"
            value={selected ? '' : value}
            placeholder="Custom hex"
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default PaletteColorField;
