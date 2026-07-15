import "./about.css";
import Info from "./Info";
import GithubContribution from "./GithubContribution";
import CVModal from "./CVModal";

const About = ({ about, isCVModalOpen, setIsCVModalOpen }) => {
  const cvUrl = about?.resumeUrl || "/Abdullah_Resume.pdf";

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__layout">
          {/* Left Column: Visuals & Intro */}
          <div className="about__sidebar">
            <div className="about__visual">
              <div className="about__img-container">
                <img src={about?.profileImg || "/profile.png"} alt="Profile" className="about__img" />
                <div className="about__img-glow"></div>
              </div>

            </div>

            <div className="about__info-grid">
              <Info />
            </div>

            <div className="about__actions">
              <a
                href={cvUrl}
                download="Abdullah_Resume.pdf"
                className="button button--large"
              >
                Download Resume
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="button__icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>

              <button
                type="button"
                className="button button--secondary button--large"
                onClick={() => setIsCVModalOpen(true)}
              >
                Interactive CV
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Dashboard */}
          <div className="about__main">
            <header className="about__header">
              <span className="about__tag">{about?.tag || "The Architect"}</span>
              <h2 className="about__title">
                {about?.titleName || "Abdullah"}{" "}
                <span className="highlight">{about?.titleHighlight || "Afzal"}</span>
              </h2>
              <div className="about__terminal">
                <div className="terminal__header">
                  <div className="terminal__dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="terminal__title">bash — bio</div>
                </div>
                <div className="terminal__body">
                  <p className="terminal__line"><span className="prompt">$</span> whoami</p>
                  <p className="terminal__text">
                    {about?.whoami || "I am a Senior Software Engineer..."}
                  </p>
                  <p className="terminal__line"><span className="prompt">$</span> cat philosophy.txt</p>
                  <p className="terminal__text">
                    "{about?.philosophy || "Design systems that scale..."}"
                  </p>
                </div>
              </div>
            </header>

            <div className="about__github-wrapper">
              <GithubContribution />
            </div>

          </div>
        </div>
      </div>

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl={cvUrl}
      />
    </section>
  );
};

export default About;
