import React from "react";

const Backend = () => {
  const skills = [
    { name: "Node.js", level: "Intermediate" },
    { name: "Dart", level: "Intermediate" },
    { name: "PHP", level: "Intermediate" },
    { name: "SQL", level: "Advanced" },
    { name: "ASP.Net Core", level: "Advanced" },
    { name: "Laravel", level: "Intermediate" },
  ];

  return (
    <div className="skills__card" style={{ '--delay': '0.2s' }}>
      <h3 className="skills__title">Backend Development</h3>
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

export default Backend;