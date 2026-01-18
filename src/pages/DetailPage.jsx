import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { portfolio_info } from '../data/constants'
import './DetailPage.css'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // portfolio_info에서 모든 데이터를 하나의 배열로 합치기
  const allData = [
    ...portfolio_info.career.details.map(item => ({ ...item, type: 'career' })),
    ...portfolio_info.generalTendencies.map(item => ({ ...item, type: 'tendency' })),
    ...portfolio_info.hobbies.map(item => ({ ...item, type: 'hobby' })),
    ...Object.values(portfolio_info.languageSkills).map(group => group.content).flat().map(item => ({ ...item, type: 'language' })),
    ...portfolio_info.basicAbilities.map(item => ({ ...item, type: 'ability' })),
    ...Object.values(portfolio_info.workSkills).map(group => group.content).flat().map(item => ({ ...item, type: 'work' })),
    ...portfolio_info.blog.map(item => ({ ...item, type: 'blog' })),
    ...portfolio_info.currentStatus.map(item => ({ ...item, type: 'status' }))
  ]

  const item = allData.find(data => data.id === id)

  if (!item) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <h1>Item not found</h1>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const renderDetail = () => {
    switch (item.type) {
      case 'career':
        return (
          <div className="detail-content">
            <h2>{item.period}</h2>
            {item.company && <p className="detail-company">Company: {item.company}</p>}
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'tendency':
        return (
          <div className="detail-content">
            <h2>{item.name}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'hobby':
        return (
          <div className="detail-content">
            {item.image && (
              <div className="detail-image-container">
                <img src={item.image} alt={item.name} className="detail-image" draggable="false" onError={(e) => {
                  e.target.style.display = 'none'
                }} />
              </div>
            )}
            {!item.image && item.icon && (
              <div className="detail-icon">{item.icon}</div>
            )}
            <h2>{item.name}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'language':
        return (
          <div className="detail-content">
            <h2>{item.skill}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'ability':
        return (
          <div className="detail-content">
            <h2>{item.name}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'work':
        return (
          <div className="detail-content">
            <h2>{item.name}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'blog':
        return (
          <div className="detail-content">
            {item.date && <p className="detail-year">Date: {item.date}</p>}
            {item.title && <h2>{item.title}</h2>}
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      case 'status':
        return (
          <div className="detail-content">
            <h2>{item.text}</h2>
            {item.content && <p className="detail-desc">{item.content}</p>}
          </div>
        )
      default:
        return <div>Unknown type</div>
    }
  }

  const handleBack = () => {
    if (item.type === 'blog') {
      navigate('/blog')
    } else {
      navigate('/')
    }
  }

  const getBackButtonText = () => {
    if (item.type === 'blog') {
      return '← Back to Blog List'
    }
    return '← Back to Home'
  }

  const renderHeaderVisual = () => {
    switch (item.type) {
      case 'tendency':
        return (
          <div className="detail-header-visual">
            <div className="stars">
              {'★'.repeat(item.level)}{'☆'.repeat(5 - item.level)}
            </div>
          </div>
        )
      case 'hobby':
        return (
          <div className="detail-header-visual">
            {item.image ? (
              <img src={item.image} alt={item.name} className="detail-icon-small-image" draggable="false" onError={(e) => {
                e.target.style.display = 'none'
                if (item.icon) {
                  const iconSpan = document.createElement('span')
                  iconSpan.className = 'detail-icon-small'
                  iconSpan.textContent = item.icon
                  e.target.parentNode.appendChild(iconSpan)
                }
              }} />
            ) : item.icon ? (
              <div className="detail-icon-small">{item.icon}</div>
            ) : null}
          </div>
        )
      case 'language':
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
                ></div>
              </div>
              <span className="detail-progress-level">Lv.{item.level}</span>
            </div>
          </div>
        )
      case 'ability':
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
                ></div>
              </div>
              <span className="detail-progress-level">Lv.{item.level}</span>
            </div>
          </div>
        )
      case 'work':
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
                ></div>
              </div>
              <span className="detail-progress-level">Lv.{item.level}</span>
            </div>
          </div>
        )
      case 'blog':
        return (
          <div className="detail-header-visual">
            {item.category && (
              <span className="detail-category-header">{item.category}</span>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button onClick={handleBack} className="back-button">
          {getBackButtonText()}
        </button>
        <div className="detail-header">
          <span className="detail-type">{item.type}</span>
          <div className="detail-header-right">
            {renderHeaderVisual()}
            <span className="detail-id">ID: {item.id}</span>
          </div>
        </div>
        {renderDetail()}
      </div>
    </div>
  )
}

export default DetailPage
