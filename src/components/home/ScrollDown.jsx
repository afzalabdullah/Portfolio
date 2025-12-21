import React from "react";

const ScrollDown = () => {
  return (
    <div className="home__scroll">
      <a href="#about" className="home__scroll-link">
        <div className="home__scroll-mouse">
          <div className="home__scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path>
        </svg>
      </a>
    </div>
  );
};

export default ScrollDown;