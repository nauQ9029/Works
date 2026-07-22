import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, ExternalLink, HelpCircle } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(inputValue);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="modal-content glass-panel"
          >
            <div className="modal-header">
              <div className="modal-title">
                <Key size={20} className="modal-icon" />
                <h2>API Settings</h2>
              </div>
              <button className="close-btn" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-body">
              <div className="form-group">
                <label htmlFor="apiKey">
                  Google Gemini API Key
                  <span 
                    className="tooltip-wrapper"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <HelpCircle size={14} className="help-icon" />
                    {showTooltip && (
                      <span className="tooltip">
                        Your key is stored locally in your browser to maintain privacy. It is never sent to our servers.
                      </span>
                    )}
                  </span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="apiKey"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your API key..."
                    className="api-input"
                    autoComplete="off"
                  />
                </div>
              </div>
              
              <div className="api-info-card">
                <div className="info-badge">Free Tier Available</div>
                <p>
                  This analyzer uses the <strong>Gemini 1.5 Flash</strong> model, which provides a generous free tier of up to 15 Requests Per Minute!
                </p>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="get-key-link"
                >
                  Get your free API key here <ExternalLink size={14} />
                </a>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={!inputValue.trim()}>
                  Save Key
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
