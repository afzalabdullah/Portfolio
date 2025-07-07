/* Work.jsx */
import React, { useState } from 'react';
import './work.css';
import { Data } from './data';

const categories = ['All', 'Website','Flutter'];

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState('Website');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProjects = selectedCategory === 'All'
    ? Data
    : Data.filter(project => project.category === selectedCategory);

  return (
    <section className="work-alt container section" id="work">
      <div className="work-alt-header">
        <h2 className="section__title">Recent Work</h2>
        <span className="section__subtitle">Showcase of My Projects</span>
      </div>

      <div className="work-alt-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="work-alt-grid">
        {filteredProjects.map(({ id, image, title, description, link }) => (
          <div key={id} className={`card ${link ? 'has-link' : ''}`}>
            <div className="card-image">
              <img src={image} alt={title} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{title}</h3>
              <p className="card-desc">{description}</p>
            </div>
            {link && (
              <a href={link} className="card-link" target="_blank" rel="noreferrer">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;