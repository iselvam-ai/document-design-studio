import React from 'react';
import type { DesignConfig } from '../../types';

interface TableControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const TableControls: React.FC<TableControlsProps> = ({ design, onUpdateNested }) => {
  const table = design.table;

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Table Header</div>

        <div className="control-group">
          <label className="control-label">Background Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={table.headerBackground}
              onChange={(e) => onUpdateNested('table.headerBackground', e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={table.headerBackground}
              onChange={(e) => onUpdateNested('table.headerBackground', e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Text Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={table.headerTextColor}
              onChange={(e) => onUpdateNested('table.headerTextColor', e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={table.headerTextColor}
              onChange={(e) => onUpdateNested('table.headerTextColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Table Body</div>

        <div className="control-group">
          <label className="control-label">Background Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={table.bodyBackground}
              onChange={(e) => onUpdateNested('table.bodyBackground', e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={table.bodyBackground}
              onChange={(e) => onUpdateNested('table.bodyBackground', e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">Text Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={table.bodyTextColor}
              onChange={(e) => onUpdateNested('table.bodyTextColor', e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={table.bodyTextColor}
              onChange={(e) => onUpdateNested('table.bodyTextColor', e.target.value)}
            />
          </div>
        </div>

        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              className="checkbox"
              checked={table.stripedRows}
              onChange={(e) => onUpdateNested('table.stripedRows', e.target.checked)}
            />
            {' Striped Rows'}
          </label>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Table Borders</div>

        <div className="control-group">
          <label className="control-label">Border Thickness (px)</label>
          <input
            type="number"
            className="control-input"
            value={table.borderThickness}
            onChange={(e) => onUpdateNested('table.borderThickness', parseFloat(e.target.value))}
            step="0.5"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Border Color</label>
          <div className="color-picker-row">
            <input
              type="color"
              className="color-picker-input"
              value={table.borderColor}
              onChange={(e) => onUpdateNested('table.borderColor', e.target.value)}
            />
            <input
              type="text"
              className="color-hex-input"
              value={table.borderColor}
              onChange={(e) => onUpdateNested('table.borderColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Table Cell Padding</div>

        <div className="control-group">
          <label className="control-label">Cell Padding (px)</label>
          <input
            type="number"
            className="control-input"
            value={table.cellPadding}
            onChange={(e) => onUpdateNested('table.cellPadding', parseFloat(e.target.value))}
            step="0.5"
          />
        </div>
      </div>
    </>
  );
};

export default TableControls;
