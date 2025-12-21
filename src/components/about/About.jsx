import React, { useState } from "react";
import "./about.css";
import Info from "./Info";
import GithubContribution from "./GithubContribution";
import CVModal from "./CVModal";
import AboutImage from "../../assets/profile.jpg";

const About = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const cvUrl = "/Abdullah_Resume.pdf";

  const openCVModal = (e) => {
    e.preventDefault();
    setIsCVModalOpen(true);
  };

  const closeCVModal = () => setIsCVModalOpen(false);

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Introduction</span>
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">A brief look into my background and philosophy</p>
        </div>

        <div className="about__container">
          <div className="about__img-wrapper">
            <img src={AboutImage} alt="Profile" className="about__img" />
            <div className="about__img-backdrop"></div>
          </div>

          <div className="about__data">
            <p className="about__description">
              I am a results-driven Software Engineer with a deep passion for 
              architecting scalable systems and crafting delightful user 
              experiences. My approach combines technical precision with a 
              human-centered perspective, ensuring every solution I build is both 
              powerful and intuitive.
            </p>

            <Info />

            <GithubContribution />

            <div className="about__actions">
              <a 
                download="Abdullah_Resume.pdf" 
                href={cvUrl} 
                className="button"
              >
                <span>Download CV</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
              <a 
                href={cvUrl} 
                onClick={openCVModal}
                className="button button--secondary"
              >
                <span>View Live</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={closeCVModal} 
        cvUrl={cvUrl} 
      />
    </section>
  );
};

export default About;
