import React, { useEffect, useState } from "react";
import "./scrollup.css";

const Scrollup = ({ hidden }) => {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 560px
      if (window.scrollY >= 560) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a 
      href="#home" 
      className={`scrollup ${showScroll ? "show-scroll" : ""} ${hidden ? "scrollup--hidden" : ""}`}
      aria-label="Scroll to top"
    >
      <svg className="scrollup__svg" width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-2)" />
          </linearGradient>
        </defs>
        <circle 
          className="scrollup__track" 
          cx="50" cy="50" r="45" 
        />
        <circle 
          className="scrollup__progress" 
          cx="50" cy="50" r="45"
          style={{
            strokeDashoffset: 283 - (scrollProgress * 283) / 100,
            stroke: "url(#scrollProgressGradient)"
          }}
        />
      </svg>
      
      <div className="scrollup__icon-wrapper">
        <svg 
          className="scrollup__icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </a>
  );
};

export default Scrollup;
