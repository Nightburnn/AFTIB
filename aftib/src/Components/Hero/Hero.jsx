import React from 'react';
import './Hero.css'

const Hero = () => {
  return (
   <main id="main">
    <section className="heroPage">
        <div className="container backGround">
<div className="context">
    <h3>
        Homes, Loans,<br/> Tours, Agents.
    </h3>

    <form className='hero-form'>
  <input type="search" placeholder="Enter an address"/>
  <button type="submit">Search</button>
</form>

</div>
        </div>
    </section>
   </main>
  )
}

export default Hero