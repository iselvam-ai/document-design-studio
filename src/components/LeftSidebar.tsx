import React from 'react';

interface LeftSidebarProps {
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

const sections = [
  'Page',
  'Typography',
  'Colours',
  'Background',
  'Logo',
  'Header',
  'Footer',
  'Table',
  'Presets',
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ selectedSection, onSelectSection }) => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Design</div>
        {sections.map((section) => (
          <div
            key={section}
            className={`section-item ${selectedSection === section ? 'active' : ''}`}
            onClick={() => onSelectSection(section)}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
