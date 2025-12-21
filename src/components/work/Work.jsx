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
      className={`project-card ${isHovered ? 'hover' : ''}`}
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
          <div className="project-card__btn">
            View Details
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
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

        <div className="project-card__tags">
          {project.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="project-card__tag">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ===================== PROJECT MODAL ===================== */
const ProjectModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return (
    <div className="project-modal" onClick={onClose}>
      <div className="project-modal__content" onClick={e => e.stopPropagation()}>
        <button className="project-modal__close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="project-modal__grid">
          <div className="project-modal__gallery">
            <div className="project-modal__main-img">
              <img src={project.images[activeImg]} alt={project.title} />
            </div>

            {project.images.length > 1 && (
              <div className="project-modal__thumbs">
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className={`project-modal__thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="project-modal__details">
            <span className="project-modal__category">{project.category}</span>
            <h2 className="project-modal__title">{project.title}</h2>

            <div className="project-modal__tags">
              {project.tags?.map(tag => (
                <span key={tag} className="project-modal__tag">#{tag}</span>
              ))}
            </div>

            <div className="project-modal__description">
              {project.longDescription || project.description}
            </div>

            <div className="project-modal__actions">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--large"
                >
                  Visit Live Site
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}

              <div className="project-modal__store-links">
                {project.appLinks?.playStore && (
                  <a href={project.appLinks.playStore} target="_blank" rel="noreferrer" className="modal-link">
                    Google Play
                  </a>
                )}
                {project.appLinks?.appStore && (
                  <a href={project.appLinks.appStore} target="_blank" rel="noreferrer" className="modal-link">
                    App Store
                  </a>
                )}
              </div>
            </div>
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

  useEffect(() => {
    const updateIndicator = () => {
      const activeBtn = filterRefs.current[selectedCategory];

      if (activeBtn) {
        setIndicatorStyle({
          left: `${activeBtn.offsetLeft}px`,
          width: `${activeBtn.offsetWidth}px`,
        });

        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [selectedCategory]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p =>
          p.category.includes(selectedCategory.split(' ')[0])
        );

  return (
    <section className="work section" id="work">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section__label">Portfolio</span>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            A showcase of innovative solutions and digital craftsmanship
          </p>
        </div>

        <div className="work__filters">
          <div className="work__filters-inner">
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

            <div className="work__filter-indicator" style={indicatorStyle} />
          </div>
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
