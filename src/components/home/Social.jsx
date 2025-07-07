import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="home__social">
      <a
        href="https://www.linkedin.com/in/engr-abdullah-afzal-96b962208/"
        className="home__social-icon"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn Profile"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/afzalabdullah/"
        className="home__social-icon"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub Profile"
      >
        <FaGithub />
      </a>
      
    </div>
  );
};

export default Social;