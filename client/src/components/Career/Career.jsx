import React from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import CareerItem from './CareerItem'
import ScrollReveal from '../ScrollReveal'

function Career() {
  const { data, loading } = usePortfolio()

  if (loading || !data || !data.career) {
    return (
      <section className="career-section">
        <div className="career-timeline">
          <div className="career-main">로딩 중...</div>
        </div>
      </section>
    )
  }

  const careerItems = data.career.details || []

  return (
    <section className="career-section">
      <div className="career-timeline">
        <ScrollReveal direction="left" delay={100}>
          <div className="career-main">{data.career.total}</div>
        </ScrollReveal>
        <div className="career-details">
          {careerItems.map((item, idx) => (
            <ScrollReveal key={idx} direction="right" delay={idx * 100}>
              <CareerItem item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Career
