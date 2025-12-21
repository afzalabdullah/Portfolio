import React from "react";
import Frontend from "./Frontend";
import Backend from "./Backend";
import "./skills.css";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Expertise</span>
          <h2 className="section__title">My Skills</h2>
          <p className="section__subtitle">Technical stack I use to bring ideas to life</p>
        </div>

        <div className="skills__container">
          <Frontend />
          <Backend />
        </div>
      </div>
    </section>
  );
};

export default Skills;