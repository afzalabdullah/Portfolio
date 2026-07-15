import React, { useState } from "react";
import "./qualification.css";

const Qualification = ({ qualificationData }) => {
  const [activeTab, setActiveTab] = useState("experience");

  const calculateDuration = (start, end = null) => {
    if (!start) return "";
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0) return "1 Mo";

    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? "Yr" : "Yrs"}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? "Mo" : "Mos"}`);

    return parts.join(" ");
  };

  const education = qualificationData?.education || [];
  const experience = qualificationData?.experience || [];

  const tabs = [
    {
      id: "experience",
      label: "Experience",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      id: "education",
      label: "Education",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
    },
  ];

  const activeData = activeTab === "experience" ? experience : education;

  return (
    <section className="qual section" id="career">
      <div className="container">
        {/* Section Header */}
        <div className="qual__header">
          <span className="qual__label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Resume
          </span>
          <h2 className="qual__title">
            Career <span className="qual__title-accent">&</span> Education
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="qual__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`qual__tab ${activeTab === tab.id ? "qual__tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="qual__timeline">
          <div className="qual__timeline-line"></div>

          {activeData.map((item, idx) => (
            <div
              className={`qual__card ${idx % 2 === 0 ? "qual__card--left" : "qual__card--right"}`}
              key={`${activeTab}-${idx}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Timeline Node */}
              <div className="qual__node">
                <div className={`qual__node-dot ${item.current ? "qual__node-dot--active" : ""}`}></div>
              </div>

              {/* Card Content */}
              <div className="qual__card-body">
                <div className="qual__card-top">
                  <h3 className="qual__card-title">{item.title}</h3>
                  {item.current && <span className="qual__card-badge">Current</span>}
                </div>
                <span className="qual__card-role">{item.subtitle}</span>
                <p className="qual__card-detail">{item.detail}</p>
                <div className="qual__card-footer">
                  <span className="qual__card-date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {item.date}
                  </span>
                  <span className="qual__card-duration">{calculateDuration(item.start, item.end)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Qualification;
