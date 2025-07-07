import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => setToggleState(index);

  return (
    <section className="qualification section" id="career">
      <h2 className="section__title">Career Summary</h2>
      <span className="section__subtitle">My Journey So Far</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={`qualification__button button--flex ${toggleState === 1 ? "qualification__active" : ""}`}
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon" />
            Education
          </div>
          <div
            className={`qualification__button button--flex ${toggleState === 2 ? "qualification__active" : ""}`}
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon" />
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          {/* Education Tab */}
          <div className={`qualification__content ${toggleState === 1 ? "qualification__content-active" : ""}`}>
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">PAF - KIET</h3>
                <span className="qualification__subtitle">BE Software Engineering (GPA 3.45)</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> 2020 – 2024
                </div>
              </div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
              <div>
                <h3 className="qualification__title">Govt. National College</h3>
                <span className="qualification__subtitle">Intermediate</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> 2018 – 2020
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Seerat-E-Complex</h3>
                <span className="qualification__subtitle">Matriculation</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> 2008 – 2018
                </div>
              </div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
            </div>
          </div>

          {/* Experience Tab */}
          <div className={`qualification__content ${toggleState === 2 ? "qualification__content-active" : ""}`}>
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Kode Kinetics (USA)</h3>
                <span className="qualification__subtitle">FullStack Developer</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> Dec 2024 – Present
                </div>
              </div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
              <div>
                <h3 className="qualification__title">Rajby Textiles Pvt. Ltd</h3>
                <span className="qualification__subtitle">Software Engineer – ERP Department</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> Nov 2024 – Present
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">TPL Trakker Ltd.</h3>
                <span className="qualification__subtitle">Assistant Manager – R&D</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> Aug 2024 – Nov 2024
                </div>
              </div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div><span className="qualification__rounder" /><span className="qualification__line" /></div>
              <div>
                <h3 className="qualification__title">TPL Trakker Ltd.</h3>
                <span className="qualification__subtitle">Trainee Engineer – R&D</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> May 2023 – Aug 2024
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Pakistan Aeronautical Complex</h3>
                <span className="qualification__subtitle">Intern – Software & Aerospace</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt" /> Jan 2023 – Feb 2023
                </div>
              </div>
              <div><span className="qualification__rounder" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
