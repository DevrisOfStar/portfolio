import React from 'react'
import PropTypes from 'prop-types'

export function DetailHeaderVisual({ item }) {
  switch (item.type) {
    case 'tendency':
      return (
        <div className="detail-header-visual">
          <div className="stars">
            {'★'.repeat(item.level)}
            {'☆'.repeat(5 - item.level)}
          </div>
        </div>
      )
    case 'hobby':
      return (
        <div className="detail-header-visual">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="detail-icon-small-image"
              draggable="false"
              onError={(e) => {
                e.target.style.display = 'none'
                if (item.icon) {
                  const iconSpan = document.createElement('span')
                  iconSpan.className = 'detail-icon-small'
                  iconSpan.textContent = item.icon
                  e.target.parentNode.appendChild(iconSpan)
                }
              }}
            />
          ) : item.icon ? (
            <div className="detail-icon-small">{item.icon}</div>
          ) : null}
        </div>
      )
    case 'language': {
      const maxLevelFixed = 5
      const languageLevel = Math.min(item.level, maxLevelFixed)
      return (
        <div className="detail-header-visual">
          <div className="detail-progress-bar-container">
            <div className="detail-progress-bar">
              <div
                className="detail-progress-fill"
                style={{ width: `${(languageLevel / maxLevelFixed) * 100}%` }}
                title={`레벨 ${item.level}`}
              />
            </div>
            <span className="detail-progress-level">Lv.{item.level}</span>
          </div>
        </div>
      )
    }
    case 'ability': {
      const abilityMaxLevel = 5
      const abilityLevel = Math.min(item.level, abilityMaxLevel)
      return (
        <div className="detail-header-visual">
          <div className="detail-progress-bar-container">
            <div className="detail-progress-bar">
              <div
                className="detail-progress-fill"
                style={{ width: `${(abilityLevel / abilityMaxLevel) * 100}%` }}
                title={`레벨 ${item.level}`}
              />
            </div>
            <span className="detail-progress-level">Lv.{item.level}</span>
          </div>
        </div>
      )
    }
    case 'work': {
      const workMaxLevel = 5
      const workLevel = Math.min(item.level, workMaxLevel)
      return (
        <div className="detail-header-visual">
          <div className="detail-progress-bar-container">
            <div className="detail-progress-bar">
              <div
                className="detail-progress-fill"
                style={{ width: `${(workLevel / workMaxLevel) * 100}%` }}
                title={`레벨 ${item.level}`}
              />
            </div>
            <span className="detail-progress-level">Lv.{item.level}</span>
          </div>
        </div>
      )
    }
    case 'blog':
      return null
    default:
      return null
  }
}

DetailHeaderVisual.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    level: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string
  }).isRequired
}
