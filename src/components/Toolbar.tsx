import React from 'react';

interface ToolbarProps {
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onNew,
  onSave,
  onLoad,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-title">Document Design Studio</div>
      <button className="toolbar-button" onClick={onNew}>
        New
      </button>
      <button className="toolbar-button" onClick={onLoad}>
        Open Design
      </button>
      <button className="toolbar-button" onClick={onSave}>
        Save Design
      </button>
      <button className="toolbar-button" onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button className="toolbar-button" onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

export default Toolbar;
