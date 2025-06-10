import React, { memo } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Hero.css";

// This data structure is kept exactly as you had it.
const slides = [
  {
    id: 1,
    bgClass: "bg-image1",
    titleNumber: "Buy.",
    title: "Rent.",
    word: "Sell. Agent.",
  },
  // You can add more slides here if you need them
];

const Hero = memo(() => {
  return (
    <div className="intro intro-carousel position-relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        autoplay={false} // Autoplay is off for better initial load performance
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* This is your original HTML structure, unchanged. */}
            <div className={` intro-item ${slide.bgClass}`}>
              <div className="overlay overlay-a"></div>
              <div className="intro-content display-table">
                <div className="table-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="intro-body">
                          <div className="justify-content-start align-items-start">
                            <div>
                              <h1 className="intro-title">
                                <span className="color-b">
                                  {slide.titleNumber}{" "}
                                </span>
                                {slide.title}
                              </h1>
                              <h1 className="intro-title">{slide.word}</h1>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;