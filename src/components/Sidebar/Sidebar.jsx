import React, { useState, useEffect } from 'react'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>설정</h3>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            ×
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4>테마</h4>
            <div className="theme-toggle-container">
              <span>야간 모드</span>
              <button 
                className="theme-toggle-button" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
                <span className="theme-label">{theme === 'light' ? 'OFF' : 'ON'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
