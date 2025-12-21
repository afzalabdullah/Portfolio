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
    
    // For very short durations, return "1 Mo" minimum if it's the same month
    if (years === 0 && months === 0) return "1 Mo";

    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'Yr' : 'Yrs'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'Mo' : 'Mos'}`);
    
    return parts.join(' ');
  };

  return (
    <section className="qualification section" id="career">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section__label">Resume</span>
          <h2 className="section__title">Career Summary</h2>
          <p className="section__subtitle">Mapping out my professional growth and learning</p>
        </div>

        <div className="qualification__container">
          <div className="qualification__tabs">
            <button
              className={`qualification__button ${toggleState === 1 ? "qualification__active" : ""}`}
              onClick={() => toggleTab(1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              Education
            </button>
            <button
              className={`qualification__button ${toggleState === 2 ? "qualification__active" : ""}`}
              onClick={() => toggleTab(2)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              Experience
            </button>
          </div>

          <div className="qualification__sections">
            {/* Education Tab */}
            <div className={`qualification__content ${toggleState === 1 ? "qualification__content-active" : ""}`}>
              <div className="qualification__data">
                <div className="qualification__item-content">
                  <h3 className="qualification__title">PAF - KIET</h3>
                  <span className="qualification__subtitle">BE Software Engineering (GPA 3.45)</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    2020 – 2024 
                    <span className="qualification__duration">{calculateDuration("2020-01-01", "2024-01-01")}</span>
                  </div>
                </div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div></div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div className="qualification__item-content">
                  <h3 className="qualification__title">Govt. National College</h3>
                  <span className="qualification__subtitle">Intermediate</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    2018 – 2020
                    <span className="qualification__duration">{calculateDuration("2018-01-01", "2020-01-01")}</span>
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div className="qualification__item-content">
                  <h3 className="qualification__title">Seerat-E-Complex</h3>
                  <span className="qualification__subtitle">Matriculation</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    2008 – 2018
                    <span className="qualification__duration">{calculateDuration("2008-01-01", "2018-01-01")}</span>
                  </div>
                </div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                </div>
                <div></div>
              </div>
            </div>

            {/* Experience Tab */}
            <div className={`qualification__content ${toggleState === 2 ? "qualification__content-active" : ""}`}>
              <div className="qualification__data">
                <div className="qualification__item-content">
                  <h3 className="qualification__title">Kode Kinetics (USA)</h3>
                  <span className="qualification__subtitle">FullStack Developer</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Dec 2024 – Present
                    <span className="qualification__duration">{calculateDuration("2024-12-01")}</span>
                  </div>
                </div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div></div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div className="qualification__item-content">
                  <h3 className="qualification__title">Rajby Textiles Pvt. Ltd</h3>
                  <span className="qualification__subtitle">Software Engineer – ERP</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Nov 2024 – Present
                    <span className="qualification__duration">{calculateDuration("2024-11-01")}</span>
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div className="qualification__item-content">
                  <h3 className="qualification__title">TPL Trakker Ltd.</h3>
                  <span className="qualification__subtitle">Assistant Manager – R&D</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Aug 2024 – Nov 2024
                    <span className="qualification__duration">{calculateDuration("2024-08-01", "2024-11-01")}</span>
                  </div>
                </div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div></div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                  <span className="qualification__line" />
                </div>
                <div className="qualification__item-content">
                  <h3 className="qualification__title">TPL Trakker Ltd.</h3>
                  <span className="qualification__subtitle">Trainee Engineer – R&D</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    May 2023 – Aug 2024
                    <span className="qualification__duration">{calculateDuration("2023-05-01", "2024-08-01")}</span>
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div className="qualification__item-content">
                  <h3 className="qualification__title">Pakistan Aeronautical Complex</h3>
                  <span className="qualification__subtitle">Intern – Software & Aerospace</span>
                  <div className="qualification__calendar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Jan 2023 – Feb 2023
                    <span className="qualification__duration">{calculateDuration("2023-01-01", "2023-02-01")}</span>
                  </div>
                </div>
                <div className="qualification__marker">
                  <span className="qualification__rounder" />
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
