import React from "react";
import ContributionImage from "../../assets/images/github-contribution/git-contribution.png";

const GithubContribution = () => {
  return (
    <div className="github__contribution card">
      <div className="github__header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="github__icon">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <h3 className="github__title">OSS Contribution Graph</h3>
      </div>
      <p className="github__description">
        Consistently pushing code and contributing to various open-source projects and professional repositories.
      </p>
      <div className="github__img-container">
        <img src={ContributionImage} alt="Github Contributions" className="github__img" />
      </div>
    </div>
  );
};

export default GithubContribution;
