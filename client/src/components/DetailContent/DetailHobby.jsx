import React from 'react'
import PropTypes from 'prop-types'

export function DetailHobby({ item }) {
  return (
    <div className="detail-content">
      {item.image && (
        <div className="detail-image-container">
          <img
            src={item.image}
            alt={item.name}
            className="detail-image"
            draggable="false"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      {!item.image && item.icon && <div className="detail-icon">{item.icon}</div>}
      <h2>{item.name}</h2>
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailHobby.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string
  }).isRequired
}
