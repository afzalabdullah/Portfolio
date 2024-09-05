import React, { useState } from "react";
import "./work.css";
import { Data } from "./data";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const Work = () => {
  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter projects based on the selected category
  const filteredProjects = selectedCategory === 'All'
    ? Data
    : Data.filter(project => project.category === selectedCategory);

  return (
    <section className="work container section" id="work">
      <h2 className="section__title">Recent Work</h2>
      <span className="section__subtitle">Showcase of My Projects</span>
      
      <div className="work__filters">
         <button onClick={() => handleCategoryChange('Flutter')} className={`filter-btn ${selectedCategory === 'Flutter' ? 'active' : ''}`}>Flutter</button>
        <button onClick={() => handleCategoryChange('Website')} className={`filter-btn ${selectedCategory === 'Website' ? 'active' : ''}`}>Website</button>
        {/* Add more buttons for different categories if needed */}
      </div>
      
      <Swiper
        className={`work__container ${selectedCategory === 'Website' ? 'website-projects' : ''}`}
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        }}
        modules={[Pagination]}
      >
        {filteredProjects.map(({ id, image, title, description, link }) => {
          return (
            <SwiperSlide className={`work__card ${selectedCategory === 'Website' ? 'website-card' : ''}`} key={id}>
              <img src={image} alt={title} className={`work__img ${selectedCategory === 'Website' ? 'website-img' : ''}`} />
              <h3 className="work__name">{title}</h3>
              <p className="work__description">{description}</p>
              {link && (
                <a
                  href={link}
                  className="download__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project
                </a>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Work;
