import React, { useState } from "react";
import * as SiIcons from "react-icons/si";

import "./skills.css";

const Skills = ({ skillsData }) => {
  const categories = skillsData || [];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex] || null;

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <header className="section__header">
          <span className="section__label">Capabilities</span>
          <h2 className="section__title">My <span className="highlight">Tech Stack</span></h2>
          <p className="section__subtitle">
            A comprehensive suite of tools engineered for modern enterprise solutions.
          </p>
        </header>

        {/* Tab Switcher */}
        <div className="skills__tabs">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`skills__tab ${activeCategoryIndex === idx ? "skills__tab--active" : ""}`}
              onClick={() => setActiveCategoryIndex(idx)}
            >
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Category Content */}
        {activeCategory && (
          <div className="skills__content">
            <p className="skills__category-desc">{activeCategory.description}</p>
            <div className="skills__list-grid">
              {activeCategory.skills && activeCategory.skills.map((skill, sIdx) => {
                const IconComponent = SiIcons[skill.icon];
                return (
                  <div 
                    className="skill-card-alt" 
                    key={sIdx}
                    style={{ "--skill-color": skill.color }}
                  >
                    <div className="skill-card-alt__icon-wrapper">
                      <div className="skill-card-alt__icon" style={{ color: skill.color }}>
                        {IconComponent ? <IconComponent /> : null}
                      </div>
                    </div>
                    <div className="skill-card-alt__info">
                      <h4 className="skill-card-alt__name">{skill.name}</h4>
                      <span className="skill-card-alt__level">{skill.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
