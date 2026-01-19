import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ScrollReveal.css'

function ScrollReveal({ children, delay = 0, direction = 'up', className = '', as = 'div' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const Tag = as

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal scroll-reveal-${direction} ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default ScrollReveal
