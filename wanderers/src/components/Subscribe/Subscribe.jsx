import React from 'react'
import './Subscribe.css'
function Subscribe() {
  return (
    <div className='subscribe'>
        <h2 className='subscribeTitle'>Save time, Save Money</h2>
        <span className='subsDesc'>Sign up and we'll send the best deals to you</span>
        <div className="mail">
            <input type="email" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Subscribe