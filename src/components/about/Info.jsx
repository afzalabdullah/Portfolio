import React from "react";

const Info = () => {
const qualities = [
  {
    icon: "bx bx-brain",
    title: "Analytical",
    subtitle: "Thinks critically",
  },
  {
    icon: "bx bx-group",
    title: "Collaborative",
    subtitle: "Builds with others",
  },
  {
    icon: "bx bx-cube",
    title: "Structured",
    subtitle: "Designs systems",
  },
];



  return (
    <div className="about__info grid">
      {qualities.map((quality, index) => (
        <div className="about__box" key={index}>
          <i className={`${quality.icon} about__icon`}></i>
          <h3 className="about__title">{quality.title}</h3>
          <span className="about__subtitle">{quality.subtitle}</span>
        </div>
      ))}
    </div>
  );
};

export default Info;
