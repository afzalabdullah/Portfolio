import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Abdullah</h1>
        <ul className="footer__list">
          <li>
            <a href="#home" className="footer__link">
              Home
            </a>
          </li>
          <li>
            <a href="#work" className="footer__link">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://github.com/afzalabdullah/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
         
          <a
            href="https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/"
            className="footer__social-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
        <span className="footer__copy">
          Copyright © 2024. All rights reserved. Developed by Abdullah
        </span>
      </div>
    </footer>
  );
};

export default Footer;
