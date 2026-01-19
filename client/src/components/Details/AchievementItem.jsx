import React from 'react'
import { useNavigate } from 'react-router-dom'

function AchievementItem({ item }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (item.id) {
      navigate(`/detail/${item.id}`)
    }
  }

  // item이 문자열인 경우 (development) - 이제는 객체로 변경됨
  if (typeof item === 'string') {
    return <div className="achievement-item">{item}</div>
  }

  // item이 객체인 경우 (topPlanning, translations, development)
  return (
    <div 
      className="achievement-item" 
      onClick={handleClick} 
      style={{ cursor: item.id ? 'pointer' : 'default' }}
    >
      {item.year && <span className="achievement-year">[{item.year}]</span>} {item.title}
    </div>
  )
}

export default AchievementItem
