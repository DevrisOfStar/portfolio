import React from 'react'

function HobbyItem({ hobby }) {
  return (
    <div className="hobby-item">
      {hobby.image ? (
        <img src={hobby.image} alt={hobby.name} className="hobby-image" draggable="false" onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'block'
        }} />
      ) : null}
      {hobby.icon && <span className="hobby-icon" style={{ display: hobby.image ? 'none' : 'block' }}>{hobby.icon}</span>}
      <span className="hobby-name">{hobby.name}</span>
    </div>
  )
}

export default HobbyItem
