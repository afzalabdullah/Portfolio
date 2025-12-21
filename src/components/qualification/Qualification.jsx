import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => setToggleState(index);

  const calculateDuration = (start, end = null) => {
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
    if (years > 0) parts.push(`${years} ${years === 1 ? 'Yr' : 'Yrs'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'Mo' : 'Mos'}`);
    
    return parts.join(' ');
  };

  const education = [
    {
      title: "PAF - KIET",
      subtitle: "BE Software Engineering (GPA 3.45)",
      date: "2020 – 2024",
      start: "2020-01-01",
      end: "2024-01-01"
    },
    {
      title: "Govt. National College",
      subtitle: "Intermediate",
      date: "2018 – 2020",
      start: "2018-01-01",
      end: "2020-01-01"
    },
    {
      title: "Seerat-E-Complex",
      subtitle: "Matriculation",
      date: "2008 – 2018",
      start: "2008-01-01",
      end: "2018-01-01"
    }
  ];

  const experience = [
    {
      title: "Kode Kinetics (USA)",
      subtitle: "FullStack Developer",
      date: "Dec 2024 – Present",
      start: "2024-12-01",
      end: null
    },
    {
      title: "Rajby Textiles Pvt. Ltd",
      subtitle: "Software Engineer – ERP",
      date: "Nov 2024 – Present",
      start: "2024-11-01",
      end: null
    },
    {
      title: "TPL Trakker Ltd.",
      subtitle: "Assistant Manager – R&D",
      date: "Aug 2024 – Nov 2024",
      start: "2024-08-01",
      end: "2024-11-01"
    },
    {
      title: "TPL Trakker Ltd.",
      subtitle: "Trainee Engineer – R&D",
      date: "May 2023 – Aug 2024",
      start: "2023-05-01",
      end: "2024-08-01"
    }
  ];

  return (
    <section className="qualification section" id="career">
      <div className="container">
        <div className="text-center mb-16">
          <span className="section__label">Resume</span>
          <h2 className="section__title">Professional Journey</h2>
          <p className="section__subtitle">A chronicle of my academic foundation and professional growth</p>
        </div>

        <div className="qualification__container">
          <div className="qualification__tabs">
            <button
              className={`qualification__tab-btn ${toggleState === 1 ? "active" : ""}`}
              onClick={() => toggleTab(1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              Academic
            </button>
            <button
              className={`qualification__tab-btn ${toggleState === 2 ? "active" : ""}`}
              onClick={() => toggleTab(2)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              Professional
            </button>
            <div className={`qualification__tab-indicator tab-${toggleState}`}></div>
          </div>

          <div className="qualification__sections">
            {/* Education Tab */}
            <div className={`qualification__content ${toggleState === 1 ? "active" : ""}`}>
              {education.map((item, idx) => (
                <div className="qualification__data" key={idx}>
                  <div className={idx % 2 === 0 ? "qualification__card left" : "qualification__spacer"}>
                    {idx % 2 === 0 && (
                      <div className="qualification__item">
                        <h3 className="qualification__item-title">{item.title}</h3>
                        <span className="qualification__item-subtitle">{item.subtitle}</span>
                        <div className="qualification__item-date">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {item.date} 
                          <span className="qualification__item-duration">{calculateDuration(item.start, item.end)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="qualification__timeline">
                    <span className="qualification__dot" />
                    {idx !== education.length - 1 && <span className="qualification__line" />}
                  </div>

                  <div className={idx % 2 !== 0 ? "qualification__card right" : "qualification__spacer"}>
                    {idx % 2 !== 0 && (
                      <div className="qualification__item">
                        <h3 className="qualification__item-title">{item.title}</h3>
                        <span className="qualification__item-subtitle">{item.subtitle}</span>
                        <div className="qualification__item-date">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {item.date} 
                          <span className="qualification__item-duration">{calculateDuration(item.start, item.end)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Tab */}
            <div className={`qualification__content ${toggleState === 2 ? "active" : ""}`}>
              {experience.map((item, idx) => (
                <div className="qualification__data" key={idx}>
                  <div className={idx % 2 === 0 ? "qualification__card left" : "qualification__spacer"}>
                    {idx % 2 === 0 && (
                      <div className="qualification__item">
                        <h3 className="qualification__item-title">{item.title}</h3>
                        <span className="qualification__item-subtitle">{item.subtitle}</span>
                        <div className="qualification__item-date">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {item.date} 
                          <span className="qualification__item-duration">{calculateDuration(item.start, item.end)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="qualification__timeline">
                    <span className="qualification__dot" />
                    {idx !== experience.length - 1 && <span className="qualification__line" />}
                  </div>

                  <div className={idx % 2 !== 0 ? "qualification__card right" : "qualification__spacer"}>
                    {idx % 2 !== 0 && (
                      <div className="qualification__item">
                        <h3 className="qualification__item-title">{item.title}</h3>
                        <span className="qualification__item-subtitle">{item.subtitle}</span>
                        <div className="qualification__item-date">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {item.date} 
                          <span className="qualification__item-duration">{calculateDuration(item.start, item.end)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
