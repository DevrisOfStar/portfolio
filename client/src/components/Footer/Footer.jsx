import React from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import ScrollReveal from '../ScrollReveal'
import './Footer.css'

function Footer() {
  const { data, loading } = usePortfolio()

  if (loading || !data || !data.personalInfo) {
    return (
      <ScrollReveal direction="up" delay={0}>
        <footer className="footer">
          <div className="footer-content">
            <div className="sns-links">로딩 중...</div>
          </div>
        </footer>
      </ScrollReveal>
    )
  }

  const personalInfo = data.personalInfo

  return (
    <ScrollReveal direction="up" delay={0}>
      <footer className="footer">
      <div className="footer-content">
        <div className="sns-links">
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`}
              className="sns-link email"
              aria-label="Email"
            >
              <span className="sns-label">이메일</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={`https://github.com/${personalInfo.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="sns-link github"
              aria-label="GitHub"
            >
              <span className="sns-label">깃허브</span>
            </a>
          )}
        </div>
      </div>
    </footer>
    </ScrollReveal>
  )
}

export default Footer
