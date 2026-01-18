import React from 'react'
import { PERSONAL_INFO } from '../../data/constants'
import ScrollReveal from '../ScrollReveal'
import './Footer.css'

function Footer() {
  return (
    <ScrollReveal direction="up" delay={0}>
      <footer className="footer">
      <div className="footer-content">
        <div className="sns-links">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="sns-link email"
            aria-label="Email"
          >
            <span className="sns-label">이메일</span>
          </a>
          <a 
            href={`https://github.com/${PERSONAL_INFO.github}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="sns-link github"
            aria-label="GitHub"
          >
            <span className="sns-label">깃허브</span>
          </a>
        </div>
      </div>
    </footer>
    </ScrollReveal>
  )
}

export default Footer
