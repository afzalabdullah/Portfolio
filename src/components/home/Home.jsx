import React from "react";
import "./home.css";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home__container container">
        <Social />
        
        <Data />

        <div className="home__img-wrapper">
          <div className="home__img"></div>
          <div className="home__img-backdrop"></div>
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;