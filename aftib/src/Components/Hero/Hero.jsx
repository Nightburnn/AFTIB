import React from "react";
import { Link } from "react-router-dom";
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

const slides = [
  {
    id: 1,
    bgClass: "bg-image1",
   
    titleNumber: "Buy.",
    title: "Rent. Sell. Agent.",
   
  },
 
];

const Hero = () => {
  return (
    <div className="intro intro-carousel position-relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        autoplay={false}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`carousel-item-a intro-item ${slide.bgClass}`}>
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
                            
                            </div>
                            <div>                     
                            </div>
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
};

export default Hero;