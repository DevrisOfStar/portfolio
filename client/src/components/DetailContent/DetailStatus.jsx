import React from 'react'
import PropTypes from 'prop-types'

export function DetailStatus({ item }) {
  return (
    <div className="detail-content">
      <h2>{item.text}</h2>
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailStatus.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    content: PropTypes.string
  }).isRequired
}
