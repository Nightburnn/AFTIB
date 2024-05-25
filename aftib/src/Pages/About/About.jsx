import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import prev from '../../assets/images/prev.png';
import next from '../../assets/images/next.png';
import './About.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const About = () => {

  

  return (
    <main id="main">
      <section className="about">
      
          <div className="container bg-image">
            <h2>ABOUT US</h2>
            <div className="about-title">
              <div className="swiper-content-bg">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                 
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
                >
                  <SwiperSlide>
                    <p>
                      Welcome to Aftib, your trusted partner in real estate. We specialize in providing exceptional property services, helping you find the perfect home, investment property, or commercial space that meets your unique needs.
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <p>
                      Welcome to Aftib, your trusted partner in real estate. We specialize in providing exceptional property services, helping you find the perfect home, investment property, or commercial space that meets your unique needs.
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <p>
                      Welcome to Aftib, your trusted partner in real estate. We specialize in providing exceptional property services, helping you find the perfect home, investment property, or commercial space that meets your unique needs.
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <p>
                      Welcome to Aftib, your trusted partner in real estate. We specialize in providing exceptional property services, helping you find the perfect home, investment property, or commercial space that meets your unique needs.
                    </p>
                  </SwiperSlide>
                </Swiper>
                <div className="swiper-button-prev"><img src={prev} alt="Previous" /></div>
                <div className="swiper-button-next"><img src={next} alt="Next" /></div>
              </div>
            </div>
          </div>
        
      </section>
    </main>
  );
};

export default About;
