import React from "react";
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
  return (
    <section className="work container section" id="work">
      <h2 className="section__title">Recent Work</h2>
      <span className="section__subtitle">Flutter Projects</span>
      <Swiper
        className="work__container"
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
        {Data.map(({ id, image, title, description }) => {
          return (
            <SwiperSlide className="work__card" key={id}>
              <img src={image} alt="" className="work__img" />
              <h3 className="work__name">{title}</h3>
              <p className="work__descripiton">{description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Work;
