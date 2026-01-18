import React from 'react'
import { useNavigate } from 'react-router-dom'

function ContributionItem({ item }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    // URL 링크가 있으면 외부 링크로 이동, 없으면 상세 페이지로
    if (!item.url) {
      e.preventDefault()
      navigate(`/detail/${item.id}`)
    }
  }

  return (
    <div 
      className="contribution-item" 
      onClick={!item.url ? handleClick : undefined}
      style={{ cursor: !item.url ? 'pointer' : 'default' }}
    >
      <span className="contribution-year">[{item.year}]</span> {item.desc}
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="contribution-link" onClick={(e) => e.stopPropagation()}>
          {' '}{item.url}
        </a>
      )}
    </div>
  )
}

export default ContributionItem
