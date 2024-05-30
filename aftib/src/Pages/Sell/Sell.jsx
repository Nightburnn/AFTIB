import React from 'react'
import sell from '../../assets/images/sell.png'
import './Sell.css'

const Sell = () => {
  return (
    <>

    <main id="mainSell">
      <div className="container">
        <div className="row">
          <div className="sell mt-5">
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