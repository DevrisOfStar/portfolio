import React, { useState } from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import IntroStatement from './IntroStatement'
import ScrollReveal from '../ScrollReveal'
import HamburgerButton from '../HamburgerButton/HamburgerButton'
import Sidebar from '../Sidebar/Sidebar'

function HeaderTop() {
  const { data, loading } = usePortfolio()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // 데이터 로딩 중이거나 없으면 빈 값 반환
  if (loading || !data) {
    return (
      <>
        <header className="header">
          <HamburgerButton onClick={toggleSidebar} isOpen={sidebarOpen} />
          <div className="header-top">
            <h1 className="title">RESUME</h1>
            <div className="intro-statements">로딩 중...</div>
          </div>
        </header>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </>
    )
  }

  const personalInfo = data.personalInfo || { name: '', email: '', github: null }
  const introStatements = data.introStatements || []

  return (
    <>
      <header className="header">
        <HamburgerButton onClick={toggleSidebar} isOpen={sidebarOpen} />
        <ScrollReveal direction="down" delay={0}>
          <div className="header-top">
            <h1 className="title">RESUME</h1>
            <div className="intro-statements">
              {introStatements.map((stmt, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                  <IntroStatement statement={stmt} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={300}>
          <div className="personal-info">
            {personalInfo.name} | {personalInfo.email} | 
            {personalInfo.github && ` 깃허브 @${personalInfo.github}`}
          </div>
        </ScrollReveal>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
    </>
  )
}

export default HeaderTop
