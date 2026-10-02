import React from 'react';
import type { DesignConfig, BackgroundType } from '../../types';
import PaletteColorField from './PaletteColorField';

interface BackgroundControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const BACKGROUND_TYPES: BackgroundType[] = ['Solid', 'Gradient', 'Image', 'Shapes'];

const BackgroundControls: React.FC<BackgroundControlsProps> = ({ design, onUpdateNested }) => {
  const bg = design.background;

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Background</div>

        <div className="control-group">
          <label className="control-label">Type</label>
          <select
            className="control-select"
            value={bg.type}
            onChange={(e) => onUpdateNested('background.type', e.target.value as BackgroundType)}
          >
            {BACKGROUND_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {bg.type === 'Solid' && (
          <PaletteColorField
            label="Color"
            value={bg.solidColor}
            palette={design.colors}
            onChange={(color) => onUpdateNested('background.solidColor', color)}
            allowCustom
          />
        )}

        {bg.type === 'Gradient' && (
          <>
            <PaletteColorField
              label="Color 1"
              value={bg.gradientColor1}
              palette={design.colors}
              onChange={(color) => onUpdateNested('background.gradientColor1', color)}
              allowCustom
            />

            <PaletteColorField
              label="Color 2"
              value={bg.gradientColor2}
              palette={design.colors}
              onChange={(color) => onUpdateNested('background.gradientColor2', color)}
              allowCustom
            />

            <div className="control-group">
              <label className="control-label">Direction (degrees)</label>
              <input
                type="number"
                className="control-input"
                value={bg.gradientDirection}
                onChange={(e) => onUpdateNested('background.gradientDirection', e.target.value)}
              />
            </div>

            <div className="control-group">
              <label className="control-label">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={bg.gradientOpacity}
                onChange={(e) => onUpdateNested('background.gradientOpacity', parseFloat(e.target.value))}
              />
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>{(bg.gradientOpacity * 100).toFixed(0)}%</span>
            </div>
          </>
        )}

        {bg.type === 'Image' && (
          <>
            <div className="control-group">
              <label className="control-label">Image URL</label>
              <input
                type="text"
                className="control-input"
                value={bg.imageUrl}
                onChange={(e) => onUpdateNested('background.imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="control-group">
              <label className="control-label">Fit</label>
              <select
                className="control-select"
                value={bg.imageFit}
                onChange={(e) => onUpdateNested('background.imageFit', e.target.value)}
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="stretch">Stretch</option>
                <option value="repeat">Repeat</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Position X (%)</label>
              <input
                type="number"
                className="control-input"
                value={bg.imagePositionX}
                onChange={(e) => onUpdateNested('background.imagePositionX', parseFloat(e.target.value))}
                min="0"
                max="100"
              />
            </div>

            <div className="control-group">
              <label className="control-label">Position Y (%)</label>
              <input
                type="number"
                className="control-input"
                value={bg.imagePositionY}
                onChange={(e) => onUpdateNested('background.imagePositionY', parseFloat(e.target.value))}
                min="0"
                max="100"
              />
            </div>

            <div className="control-group">
              <label className="control-label">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={bg.imageOpacity}
                onChange={(e) => onUpdateNested('background.imageOpacity', parseFloat(e.target.value))}
              />
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>{(bg.imageOpacity * 100).toFixed(0)}%</span>
            </div>
          </>
        )}

        {bg.type === 'Shapes' && (
          <div style={{ fontSize: '12px', color: '#9ca3af', padding: '8px' }}>
            Decorative shapes are managed through the background configuration. Each shape has position, size, rotation,
            color, and opacity properties.
          </div>
        )}
      </div>
    </>
  );
};

export default BackgroundControls;
