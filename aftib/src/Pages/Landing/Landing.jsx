import React from 'react'
import Hero from '../../Components/Hero/Hero'
import landingCard1 from '../../assets/images/landingCard1.png'
import landingCard2 from '../../assets/images/landingCard2.png'
import landingCard3 from '../../assets/images/landingCard3.png'
import agent from '../../assets/images/agent.png'
import homes from '../../assets/images/homes.png'
import './Landing.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  return ( 
    <>
    <Hero/>

<section className="homecard mt-5">
<div className="container">
  <div className="row">
    <div className="col-lg-6">
      <div className="home-title">
        <h5>Get home recommendation</h5>

        <p>Login for more experience</p>
      </div>
      <Link className="homeBtn">Login</Link>
    </div>

    <div className="col-lg-6">
      <img src={homes} alt="" />
    </div>
  </div>
</div>
</section>


    <section className="landingCard mt-5">
      <div className="container">
      <div className="row">
        <div className="col-lg-4 ">
          <div className="landingCard-item">
           <img src={landingCard1} alt="" />
           <div className="landingTopics">
            <h4>Buy a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>

            <Link className='enter'>
           Enter
            </Link>
           </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="landingCard-item">
          <img src={landingCard2} alt="" />
          <div className="landingTopics">
            <h4>Sell a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>
            <Link className='enter'>
           Enter
            </Link>
           
           </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="landingCard-item">
          <img src={landingCard3} alt="" />
          <div className="landingTopics">
            <h4>Rent a home</h4>

            <p>Find your place with immersive photos and exclusive listings.</p>

            <Link className='enter'>
           Enter
            </Link>
           </div>
          </div>
        </div>
      </div>
    </div>
      </section>

      <div className="landingcontact py-5">
            <div className="container">
                <div className="p-3">
                    <div className="  p-4 landingContact">
                        <div className="row g-5 align-items-center">
                        <div className="col-lg-6 ">
                                <div className="mb-4">
                                    <h1 className="mb-4">Discover your ideal<br/>property effortlessly</h1>
                                    <p>Get in touch with leading real estate agents<br/>and agencies</p>
                                </div>
                                <Link href="#" className=" landingicon ">Find agents</Link>
                            </div>
                            <div className="col-lg-6">
                                <img className="img-fluid w-100" src={agent} alt=""/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing