import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {

  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Pass the exact same function here
    };
  }, []);


  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img src="./images/logo.png" alt="Netflix Logo" className='nav__logo' />
      <img src="./images/Netflix-avatar.png" alt="Netflix Avatar" className='nav__avatar' />
    </div>
  )
}

export default Nav