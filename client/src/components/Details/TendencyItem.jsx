import React from 'react'

function TendencyItem({ item }) {
  return (
    <div className="tendency-item">
      <span className="tendency-name">{item.name}</span>
      <div className="stars">
        {'★'.repeat(item.level)}{'☆'.repeat(5 - item.level)}
      </div>
    </div>
  )
}

export default TendencyItem
