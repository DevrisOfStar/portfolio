import React from 'react'
import PropTypes from 'prop-types'

export function DetailAbility({ item }) {
  return (
    <div className="detail-content">
      <h2>{item.name}</h2>
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailAbility.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string
  }).isRequired
}
