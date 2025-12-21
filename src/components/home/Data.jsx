import React from "react";

const Data = () => {
  return (
    <div className="home__data">
      <div className="home__header">
        <span className="home__label">Available for work</span>
        <h1 className="home__title">
          Abdullah <span className="home__title-accent">Afzal</span>
        </h1>
        <h3 className="home__subtitle">
          <span className="home__subtitle-type">Software Engineer</span> 
          <span className="home__subtitle-separator">&</span> 
          <span className="home__subtitle-type">Creative Innovator</span>
        </h3>
      </div>

      <p className="home__description">
        Crafting high-performance digital solutions with a focus on 
        <strong> scalability</strong>, <strong>user experience</strong>, and 
        <strong> elegant engineering</strong>. Based in Pakistan, working worldwide.
      </p>
      
      <div className="home__actions">
        <a href="#contact" className="button button--large">
          Let's Connect
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="button__icon"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
        <a href="#work" className="button button--secondary button--large">
          View Projects
        </a>
      </div>
    </div>
  );
};

export default Data;