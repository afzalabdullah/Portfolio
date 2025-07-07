import React from "react";

const Backend = () => {
  return (
    <div className="skills__card">
      <h3 className="skills__title">Backend Technologies</h3>
      <div className="skills__grid">
        {[
          { name: "Node.js", level: "Intermediate" },
          { name: "Dart", level: "Intermediate" },
          { name: "PHP", level: "Intermediate" },
          { name: "SQL", level: "Advanced" },
          { name: "ASP.Net Core", level: "Advanced" },
          { name: "Laravel", level: "Intermediate" },
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

export default Backend;