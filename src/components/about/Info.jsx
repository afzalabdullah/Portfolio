import React from "react";
import { 
  SiTarget, 
  SiCrystal, 
  SiStackoverflow 
} from "react-icons/si";

const Info = () => {
  const qualities = [
    {
      icon: <SiTarget />,
      title: "Analytical",
      subtitle: "Strategic Problem Solving",
      color: "#22c55e"
    },
    {
      icon: <SiCrystal />,
      title: "Collaborative",
      subtitle: "Seamless Team Synergy",
      color: "#3b82f6"
    },
    {
      icon: <SiStackoverflow/>,
      title: "Structured",
      subtitle: "Scalable Systems Design",
      color: "#ef4444"
    },
  ];

  return (
    <div className="about__info">
      {qualities.map((quality, index) => (
        <div className="about__box" key={index} style={{ '--accent-color': quality.color }}>
          <span className="about__box-icon">{quality.icon}</span>
          <h3 className="about__box-title">{quality.title}</h3>
          <span className="about__box-subtitle">{quality.subtitle}</span>
        </div>
      ))}
    </div>
  );
};

export default Info;
