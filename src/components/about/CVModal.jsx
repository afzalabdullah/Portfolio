import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./cvmodal.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;

const CVModal = ({ isOpen, onClose, cvUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoaded(true);
  }

  function onDocumentLoadError(error) {
    console.error("PDF load error:", error);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentPage(1);
      setIsLoaded(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentPage < numPages) setCurrentPage((p) => p + 1);
      if (e.key === "ArrowLeft" && currentPage > 1) setCurrentPage((p) => p - 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentPage, numPages, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cv-overlay" onClick={onClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cv-modal__header">
          <div className="cv-modal__header-left">
            <div className="cv-modal__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <div>
              <h3 className="cv-modal__title">Curriculum Vitae</h3>
              <span className="cv-modal__subtitle">Abdullah Afzal — Senior Software Engineer</span>
            </div>
          </div>

          <div className="cv-modal__header-right">
            <a
              href={cvUrl}
              download="Abdullah_Resume.pdf"
              className="cv-modal__download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </a>
            <button className="cv-modal__close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="cv-modal__body">
          <Document
            file={cvUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="cv-modal__loading">
                <div className="cv-modal__spinner"></div>
                <p>Loading Resume...</p>
              </div>
            }
            error={
              <div className="cv-modal__error">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <p>Failed to load PDF</p>
                <a href={cvUrl} download className="cv-modal__error-link">Download instead →</a>
              </div>
            }
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={window.innerWidth > 900 ? 780 : window.innerWidth - 64}
                  renderAnnotationLayer={false}
                  className="cv-modal__page"
                />
              ))}
          </Document>
        </div>

        {/* Footer with page info */}
        {isLoaded && numPages && (
          <div className="cv-modal__footer">
            <span className="cv-modal__page-info">
              {numPages} {numPages === 1 ? "page" : "pages"}
            </span>
            <div className="cv-modal__footer-actions">
              <a
                href={cvUrl}
                download="Abdullah_Resume.pdf"
                className="cv-modal__footer-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Save PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVModal;
