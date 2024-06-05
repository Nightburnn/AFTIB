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
    titleTop: "VGC, Lagos",
    zip: "78345",
    titleNumber: "204",
    title: "Haris Drive, VGC, Lekki",
    price: "$ 12.000",
  },
  {
    id: 2,
    bgClass: "bg-image2",
    titleTop: "VGC, Lagos",
    zip: "78345",
    titleNumber: "204",
    title: "Haris Drive, VGC, Lekki,",
    price: "$ 12.000",
  },
  {
    id: 3,
    bgClass: "bg-image3",
    titleTop: "VGC, Lagos",
    zip: "78345",
    titleNumber: "204",
    title: "Haris Drive, VGC, Lekki",
    price: "$ 12.000",
  },
];

const Hero = () => {
  return (
    <div className="intro intro-carousel position-relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
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
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="intro-title-top">
                                {slide.titleTop}
                                <br /> {slide.zip}
                              </p>
                              <h1 className="intro-title mb-4">
                                <span className="color-b">
                                  {slide.titleNumber}{" "}
                                </span>
                                {slide.title}
                              </h1>
                              <p className="intro-subtitle intro-price">
                                <Link>
                                  <span className="price-a">
                                    rent | {slide.price}
                                  </span>
                                </Link>
                              </p>
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
