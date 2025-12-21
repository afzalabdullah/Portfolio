import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Let's Talk Section */}
        <div className="footer__cta">
          <div className="footer__cta-content">
            <span className="footer__cta-label">Got a project in mind?</span>
            <h2 className="footer__cta-title">Let's create something<br />extraordinary together.</h2>
          </div>
          <a href="#contact" className="footer__cta-btn">
            Get In Touch
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <div className="footer__content grid">
          {/* Brand Column */}
          <div className="footer__col brand">
            <a href="#home" className="footer__logo">
              Abdullah<span>.</span>
            </a>
            <p className="footer__description">
              Building digital experiences that combine innovative design with robust engineering. Based in Pakistan, working globally.
            </p>
            <div className="footer__social">
              <a href="https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/" className="footer__social-link" target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://github.com/afzalabdullah/" className="footer__social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">Explore</h3>
            <ul className="footer__links">
              <li><a href="#home" className="footer__link">Home</a></li>
              <li><a href="#about" className="footer__link">About Me</a></li>
              <li><a href="#work" className="footer__link">Portfolio</a></li>
              <li><a href="#contact" className="footer__link">Contact</a></li>
            </ul>
          </div>

          {/* Services/Career Column */}
          <div className="footer__col">
            <h3 className="footer__col-title">Career</h3>
            <ul className="footer__links">
              <li><a href="#skills" className="footer__link">Skills</a></li>
              <li><a href="#career" className="footer__link">Experience</a></li>
              <li><a href="#career" className="footer__link">Education</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Abdullah Afzal. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <span className="footer__bottom-tag">Privacy Policy</span>
            <span className="footer__bottom-tag">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
