import React from 'react';
import type { DesignConfig } from '../types';
import type { PresetName } from '../presets';
import PageControls from './panels/PageControls';
import TypographyControls from './panels/TypographyControls';
import ColourControls from './panels/ColourControls';
import BackgroundControls from './panels/BackgroundControls';
import LogoControls from './panels/LogoControls';
import HeaderControls from './panels/HeaderControls';
import FooterControls from './panels/FooterControls';
import TableControls from './panels/TableControls';
import PresetSelector from './panels/PresetSelector';

interface RightPanelProps {
  selectedSection: string;
  design: DesignConfig;
  onUpdateNested: (path: string, value: any) => void;
  onLoadPreset: (presetName: PresetName) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  selectedSection,
  design,
  onUpdateNested,
  onLoadPreset,
}) => {
  return (
    <div className="right-panel">
      {selectedSection === 'Page' && (
        <PageControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Typography' && (
        <TypographyControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Colours' && (
        <ColourControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Background' && (
        <BackgroundControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Logo' && (
        <LogoControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Header' && (
        <HeaderControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Footer' && (
        <FooterControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Table' && (
        <TableControls design={design} onUpdateNested={onUpdateNested} />
      )}
      {selectedSection === 'Presets' && (
        <PresetSelector onLoadPreset={onLoadPreset} />
      )}
    </div>
  );
};

export default RightPanel;
