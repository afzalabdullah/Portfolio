import React from "react";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiBootstrap, SiFlutter,
  SiNodedotjs, SiDart, SiPhp, SiMysql, SiDotnet, SiLaravel,
  SiGit, SiPostman, SiFigma, SiFirebase, SiDocker, SiTailwindcss,
  SiMongodb, SiPostgresql, SiExpress, SiNextdotjs
} from "react-icons/si";

import "./skills.css";

const Skills = () => {
  const categories = [
    {
      title: "Frontend Development",
      description: "Building responsive, interactive, and high-performance user interfaces.",
      skills: [
        { name: "React / Next.js", icon: <SiNextdotjs />, level: "Advanced", color: "#000000" },
        { name: "JavaScript", icon: <SiJavascript />, level: "Advanced", color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiReact />, level: "Proficient", color: "#3178C6" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: "Advanced", color: "#06B6D4" },
        { name: "HTML5/CSS3", icon: <SiHtml5 />, level: "Expert", color: "#E34F26" },
      ]
    },
    {
      title: "Backend & Systems",
      description: "Architecting scalable server-side logic and robust database schemas.",
      skills: [
        { name: "ASP.Net Core", icon: <SiDotnet />, level: "Expert", color: "#512BD4" },
        { name: "Node.js / Express", icon: <SiNodedotjs />, level: "Advanced", color: "#339933" },
        { name: "Laravel (PHP)", icon: <SiLaravel />, level: "Advanced", color: "#FF2D20" },
        { name: "MySQL / PostgreSQL", icon: <SiMysql />, level: "Expert", color: "#4479A1" },
        { name: "MongoDB", icon: <SiMongodb />, level: "Proficient", color: "#47A248" },
      ]
    },
    {
      title: "Mobile & Hybrid",
      description: "Creating seamless cross-platform mobile experiences.",
      skills: [
        { name: "Flutter", icon: <SiFlutter />, level: "Expert", color: "#02569B" },
        { name: "Dart", icon: <SiDart />, level: "Expert", color: "#00CCFF" },
        { name: "Firebase", icon: <SiFirebase />, level: "Advanced", color: "#FFCA28" },
      ]
    },
    {
      title: "DevOps & Tooling",
      description: "Streamlining development workflows and infrastructure.",
      skills: [
        { name: "Docker", icon: <SiDocker />, level: "Proficient", color: "#2496ED" },
        { name: "Git / GitHub", icon: <SiGit />, level: "Expert", color: "#F05032" },
        { name: "Postman / API", icon: <SiPostman />, level: "Advanced", color: "#FF6C37" },
        { name: "Figma (UI/UX)", icon: <SiFigma />, level: "Proficient", color: "#F24E1E" },
      ]
    }
  ];

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <header className="section__header">
          <span className="section__label">Capabilities</span>
          <h2 className="section__title">My <span className="highlight">Tech Stack</span></h2>
          <p className="section__subtitle">
            A comprehensive suite of tools engineered for modern enterprise solutions.
          </p>
        </header>

        <div className="skills__grid">
          {categories.map((category, idx) => (
            <div className="skills__category-card" key={idx}>
              <div className="category-card__header">
                <h3 className="category-card__title">{category.title}</h3>
                <p className="category-card__desc">{category.description}</p>
              </div>
              <div className="category-card__list">
                {category.skills.map((skill, sIdx) => (
                  <div className="skill-item" key={sIdx}>
                    <div className="skill-item__icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <div className="skill-item__info">
                      <span className="skill-item__name">{skill.name}</span>
                      <div className="skill-item__progress-bar">
                        <div className={`progress-fill ${skill.level.toLowerCase()}`} />
                      </div>
                    </div>
                    <span className="skill-item__level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
