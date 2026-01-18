import React, { useState } from 'react'
import { PERSONAL_INFO, INTRO_STATEMENTS } from '../../data/constants'
import IntroStatement from './IntroStatement'
import ScrollReveal from '../ScrollReveal'
import HamburgerButton from '../HamburgerButton/HamburgerButton'
import Sidebar from '../Sidebar/Sidebar'

function HeaderTop() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <header className="header">
        <HamburgerButton onClick={toggleSidebar} isOpen={sidebarOpen} />
        <ScrollReveal direction="down" delay={0}>
          <div className="header-top">
            <h1 className="title">RESUME</h1>
            <div className="intro-statements">
              {INTRO_STATEMENTS.map((stmt, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                  <IntroStatement statement={stmt} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <div className="personal-info">
            {PERSONAL_INFO.name} | {PERSONAL_INFO.email} | 
            깃허브 @{PERSONAL_INFO.github}
          </div>
        </ScrollReveal>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  )
}

export default HeaderTop
