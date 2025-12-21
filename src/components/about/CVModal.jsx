import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./cvmodal.css";

// Configure PDF.js worker - using local worker from node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const CVModal = ({ isOpen, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  // PDF is now in the public folder, so use the absolute path
  const cvUrl = `${process.env.PUBLIC_URL}/Abdullah_Resume.pdf`;

  function onDocumentLoadSuccess({ numPages }) {
    console.log("PDF loaded successfully with", numPages, "pages");
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(error) {
    console.error("Error while loading document:", error.message);
  }

  if (!isOpen) return null;

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cv-modal-header">
          <h3 className="cv-modal-title">Curriculum Vitae</h3>
          <button 
            className="cv-modal-close" 
            onClick={onClose} 
            aria-label="Close modal"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="cv-modal-content cv-modal-scroll">
          <Document
            file={cvUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="cv-modal-loading">
                <div className="loader"></div>
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="cv-modal-error">
                <p>Failed to load PDF. Please try downloading it instead.</p>
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`}
                pageNumber={index + 1} 
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="cv-pdf-page"
                width={Math.min(window.innerWidth * 0.9, 800)}
              />
            ))}
          </Document>
        </div>

        <div className="cv-modal-footer">
          <a 
            download="Abdullah_Resume.pdf" 
            href={cvUrl} 
            className="button button--sm"
          >
            <span>Download PDF</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVModal;