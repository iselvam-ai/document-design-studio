import React from 'react';
import type { DesignConfig } from '../../types';

interface LogoControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const LogoControls: React.FC<LogoControlsProps> = ({ design, onUpdateNested }) => {
  const logo = design.logo;

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Logo</div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={logo.enabled}
              onChange={(e) => onUpdateNested('logo.enabled', e.target.checked)}
            />
            {' Enabled'}
          </label>
        </div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={design.header.includeLogo}
              onChange={(e) => onUpdateNested('header.includeLogo', e.target.checked)}
              disabled={!logo.enabled}
            />
            {' Include logo in header'}
          </label>
          {logo.enabled && design.header.includeLogo && !design.header.enabled && (
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Enable the header to show the logo there.</span>
          )}
        </div>

        <div className="control-group">
          <label className="control-label">Image URL</label>
          <input
            type="text"
            className="control-input"
            value={logo.source}
            onChange={(e) => onUpdateNested('logo.source', e.target.value)}
            placeholder="https://example.com/logo.png"
            disabled={!logo.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Width (mm)</label>
          <input
            type="number"
            className="control-input"
            value={logo.width}
            onChange={(e) => onUpdateNested('logo.width', parseFloat(e.target.value))}
            step="0.1"
            disabled={!logo.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Height (mm)</label>
          <input
            type="number"
            className="control-input"
            value={logo.height}
            onChange={(e) => onUpdateNested('logo.height', parseFloat(e.target.value))}
            step="0.1"
            disabled={!logo.enabled}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Position X (mm)</label>
          <input
            type="number"
            className="control-input"
            value={logo.x}
            onChange={(e) => onUpdateNested('logo.x', parseFloat(e.target.value))}
            step="0.1"
            disabled={!logo.enabled || design.header.includeLogo}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Position Y (mm)</label>
          <input
            type="number"
            className="control-input"
            value={logo.y}
            onChange={(e) => onUpdateNested('logo.y', parseFloat(e.target.value))}
            step="0.1"
            disabled={!logo.enabled || design.header.includeLogo}
          />
        </div>

        <div className="control-group">
          <label className="control-label">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={logo.opacity}
            onChange={(e) => onUpdateNested('logo.opacity', parseFloat(e.target.value))}
            disabled={!logo.enabled}
          />
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{(logo.opacity * 100).toFixed(0)}%</span>
        </div>
      </div>
    </>
  );
};

export default LogoControls;
