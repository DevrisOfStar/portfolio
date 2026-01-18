import React from 'react'
import './HamburgerButton.css'

function HamburgerButton({ onClick, isOpen }) {
  return (
    <button 
      className={`hamburger-button ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}

export default HamburgerButton
