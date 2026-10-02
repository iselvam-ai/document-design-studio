import React, { useState, useCallback, useEffect } from 'react';
import type { DesignConfig } from './types';
import type { PresetName } from './presets';
import { PRESET_PREMIUM_CORPORATE, presets } from './presets';
import { saveToLocalStorage, loadFromLocalStorage, exportDesignAsJson, importDesignFromJson } from './utils';
import Toolbar from './components/Toolbar';
import LeftSidebar from './components/LeftSidebar';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import './App.css';

type HistoryState = {
  present: DesignConfig;
  past: DesignConfig[];
  future: DesignConfig[];
};

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Page');
  const [history, setHistory] = useState<HistoryState>(() => {
    const saved = loadFromLocalStorage();
    const initial = saved || PRESET_PREMIUM_CORPORATE;
    return {
      present: initial,
      past: [],
      future: [],
    };
  });

  const design = history.present;

  const updateNestedDesign = useCallback((path: string, value: any) => {
    const keys = path.split('.');
    setHistory((prev) => {
      const newDesign = JSON.parse(JSON.stringify(prev.present));
      let obj = newDesign;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return {
        past: [...prev.past, prev.present],
        present: newDesign,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      return {
        past: prev.past.slice(0, -1),
        present: prev.past[prev.past.length - 1],
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      return {
        past: [...prev.past, prev.present],
        present: prev.future[0],
        future: prev.future.slice(1),
      };
    });
  }, []);

  const handleLoadPreset = (presetName: PresetName) => {
    setHistory({
      past: [...history.past, history.present],
      present: JSON.parse(JSON.stringify(presets[presetName])),
      future: [],
    });
    setSelectedSection('Page');
  };

  const handleSaveDesign = () => {
    const json = exportDesignAsJson(design);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', 'document-design.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLoadDesign = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const importedDesign = importDesignFromJson(event.target.result);
          if (importedDesign) {
            setHistory({
              past: [...history.past, history.present],
              present: importedDesign,
              future: [],
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleNewDesign = () => {
    if (window.confirm('Create a new design? Current changes will be lost if not saved.')) {
      setHistory({
        past: [],
        present: JSON.parse(JSON.stringify(PRESET_PREMIUM_CORPORATE)),
        future: [],
      });
      setSelectedSection('Page');
    }
  };

  useEffect(() => {
    saveToLocalStorage(design);
  }, [design]);

  return (
    <div className="app">
      <Toolbar
        onNew={handleNewDesign}
        onSave={handleSaveDesign}
        onLoad={handleLoadDesign}
        onUndo={undo}
        onRedo={redo}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
      />
      <div className="content">
        <LeftSidebar selectedSection={selectedSection} onSelectSection={setSelectedSection} />
        <Canvas design={design} />
        <RightPanel
          selectedSection={selectedSection}
          design={design}
          onUpdateNested={updateNestedDesign}
          onLoadPreset={handleLoadPreset}
        />
      </div>
    </div>
  );
};

export default App;
