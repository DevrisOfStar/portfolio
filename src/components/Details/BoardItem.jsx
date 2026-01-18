import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BoardItem.css'

function BoardItem({ item, variant = 'grid' }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (item.id) {
      navigate(`/detail/${item.id}`)
    }
  }

  return (
    <div 
      className={`board-item ${variant === 'list' ? 'board-item-list' : ''}`}
      onClick={handleClick} 
      style={{ cursor: item.id ? 'pointer' : 'default' }}
    >
      <div className="board-header">
        {item.date && <span className="board-year">[{item.date}]</span>}
        {item.category && <span className="board-category">{item.category}</span>}
      </div>
      {variant === 'grid' && item.thumbnail && (
        <div className="board-thumbnail">
          <img 
            src={item.thumbnail} 
            alt={item.title || ''} 
            className="board-thumbnail-image"
            draggable="false"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="board-content">
        {item.title && <h4 className="board-title">{item.title}</h4>}
      </div>
    </div>
  )
}

export default BoardItem
