import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import prev from '../../assets/images/prev.svg';
import next from '../../assets/images/next.svg';
import about1 from '../../assets/images/about1.png'
import about2 from '../../assets/images/about2.png'
import about3 from '../../assets/images/about3.png'
import about4 from '../../assets/images/about4.png'
import about5 from '../../assets/images/about5.png'
import './About.css';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const About = () => {
  return (
    <main id='aboutmain'>
      <section className="bg-image">
             <div className="about">
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
                pagination={{ clickable: true }}
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
              <div className="swiper-button-prev">
                <img src={prev} alt="Previous" />
              </div>
              <div className="swiper-button-next">
                <img src={next} alt="Next" />
              </div>
            </div>
          </div>
        </div>

     
      </section>

      <div className="container about-mission">
      <div className="row my-5">
        <div className="col-md-6">
          <h2 className="text-center">Our Mission</h2>
          <p className='text-center'>
          To provide exceptional real estate services with integrity, expertise, and dedication, ensuring our clients achieve their property goals through innovative solutions and personalized attention.
          </p>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Our Vision</h2>
          <p className='text-center'>
          To be the leading real estate agency, renowned for setting industry standards in service excellence, fostering sustainable growth, and building lasting relationships with our clients and communities.
          </p>
        </div>
      </div>



      
      </div>

      <div className="container about-service"><h3 className='text-center'>Our Services</h3>
        <div className="row justify-center aboutservice text1">
          
          <div className="col-md-4">
          <img src={about1} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-8 align-center add">
          <h2 className="mb-1">Real Estate consultancy</h2>
          <p>
          We are the premier destination for acquiring rapidly appreciating land at competitive prices. Our mission is to provide exceptional quality through our property development services. Aftib comprehensive offerings include:
As one of the leading and most esteemed real estate consultants in the country, we pride
ourselves on delivering professional services within the real estate sector. Our extensive 
specialization and expertise in both residential and commercial projects distinguish us as one of the most sought-after and highly recommended real estate consultancies in the region.
          </p>
        </div>
        </div>

        <div className="row justify-center aboutservice text1 mt-5">
        <div className="col-md-4">
          <img src={about2} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-8 align-center add">
          <h2 className="mb-1">Property Development</h2>
          <p>
          We are the foremost destination for those seeking rapidly developing land at competitive prices. Our commitment is to provide unparalleled quality through our comprehensive property development services. We pride ourselves on offering exceptional value, ensuring that each client receives the best possible experience and outcomes. Our extensive expertise in the real estate market allows us to deliver tailored solutions that meet the unique needs of our clients, making us a trusted partner in your property investment journey.
          </p>
        </div>
       
        </div>

        <div className="row justify-center aboutservice text1 mt-5">
          <div className="col-md-4">
          <img src={about3} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-8 align-center add">
          <h2 className="mb-1">Land Surveying</h2>
          <p>
          We offer a wide range of land and engineering surveying services for both public and private sectors. Our expertise includes Topographical Land Surveys, Building Elevations and Plans, and Boundary Surveys. We ensure the authenticity and security of your land properties, giving you peace of mind for the present and future.
          </p>
        </div>
        </div>

        <div className="row justify-center aboutservice text1 mt-5">
        <div className="col-md-4">
          <img src={about4} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-8 align-center add">
          <h2 className="mb-1">Real Estate Management</h2>
          <p>
          Your business with us is managed by highly qualified and experienced real estate professionals, including estate surveyors and valuers, all supported by a skilled and efficient administrative and technical team. This comprehensive support ensures the acquisition, oversight, and maintenance of your real estate properties' value.
Together Everyone Achieves More. Looking for tested and trusted experts to manage your real estate property? Our specialists are here to help you maintain and enhance the value of your investments.
          </p>
        </div>
        
        </div>

        <div className="row justify-center aboutservice text1 mt-5">
          <div className="col-md-4">
          <img src={about5} alt="About Us" className="img-fluid" />
        </div>
        <div className="col-md-8 align-center add">
          <h2 className="mb-1">Property Sales</h2>
          <p>
          Real estate agencies assist clients in selling residential, commercial, and land properties. Services include property valuation, marketing and advertising, conducting open houses, negotiating offers, and managing the closing process to ensure a smooth transaction.
          </p>
        </div>
        </div>

      </div>
    </main>
  );
};

export default About;
