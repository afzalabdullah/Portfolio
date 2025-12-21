import React, { useEffect, useState } from "react";
import "./scrollup.css";

const Scrollup = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 560) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a 
      href="#home" 
      className={`scrollup ${showScroll ? "show-scroll" : ""}`}
      aria-label="Scroll to top"
    >
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
    </a>
  );
};

export default Scrollup;
