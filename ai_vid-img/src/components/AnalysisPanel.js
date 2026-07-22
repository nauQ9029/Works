import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Loader2, AlertCircle, ShoppingBag, Layers, Activity, Maximize, FileText } from 'lucide-react';
import './AnalysisPanel.css';

const AnalysisPanel = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="analysis-panel glass-panel loading-state"
      >
        <Loader2 className="spinner" size={48} />
        <h3>Analyzing with AI...</h3>
        <p>Identifying furniture style, material, and characteristics</p>
        
        <div className="skeleton-container">
          <div className="skeleton title"></div>
          <div className="skeleton line"></div>
          <div className="skeleton line"></div>
          <div className="skeleton line short"></div>
          
          <div className="skeleton-cards">
            <div className="skeleton card"></div>
            <div className="skeleton card"></div>
            <div className="skeleton card"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="analysis-panel glass-panel error-state"
      >
        <AlertCircle size={48} className="error-icon" />
        <h3>Analysis Failed</h3>
        <p>{error}</p>
      </motion.div>
    );
  }

  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="analysis-panel glass-panel empty-state"
      >
        <Sparkles size={48} className="empty-icon" />
        <h3>Awaiting Material</h3>
        <p>Upload an image or video and click analyze to extract furniture details.</p>
      </motion.div>
    );
  }

  // Attempt to parse JSON
  let parsedData = null;
  try {
    // Sometimes the AI wraps it in markdown js blocks despite instructions
    const cleanData = data.replace(/```json\n?|```/g, '').trim();
    parsedData = JSON.parse(cleanData);
  } catch (e) {
    console.error("Failed to parse JSON", e);
    // Fallback if parsing fails totally
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="analysis-panel glass-panel success-state"
      >
        <div className="panel-header">
          <div className="title-wrapper">
            <Sparkles className="title-icon" size={20} />
            <h2>Analysis Complete</h2>
          </div>
        </div>
        <div className="analysis-content prose">
          <p>{data}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="analysis-panel glass-panel success-state"
    >
      <div className="panel-header">
        <div className="title-wrapper">
          <Sparkles className="title-icon" size={20} />
          <h2>Survey Analysis Complete</h2>
        </div>
        <div className="success-badge">
          <CheckCircle2 size={14} /> AI Appraised
        </div>
      </div>
      
      <div className="analysis-content">
        
        {parsedData.notes && (
          <p className="ai-description">
            <FileText size={16} className="inline-icon" />
            {parsedData.notes}
          </p>
        )}

        {/* Survey Overview Card Group */}
        <div className="info-grid">
          {parsedData.totalActualItems !== undefined && (
            <div className="info-card">
              <div className="card-header">
                <ShoppingBag size={18} className="card-icon style-icon" />
                <h3>Total Items</h3>
              </div>
              <p>{parsedData.totalActualItems}</p>
            </div>
          )}

          {parsedData.totalActualWeight !== undefined && (
            <div className="info-card">
              <div className="card-header">
                <Activity size={18} className="card-icon dim-icon" />
                <h3>Est. Weight (kg)</h3>
              </div>
              <p>{parsedData.totalActualWeight}</p>
            </div>
          )}

          {parsedData.totalActualVolume !== undefined && (
            <div className="info-card">
              <div className="card-header">
                <Maximize size={18} className="card-icon dim-icon" />
                <h3>Est. Volume (m³)</h3>
              </div>
              <p>{parsedData.totalActualVolume}</p>
            </div>
          )}
        </div>

        {/* Moving Logistics Section */}
        <div className="detail-section" style={{ marginTop: '0.5rem' }}>
          <h3 className="section-title">
             Moving Logistics
          </h3>
          <div className="tag-container">
            {parsedData.suggestedVehicle && (
              <span className="detail-tag material-tag">🚚 Vehicle: {parsedData.suggestedVehicle}</span>
            )}
            {parsedData.suggestedStaffCount && (
              <span className="detail-tag material-tag">👷 Staff: {parsedData.suggestedStaffCount} Personnel</span>
            )}
          </div>
        </div>

        {/* Individual Items List */}
        {parsedData.items && parsedData.items.length > 0 && (
          <div className="detail-section">
            <h3 className="section-title">
              <Layers size={18} /> Inventoried Items ({parsedData.items.length})
            </h3>
            <ul className="feature-list" style={{ overflowY: 'auto', maxHeight: '400px' }}>
              {parsedData.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={14} className="list-icon" />
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                    </div>
                    <span 
                      className="success-badge" 
                      style={{ 
                        fontSize: '0.75rem', 
                        borderColor: item.condition === 'FRAGILE' ? 'orange' : item.condition === 'DAMAGED' ? 'red' : 'inherit',
                        color: item.condition === 'FRAGILE' ? 'orange' : item.condition === 'DAMAGED' ? 'red' : 'inherit'
                      }}
                    >
                      {item.condition}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', opacity: 0.8, paddingLeft: '1.5rem' }}>
                     {item.actualWeight && <span>Weight: {item.actualWeight}kg</span>}
                     {item.actualVolume && <span>Volume: {item.actualVolume}m³</span>}
                     {item.actualDimensions && (
                        <span style={{ gridColumn: 'span 2' }}>
                          Size: {item.actualDimensions.length}L x {item.actualDimensions.width}W x {item.actualDimensions.height}H cm
                        </span>
                     )}
                  </div>
                  
                  {item.notes && (
                    <div style={{ fontSize: '0.8rem', paddingLeft: '1.5rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                      Note: {item.notes}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default AnalysisPanel;
