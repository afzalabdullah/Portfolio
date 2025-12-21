import React, { useState } from "react";
import "./about.css";
import Info from "./Info";
import GithubContribution from "./GithubContribution";
import CVModal from "./CVModal";
import AboutImage from "../../assets/profile.jpg";

const About = ({ isCVModalOpen, setIsCVModalOpen }) => {

  const cvUrl = "/Abdullah_Resume.pdf";

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Introduction</span>
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">
            A brief look into my background and philosophy
          </p>
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
              human-centered perspective.
            </p>

            <Info />
            <GithubContribution />

            <div className="about__actions">
              {/* Download CV */}
              <a
                href={cvUrl}
                download="Abdullah_Resume.pdf"
                className="button"
              >
                <span>Download CV</span>
              </a>

              {/* View Live */}
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setIsCVModalOpen(true)}
              >
                <span>View Live</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl={cvUrl}
      />
    </section>
  );
};

export default About;
