import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import './MediaPreview.css';

const MediaPreview = ({ file, onClear }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file || !previewUrl) return null;

  const isVideo = file.type.startsWith('video/');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="preview-container glass-panel"
    >
      <button className="clear-btn" onClick={onClear} aria-label="Remove media">
        <X size={16} />
      </button>

      <div className="media-wrapper">
        {isVideo ? (
          <video 
            src={previewUrl} 
            controls 
            className="media-item"
            playsInline
          />
        ) : (
          <img 
            src={previewUrl} 
            alt="Furniture to analyze" 
            className="media-item"
          />
        )}
      </div>

      <div className="file-info">
        <span className="file-name" title={file.name}>{file.name}</span>
        <span className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
      </div>
    </motion.div>
  );
};

export default MediaPreview;
