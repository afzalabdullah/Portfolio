import React, { useState, useEffect, useRef } from 'react';
import './work.css';
import { projects } from './data';

const categories = ['All', 'Flutter', 'Website', 'Web App', 'AI'];

/* ===================== PROJECT CARD ===================== */
const ProjectCard = ({ project, idx, onClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  const hasMultiple = project.images.length > 1;

  useEffect(() => {
    if (isHovered && hasMultiple) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % project.images.length);
      }, 2500);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isHovered, hasMultiple, project.images.length]);

  return (
    <article
      className="work-card"
      style={{ '--i': idx, animationDelay: `${idx * 0.08}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentSlide(0);
      }}
      onClick={() => onClick(project)}
    >
      {/* Image Area */}
      <div className="work-card__visual">
        <div className="work-card__badge">{project.category}</div>

        <div className="work-card__gallery">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={project.title}
              className={`work-card__img ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="work-card__overlay">
          <div className="work-card__cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            View Details
          </div>
        </div>

        {hasMultiple && (
          <div className="work-card__counter">
            <span className="work-card__counter-current">{currentSlide + 1}</span>
            <span className="work-card__counter-sep">/</span>
            <span>{project.images.length}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="work-card__body">
        <h3 className="work-card__title">{project.title}</h3>
        <p className="work-card__desc">{project.description}</p>

        {project.tags && (
          <div className="work-card__tags">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="work-card__tag">{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className="work-card__tag work-card__tag--more">+{project.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

/* ===================== PROJECT MODAL ===================== */
const ProjectModal = ({ project, onClose }) => {
  const sliderRef = useRef(null);

  const [activeImg, setActiveImg] = useState(0);
  const THUMB_WINDOW_SIZE = 3;
  const [thumbStart, setThumbStart] = useState(0);

  // 🔒 Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  // 🔁 Reset on project change
  useEffect(() => {
    if (!project) return;

    setActiveImg(0);
    setThumbStart(0);

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [project]);

  // 🚫 SAFETY RENDER GUARD (AFTER HOOKS)
  if (!project || !project.images) return null;

  const updateThumbWindow = (index) => {
    if (index >= thumbStart + THUMB_WINDOW_SIZE) {
      setThumbStart(
        Math.min(
          index - (THUMB_WINDOW_SIZE - 1),
          project.images.length - THUMB_WINDOW_SIZE
        )
      );
    } else if (index < thumbStart) {
      setThumbStart(index);
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const index = Math.round(
      sliderRef.current.scrollLeft / sliderRef.current.offsetWidth
    );

    setActiveImg(index);
    updateThumbWindow(index);
  };

  const scrollToImage = (index) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollTo({
      left: sliderRef.current.offsetWidth * index,
      behavior: 'smooth',
    });

    setActiveImg(index);
    updateThumbWindow(index);
  };
  const nextImage = () => {
    if (activeImg < project.images.length - 1) {
      scrollToImage(activeImg + 1);
    }
  };

  const prevImage = () => {
    if (activeImg > 0) {
      scrollToImage(activeImg - 1);
    }
  };

  return (
    <div className="project-modal" onClick={onClose}>
      <div className="project-modal__content" onClick={e => e.stopPropagation()}>
        <button className="project-modal__close" onClick={onClose}>✕</button>

        <div className="project-modal__grid">
          <div className="project-modal__gallery">
            <div className="project-modal__slider-container">
              {project.images.length > 1 && (
                <>
                  <button
                    className={`project-modal__nav project-modal__nav--prev ${activeImg === 0 ? 'disabled' : ''}`}
                    onClick={prevImage}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    className={`project-modal__nav project-modal__nav--next ${activeImg === project.images.length - 1 ? 'disabled' : ''}`}
                    onClick={nextImage}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}
              <div
                className="project-modal__slider"
                ref={sliderRef}
                onScroll={handleScroll}
              >
                {project.images.map((img, i) => (
                  <div key={i} className="project-modal__slide">
                    <img src={img} alt={`${project.title} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* SLIDING WINDOW THUMBNAILS */}
            <div className="project-modal__thumbs">
              {project.images
                .slice(thumbStart, thumbStart + THUMB_WINDOW_SIZE)
                .map((img, i) => {
                  const actualIndex = thumbStart + i;

                  return (
                    <div
                      key={actualIndex}
                      className={`project-modal__thumb ${actualIndex === activeImg ? 'active' : ''
                        }`}
                      onClick={() => scrollToImage(actualIndex)}
                    >
                      <img src={img} alt="" />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="project-modal__details">
            <span className="project-modal__category">{project.category}</span>
            <h2 className="project-modal__title">{project.title}</h2>
            <p className="project-modal__description">
              {project.longDescription || project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== WORK ===================== */
const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const filterRefs = useRef({});
  const containerRef = useRef(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p =>
        p.category.includes(selectedCategory.split(' ')[0])
      );

  useEffect(() => {
    const activeButton = filterRefs.current[selectedCategory];
    if (activeButton && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [selectedCategory]);

  return (
    <section className="work section" id="work">
      <div className="container">
        {/* Redesigned Header */}
        <div className="work__header">
          <span className="work__label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Portfolio
          </span>
          <h2 className="work__title">
            Selected <span className="work__title-accent">Projects</span>
          </h2>
          <p className="work__subtitle">
            Enterprise solutions, mobile apps, and AI platforms — built with precision.
          </p>
        </div>

        {/* Filters */}
        <div className="work__filters">
          <div className="work__filters-inner" ref={containerRef}>
            <div className="work__filter-indicator" style={indicatorStyle}></div>
            {categories.map(cat => (
              <button
                key={cat}
                ref={el => (filterRefs.current[cat] = el)}
                className={`work__filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Count */}
        <div className="work__count">
          <span className="work__count-number">{filteredProjects.length}</span>
          <span className="work__count-text">
            {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        {/* Grid */}
        <div className="work__grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Work;
