import React from 'react';
import type { DesignConfig } from '../../types';
import PaletteColorField from './PaletteColorField';

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

        <PaletteColorField
          label="Background Color"
          value={table.headerBackground}
          palette={design.colors}
          onChange={(color) => onUpdateNested('table.headerBackground', color)}
        />

        <PaletteColorField
          label="Text Color"
          value={design.typography.tableHeader.color}
          palette={design.colors}
          onChange={(color) => onUpdateNested('typography.tableHeader.color', color)}
        />
      </div>

      <div className="panel-section">
        <div className="panel-title">Table Body</div>

        <PaletteColorField
          label="Background Color"
          value={table.bodyBackground}
          palette={design.colors}
          onChange={(color) => onUpdateNested('table.bodyBackground', color)}
        />

        <PaletteColorField
          label="Text Color"
          value={design.typography.tableBody.color}
          palette={design.colors}
          onChange={(color) => onUpdateNested('typography.tableBody.color', color)}
        />

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

        <PaletteColorField
          label="Border Color"
          value={table.borderColor}
          palette={design.colors}
          onChange={(color) => onUpdateNested('table.borderColor', color)}
        />
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
