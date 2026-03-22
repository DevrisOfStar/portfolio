import React from 'react'
import PropTypes from 'prop-types'

export function DetailTendency({ item }) {
  return (
    <div className="detail-content">
      <h2>{item.name}</h2>
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailTendency.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string
  }).isRequired
}
