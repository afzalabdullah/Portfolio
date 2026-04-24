import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import Social from "./Social";
import ScrollDown from "./ScrollDown";

const Home = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedRole, setTypedRole] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Senior Software Engineer",
    "System Design Engineer",
    "Full Stack Architect",
    "Enterprise Solutions Lead",
  ];

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout;

    if (!isDeleting && typedRole === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedRole === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setTypedRole((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : currentRole.slice(0, prev.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, currentRoleIndex]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      className={`hero ${isVisible ? "hero--visible" : ""}`}
      id="home"
      ref={heroRef}
    >
      {/* Ambient Background Effects */}
      <div className="hero__ambient">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
        <div className="hero__grid-overlay"></div>
      </div>

      {/* Floating Particles */}
      <div className="hero__particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="hero__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Social Links - Vertical Sidebar */}
      <div className="hero__social-sidebar">
        <Social />
      </div>

      <div className="hero__container container">
        {/* Left Content */}
        <div className="hero__content">
          {/* Main Title */}
          <h1 className="hero__title" style={{ animationDelay: "0.3s" }}>
            <span className="hero__title-line hero__title-line--1">
              <span className="hero__title-hi">Hi, I'm</span>
            </span>
            <span className="hero__title-line hero__title-line--2">
              <span className="hero__title-name">Abdullah</span>
            </span>
            <span className="hero__title-line hero__title-line--3">
              <span className="hero__title-accent">Afzal</span>
              <span className="hero__title-dot">.</span>
            </span>
          </h1>

          {/* Typewriter Role */}
          <div className="hero__role" style={{ animationDelay: "0.5s" }}>
            <span className="hero__role-bracket">{"<"}</span>
            <span className="hero__role-text">{typedRole}</span>
            <span className="hero__role-cursor">|</span>
            <span className="hero__role-bracket">{"/>"})</span>
          </div>

          {/* Description */}
          <p className="hero__description" style={{ animationDelay: "0.7s" }}>
            Designing and engineering large-scale distributed systems with a focus on{" "}
            <strong>system architecture</strong>, <strong>scalability</strong>, and{" "}
            <strong>high-availability infrastructure</strong>. Based in Pakistan, engineering
            for global impact.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions" style={{ animationDelay: "0.9s" }}>
            <a href="#contact" className="hero__btn hero__btn--primary">
              <span className="hero__btn-text">Let's Connect</span>
              <span className="hero__btn-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </a>
            <a href="#work" className="hero__btn hero__btn--outline">
              <span className="hero__btn-text">View Projects</span>
            </a>
          </div>
        </div>

        {/* Right Side - Profile Visual */}
        <div className="hero__visual">
          {/* Orbiting rings */}
          <div className="hero__orbit hero__orbit--1"></div>
          <div className="hero__orbit hero__orbit--2"></div>
          <div className="hero__orbit hero__orbit--3"></div>

          {/* Profile Image */}
          <div className="hero__profile-frame">
            <div className="hero__profile-glow"></div>
            <div className="hero__profile-img"></div>
            <div className="hero__profile-border"></div>
          </div>

          {/* Floating stat cards */}
          <div className="hero__float-card hero__float-card--1">
            <span className="hero__float-card-number">3+</span>
            <span className="hero__float-card-label">Years Exp.</span>
          </div>
          <div className="hero__float-card hero__float-card--2">
            <span className="hero__float-card-number">20+</span>
            <span className="hero__float-card-label">Projects</span>
          </div>
          <div className="hero__float-card hero__float-card--3">
            <span className="hero__float-card-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span className="hero__float-card-label">Open to Work</span>
          </div>
        </div>
      </div>



      <ScrollDown />
    </section>
  );
};

export default Home;