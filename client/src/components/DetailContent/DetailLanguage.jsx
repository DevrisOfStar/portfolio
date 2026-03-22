import React from 'react'
import PropTypes from 'prop-types'

export function DetailLanguage({ item }) {
  return (
    <div className="detail-content">
      <h2>{item.skill}</h2>
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailLanguage.propTypes = {
  item: PropTypes.shape({
    skill: PropTypes.string,
    content: PropTypes.string
  }).isRequired
}
