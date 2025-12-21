import React from "react";

const Frontend = () => {
  const skills = [
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "Bootstrap", level: "Advanced" },
    { name: "React", level: "Advanced" },
    { name: "Flutter", level: "Intermediate" },
  ];

  return (
    <div className="skills__card" style={{ '--delay': '0.1s' }}>
      <h3 className="skills__title">Frontend Development</h3>
      <div className="skills__grid">
        {skills.map((skill, index) => (
          <div className="skills__item" key={index}>
            <svg 
              className="skills__icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
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