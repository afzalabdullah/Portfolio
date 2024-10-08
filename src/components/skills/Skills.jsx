import React from "react";
import Frontend from "./Frontend";
import Backend from "./Backend";
import Embedded from "./Embedded";
import "./skills.css";
const Skills = () => {
  return (
    <section className="section skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical Level</span>
      <div className="skills__container container grid">
        <Frontend />
        <Backend />
        <Embedded />
      </div>
    </section>
  );
};

export default Skills;
