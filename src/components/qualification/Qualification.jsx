import { React, useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <section className="qualification section" id="portfolio">
      <h2 className="section__title">Career Summary</h2>
      <span className="section__subtitle">Journey</span>
      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>{" "}
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>{" "}
            Experience
          </div>
        </div>
        <div className="qualification__sections">
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">PAF - KIET</h3>
                <span className="qualification__subtitle">
                  Software Engineering
                </span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt"> 2020 - 2024</i>
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">Govt.National College</h3>
                <span className="qualification__subtitle">Intermediate</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">2018 - 2020</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Seerat-E-Complex</h3>
                <span className="qualification__subtitle">Matric</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">2008 - 2018</i>
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">TPL Trakker</h3>
                <span className="qualification__subtitle">Trainee Engineer</span>
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">1 Year</i>
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">Pakistan Aeronautical Complex</h3>
                {/* <span className="qualification__subtitle">Basics</span> */}
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">1 Month</i>
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Reasearch and Development </h3>
                {/* <span className="qualification__subtitle">Intermediate</span> */}
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">More than 3 Months</i>
                </div>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
              </div>
              <div>
                <h3 className="qualification__title">SKIMS</h3>
                {/* <span className="qualification__subtitle">Intermediate</span> */}
                <div className="qualification__calender">
                  <i className="uil uil-calendar-alt">Less than 6-Months</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
