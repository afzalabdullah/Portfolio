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

    // Move theme toggle to middle of animation (when screen is covered)
    setTimeout(() => {
      toggleTheme();
    }, 500);

    // Reset wipe after animation completes
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
          <a href="#home" className="nav__logo">
            Abdullah<span>.</span>
          </a>

          <div className="nav__controls">
            {/* Theme Toggle Button */}
            <button
              className="theme-toggle"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="moon-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg
                  className="sun-icon"
                  width="20"
                  height="20"
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
              )}
            </button>

            <button
              className={`nav__trigger ${isMenuOpen ? "nav__trigger--active" : ""}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`nav__overlay ${isMenuOpen ? "nav__overlay--open" : ""}`}>
        <div className="nav__overlay-content container">
          <ul className="nav__overlay-list">
            {navItems.map((item) => (
              <li key={item.href} className="nav__overlay-item">
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
                LinkedIn
              </a>
              <a
                href="https://github.com/afzalabdullah"
                target="_blank"
                rel="noreferrer"
                className="nav__overlay-social"
              >
                GitHub
              </a>
            </div>
            <p className="nav__overlay-copy">
              © {new Date().getFullYear()} Abdullah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;