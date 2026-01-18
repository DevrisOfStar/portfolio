import React from 'react'
import { CAREER } from '../../data/constants'
import CareerItem from './CareerItem'
import ScrollReveal from '../ScrollReveal'

function Career() {
  // 데이터를 정형화된 형태로 변환
  const careerItems = CAREER.details

  return (
    <section className="career-section">
      <div className="career-timeline">
        <ScrollReveal direction="left" delay={100}>
          <div className="career-main">{CAREER.total}</div>
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
