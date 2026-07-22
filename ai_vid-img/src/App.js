import React, { useState, useEffect } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import MediaUploader from './components/MediaUploader';
import MediaPreview from './components/MediaPreview';
import AnalysisPanel from './components/AnalysisPanel';
import SettingsModal from './components/SettingsModal';
import { analyzeMedia } from './services/gemini';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // API Key management
  const [apiKey, setApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Load API key from local storage on mount
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile);
    // Reset previous analysis when new file is uploaded
    setAnalysisResult(null);
    setError(null);
  };

  const handleClearFile = () => {
    setFile(null);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    if (!apiKey) {
      setIsSettingsOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeMedia(file, apiKey);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="logo-container">
          <Sparkles className="logo-icon" size={32} />
          <div>
            <h1 className="app-title">FurniVision AI</h1>
            <p className="app-subtitle">Intelligent furniture analysis using Google Gemini</p>
          </div>
        </div>
        
        <button 
          className={`settings-btn ${!apiKey ? 'missing-key' : ''}`}
          onClick={() => setIsSettingsOpen(true)}
          title="API Settings"
        >
          <Settings size={24} />
        </button>
      </header>

      <main className="main-content">
        <div className="left-panel fade-in" style={{ animationDelay: '0.1s' }}>
          {!file ? (
            <MediaUploader onFileSelected={handleFileSelected} />
          ) : (
            <>
              <MediaPreview file={file} onClear={handleClearFile} />
              <button 
                className="btn-primary" 
                onClick={handleAnalyze}
                disabled={isLoading}
              >
                <Sparkles size={20} />
                {isLoading ? 'Analyzing...' : 'Analyze Furniture'}
              </button>
            </>
          )}
        </div>

        <div className="right-panel fade-in" style={{ animationDelay: '0.2s' }}>
          <AnalysisPanel 
            data={analysisResult} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}

export default App;
