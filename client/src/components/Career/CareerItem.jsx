import React from 'react'
import { useNavigate } from 'react-router-dom'

function CareerItem({ item }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${item.id}`)
  }

  return (
    <div className="career-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="career-bar">{item.period}</div>
      {item.company && <div className="career-company">{item.company}</div>}
    </div>
  )
}

export default CareerItem
