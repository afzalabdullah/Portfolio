import React, { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      const homeSection = document.querySelector("#home");

      if (homeSection && window.scrollY >= homeSection.offsetHeight - 100) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#career", label: "Biography" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <div className={`nav__menu ${isMenuOpen ? "nav__menu--open" : ""}`}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.href} className="nav__item">
                <a
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href);
                    setMenuOpen(false);
                  }}
                  className={`nav__link ${
                    activeSection === item.href ? "nav__link--active" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="nav__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="uil uil-times"></i>
          </button>
        </div>

        <div className="nav__controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={theme === "light" ? "uil uil-moon" : "uil uil-sun"}></i>
          </button>
          <button
            className="nav__toggle"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className="uil uil-apps"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
