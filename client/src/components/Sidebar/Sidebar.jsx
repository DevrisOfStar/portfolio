import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
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
          {/* 로컬 환경에서만 블로그 글 작성 버튼 표시 */}
          {(import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
            <div className="sidebar-section">
              <h4>블로그</h4>
              <button 
                className="sidebar-button sidebar-button-primary" 
                onClick={() => {
                  navigate('/blog/write')
                  onClose()
                }}
              >
                ✏️ 블로그 글 작성
              </button>
            </div>
          )}
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
