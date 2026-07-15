import React from "react";
import * as SiIcons from "react-icons/si";

import "./skills.css";

const Skills = ({ skillsData }) => {
  const categories = skillsData || [];

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

        <div className="skills__grid">
          {categories.map((category, idx) => (
            <div className="skills__category-card" key={idx}>
              <div className="category-card__header">
                <h3 className="category-card__title">{category.title}</h3>
                <p className="category-card__desc">{category.description}</p>
              </div>
              <div className="category-card__list">
                {category.skills && category.skills.map((skill, sIdx) => {
                  const IconComponent = SiIcons[skill.icon];
                  return (
                    <div className="skill-item" key={sIdx}>
                      <div className="skill-item__icon" style={{ color: skill.color }}>
                        {IconComponent ? <IconComponent /> : null}
                      </div>
                      <div className="skill-item__info">
                        <span className="skill-item__name">{skill.name}</span>
                        <div className="skill-item__progress-bar">
                          <div className={`progress-fill ${skill.level.toLowerCase()}`} />
                        </div>
                      </div>
                      <span className="skill-item__level">{skill.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
