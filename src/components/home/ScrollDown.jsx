import React from "react";

const ScrollDown = () => {
  return (
    <div className="home__scroll">
      <a href="#about" className="home__scroll-link">
        <div className="home__scroll-indicator">
          <div className="home__scroll-mouse">
            <div className="home__scroll-wheel"></div>
          </div>
          <div className="home__scroll-arrows">
            <svg 
              className="home__scroll-arrow" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>
        </div>
        <span className="home__scroll-text">Explore More</span>
      </a>
    </div>
  );
};

export default ScrollDown;