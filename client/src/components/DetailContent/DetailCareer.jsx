import React from 'react'
import PropTypes from 'prop-types'

export function DetailCareer({ item }) {
  return (
    <div className="detail-content">
      <h2>{item.period}</h2>
      {item.company && <p className="detail-company">Company: {item.company}</p>}
      {item.content && <p className="detail-desc">{item.content}</p>}
    </div>
  )
}

DetailCareer.propTypes = {
  item: PropTypes.shape({
    period: PropTypes.string,
    company: PropTypes.string,
    content: PropTypes.string
  }).isRequired
}
