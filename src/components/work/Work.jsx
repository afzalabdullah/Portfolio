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
      className="project-card"
      style={{ '--i': idx }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentSlide(0);
      }}
      onClick={() => onClick(project)}
    >
      <div className="project-card__image-box">
        <div className="project-card__category">{project.category}</div>

        <div className="project-card__gallery">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={project.title}
              className={`project-card__img ${i === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="project-card__overlay">
          <div className="project-card__btn">View Details</div>
        </div>

        {hasMultiple && (
          <div className="project-card__counter">
            {currentSlide + 1} / {project.images.length}
          </div>
        )}
      </div>

      <div className="project-card__info">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
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

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p =>
        p.category.includes(selectedCategory.split(' ')[0])
      );

  return (
    <section className="work section" id="work">
      <div className="container">
        <div className="work__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`work__filter-btn ${selectedCategory === cat ? 'active' : ''
                }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

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
