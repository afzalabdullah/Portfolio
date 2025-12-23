import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./cvmodal.css";

// PDF.js worker (Vite compatible)
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = 
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const CVModal = ({ isOpen, onClose, cvUrl }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error) {
    console.error("PDF load error:", error);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div
        className="cv-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cv-modal-header">
          <h3>Curriculum Vitae</h3>
          <button className="cv-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cv-modal-content">
          <Document
            file={cvUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="cv-modal-loading"><div className="loader"></div><p>Loading PDF...</p></div>}
            error={<div className="cv-modal-error"><p>Failed to load PDF</p></div>}
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={window.innerWidth > 900 ? 800 : window.innerWidth - 60}
                  renderAnnotationLayer={false}
                  className="cv-pdf-page"
                />
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default CVModal;
