import React from 'react'
import Hero from '../../Components/Hero/Hero'
import sell from '../../assets/images/sell.png'
import './Sell.css'

const Sell = () => {
  return (
    <>
    <Hero/>

    <main id="mainSell">
      <div className="container">
        <div className="row">
          <div className="sell">
            <h5>Oops you don't have any properties yet</h5>
          <img src={sell} alt="" />
          <button>
            Exit
          </button>
          </div>
        </div>
      </div>
    </main>
    </>
   
  )
}

export default Sell