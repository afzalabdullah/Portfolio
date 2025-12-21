// Work.jsx - Modern Minimal Design
import React, { useState, useEffect, useRef } from 'react';
import './work.css';
import { projects } from './data';

const categories = ['All', 'Flutter', 'Website', 'Web App', 'AI'];

const ProjectCard = ({ project, idx }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);
  const hasMultiple = project.images.length > 1;

  useEffect(() => {
    if (isHovered && hasMultiple) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % project.images.length);
      }, 2000); // Cycle every 2 seconds on hover
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isHovered, hasMultiple, project.images.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide(prev => (prev + 1) % project.images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide(prev => (prev - 1 + project.images.length) % project.images.length);
  };

  const goToSlide = (e, index) => {
    e.stopPropagation();
    setCurrentSlide(index);
  };

  return (
    <article 
      className={`project-card ${isHovered ? 'project-card--hovered' : ''}`} 
      style={{ '--delay': `${idx * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentSlide(0); // Reset to first image on leave
      }}
    >
      {/* Image Area */}
      <div className="project-image-wrapper">
        <div className="project-category-tag">{project.category}</div>
        
        {hasMultiple ? (
          <div className="image-carousel">
            <div className="carousel-slides">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className={`carousel-slide ${i === currentSlide ? 'active' : ''}`}
                >
                  <img src={img} alt={`${project.title} ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Navigation (Visible on hover or mobile) */}
            <button
              className="carousel-btn prev"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="carousel-btn next"
              onClick={nextSlide}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => goToSlide(e, i)}
                  className={`indicator ${i === currentSlide ? 'active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="slide-counter">
              {currentSlide + 1} / {project.images.length}
            </div>
          </div>
        ) : (
          <div className="single-image">
            <img src={project.images[0]} alt={project.title} />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* Tags */}
        {project.tags && (
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="project-actions">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="action-btn primary">
              <span>View Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          )}
          {project.appLinks?.playStore && (
            <a href={project.appLinks.playStore} target="_blank" rel="noreferrer" className="action-btn secondary">
              <span>Play Store</span>
            </a>
          )}
          {project.appLinks?.appStore && (
            <a href={project.appLinks.appStore} target="_blank" rel="noreferrer" className="action-btn secondary">
              <span>App Store</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.includes(selectedCategory.split(' ')[0]));

  return (
    <section className="work-section" id="work">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Portfolio</span>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">A curated collection of my recent work across web and mobile platforms.</p>
        </div>

        {/* Filters */}
        <div className="work-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
