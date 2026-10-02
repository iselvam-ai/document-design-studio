import React from 'react';
import type { DesignConfig, Orientation, PageSize } from '../../types';
import { PAGE_SIZES } from '../../utils';

interface PageControlsProps {
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
}

const PAGE_SIZE_OPTIONS: PageSize[] = ['A5', 'A4', 'A3', 'Letter', 'Legal'];
const ORIENTATION_OPTIONS = ['Portrait', 'Landscape'];

const PageControls: React.FC<PageControlsProps> = ({ design, onUpdateNested }) => {
  const currentSize = design.page.size;
  const currentOrientation = design.page.orientation;

  // Size and orientation drive the page dimensions, so update them together as one undo step.
  const applySize = (size: PageSize, orientation: Orientation) => {
    const dims = PAGE_SIZES[size];
    if (!dims) {
      onUpdateNested('page', { ...design.page, size, orientation });
      return;
    }
    const landscape = orientation === 'Landscape';
    onUpdateNested('page', {
      ...design.page,
      size,
      orientation,
      width: landscape ? dims.height : dims.width,
      height: landscape ? dims.width : dims.height,
    });
  };

  return (
    <>
      <div className="panel-section">
        <div className="panel-title">Page</div>

        <div className="control-group">
          <label className="control-label">Size</label>
          <select
            className="control-select"
            value={currentSize}
            onChange={(e) => applySize(e.target.value as PageSize, currentOrientation)}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Orientation</label>
          <select
            className="control-select"
            value={currentOrientation}
            onChange={(e) => applySize(currentSize, e.target.value as Orientation)}
          >
            {ORIENTATION_OPTIONS.map((orientation) => (
              <option key={orientation} value={orientation}>
                {orientation}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Width (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.width}
            onChange={(e) => onUpdateNested('page.width', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Height (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.height}
            onChange={(e) => onUpdateNested('page.height', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-title">Margins</div>

        <div className="control-group">
          <label className="control-label">Top (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.margins.top}
            onChange={(e) => onUpdateNested('page.margins.top', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Bottom (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.margins.bottom}
            onChange={(e) => onUpdateNested('page.margins.bottom', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Left (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.margins.left}
            onChange={(e) => onUpdateNested('page.margins.left', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Right (mm)</label>
          <input
            type="number"
            className="control-input"
            value={design.page.margins.right}
            onChange={(e) => onUpdateNested('page.margins.right', parseFloat(e.target.value))}
            step="0.1"
          />
        </div>
      </div>
    </>
  );
};

export default PageControls;
