import React from 'react'
import { Link } from 'react-router-dom'
import '../components/Navbar.css'
function HotelHeaders() {
  return (
    <div className='navbar'>
      <div className="navContainer">

         <Link style={{ textDecoration: "none" }} to="/">
          <h1 className="logo">WANDERERS</h1>
        </Link>
</div>
    </div>
  )
}

export default HotelHeaders