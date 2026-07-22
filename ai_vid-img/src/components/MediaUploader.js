import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileVideo, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import './MediaUploader.css';

const MediaUploader = ({ onFileSelected }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel uploader-container ${isDragActive ? 'active' : ''} ${isDragReject ? 'reject' : ''}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="uploader-content">
        <div className="icon-group">
          <UploadCloud size={48} className="main-icon" />
          <div className="sub-icons">
            <ImageIcon size={20} className="sub-icon" />
            <FileVideo size={20} className="sub-icon" />
          </div>
        </div>
        
        <h3>
          {isDragActive
            ? "Drop your file here..."
            : "Drag & drop an image or video"}
        </h3>
        <p className="subtitle">
          or click to browse from your computer
        </p>
        
        <div className="file-limits">
          <span>Supported: JPG, PNG, WEBP, MP4, MOV, WEBM</span>
          <span>Max size: 50MB</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaUploader;
