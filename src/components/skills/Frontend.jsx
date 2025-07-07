import React from "react";

const Frontend = () => {
  return (
    <div className="skills__card">
      <h3 className="skills__title">Frontend Technologies</h3>
      <div className="skills__grid">
        {[
          { name: "HTML", level: "Advanced" },
          { name: "CSS", level: "Advanced" },
          { name: "JavaScript", level: "Advanced" },
          { name: "Bootstrap", level: "Advanced" },
          { name: "React", level: "Advanced" },
          { name: "Flutter", level: "Intermediate" },
        ].map((skill, index) => (
          <div className="skills__item" key={index}>
            <i className="bx bx-check-circle skills__icon"></i>
            <div>
              <h4 className="skills__name">{skill.name}</h4>
              <span className="skills__level">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontend;