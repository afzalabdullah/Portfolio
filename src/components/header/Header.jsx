import React, { useState, useEffect } from "react";
import "./header.css";

const Header = ({ isHidden, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isWipeActive, setIsWipeActive] = useState(false);
  const [wipeTheme, setWipeTheme] = useState("light");
  const [wipeDirection, setWipeDirection] = useState("down");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = React.useMemo(
    () => [
      { id: "01", label: "Home", href: "#home" },
      { id: "02", label: "About", href: "#about" },
      { id: "03", label: "Skills", href: "#skills" },
      { id: "04", label: "Career", href: "#career" },
      { id: "05", label: "Work", href: "#work" },
      { id: "06", label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [navItems]);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setWipeTheme(nextTheme);
    setWipeDirection(nextTheme === "dark" ? "down" : "up");
    setIsWipeActive(true);

    setTimeout(() => {
      toggleTheme();
    }, 500);

    setTimeout(() => {
      setIsWipeActive(false);
    }, 1000);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Curtain Wipe Animation */}
      <div
        className={`theme-wipe ${isWipeActive ? `active-${wipeDirection}` : ""} theme-wipe--${wipeTheme}`}
      ></div>

      <header
        className={`header ${isScrolled ? "header--scrolled" : ""} ${isHidden ? "header--hidden" : ""}`}
      >
        <nav className="nav container">
          {/* Logo */}
          <a href="#home" className="nav__logo">
            <span className="nav__logo-text">Abdullah</span>
            <span className="nav__logo-dot">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav__desktop">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={`nav__link ${activeSection === item.href ? "nav__link--active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="nav__controls">
            {/* Theme Toggle */}
            <button
              className="nav__theme-btn"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              <div className="nav__theme-icons">
                <svg
                  className={`nav__theme-icon ${theme === "light" ? "nav__theme-icon--visible" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg
                  className={`nav__theme-icon ${theme === "dark" ? "nav__theme-icon--visible" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
            </button>

            {/* Hamburger */}
            <button
              className={`nav__burger ${isMenuOpen ? "nav__burger--active" : ""}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div className={`nav__overlay ${isMenuOpen ? "nav__overlay--open" : ""}`}>
        <div className="nav__overlay-bg"></div>
        <div className="nav__overlay-content container">
          <ul className="nav__overlay-list">
            {navItems.map((item, idx) => (
              <li
                key={item.href}
                className="nav__overlay-item"
                style={{ transitionDelay: `${0.3 + idx * 0.08}s` }}
              >
                <span className="nav__overlay-number">{item.id}</span>
                <a
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href);
                    setMenuOpen(false);
                  }}
                  className={`nav__overlay-link ${activeSection === item.href ? "nav__overlay-link--active" : ""}`}
                >
                  {item.label}
                </a>
                <div className="nav__overlay-line"></div>
              </li>
            ))}
          </ul>

          <div className="nav__overlay-footer">
            <div className="nav__overlay-socials">
              <a
                href="https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/"
                target="_blank"
                rel="noreferrer"
                className="nav__overlay-social"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/afzalabdullah"
                target="_blank"
                rel="noreferrer"
                className="nav__overlay-social"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub
              </a>
            </div>
            <p className="nav__overlay-copy">
              © {new Date().getFullYear()} Abdullah Afzal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;