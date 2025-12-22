import React, { useState, useEffect } from "react";
import "./header.css";

const Header = ({ isHidden, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isMenuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
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
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
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