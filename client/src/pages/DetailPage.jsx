import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePortfolio } from '../contexts/PortfolioContext'
import './DetailPage.css'

// 날짜를 yy.mm.dd 형식으로 변환
function formatDate(dateString) {
  if (!dateString) return dateString;
  
  try {
    // YYYY-MM-DD 형식인 경우
    if (dateString.includes('-')) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
      }
    }
    
    // 이미 다른 형식인 경우 그대로 반환
    return dateString;
  } catch (error) {
    return dateString;
  }
}

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = usePortfolio()

  if (loading || !data) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

  // 모든 데이터를 하나의 배열로 합치기
  const allData = [
    ...(data.career?.details || []).map(item => ({ ...item, type: 'career' })),
    ...(data.generalTendencies || []).map(item => ({ ...item, type: 'tendency' })),
    ...(data.hobbies || []).map(item => ({ ...item, type: 'hobby' })),
    ...Object.values(data.languageSkills || {}).map(group => group.content).flat().map(item => ({ ...item, type: 'language' })),
    ...(data.basicAbilities || []).map(item => ({ ...item, type: 'ability' })),
    ...Object.values(data.workSkills || {}).map(group => group.content).flat().map(item => ({ ...item, type: 'work' })),
    ...(data.blog || []).map(item => ({ ...item, type: 'blog' })),
    ...(data.currentStatus || []).map(item => ({ ...item, type: 'status' }))
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
          <div className="detail-content blog-detail-content">
            {item.title && <h2>{item.title}</h2>}
            {item.items && item.items.length > 0 && (
              <div className="blog-content-items">
                {item.items.map((contentItem, idx) => {
                  switch (contentItem.type) {
                    case 'heading':
                      return <h3 key={idx} style={{ marginTop: '24px', marginBottom: '12px' }}>{contentItem.content}</h3>
                    case 'code':
                      return (
                        <pre key={idx} style={{ 
                          background: 'var(--bg-secondary)', 
                          padding: '16px', 
                          borderRadius: '6px', 
                          overflow: 'auto',
                          margin: '16px 0'
                        }}>
                          <code>{contentItem.content}</code>
                        </pre>
                      )
                    case 'quote':
                      return (
                        <blockquote key={idx} style={{ 
                          borderLeft: '4px solid var(--text-accent)', 
                          paddingLeft: '16px', 
                          margin: '16px 0',
                          fontStyle: 'italic',
                          color: 'var(--text-secondary)'
                        }}>
                          {contentItem.content}
                        </blockquote>
                      )
                    case 'image':
                      return (
                        <div key={idx} style={{ margin: '16px 0' }}>
                          <img 
                            src={contentItem.content} 
                            alt="" 
                            style={{ 
                              maxWidth: '100%', 
                              height: 'auto',
                              borderRadius: '8px'
                            }} 
                          />
                        </div>
                      )
                    case 'text':
                    default:
                      return (
                        <p key={idx} style={{ margin: '12px 0', lineHeight: '1.8' }}>
                          {contentItem.content.split('\n').map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                              {line}
                              {lineIdx < contentItem.content.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      )
                  }
                })}
              </div>
            )}
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
        return null
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
            {item.type === 'blog' ? (
              <>
                {item.category && <span className="detail-category-header" style={{ marginRight: '12px' }}>{item.category}</span>}
                <span className="detail-id">날짜 : {item.date ? formatDate(item.date) : item.id}</span>
              </>
            ) : (
              <span className="detail-id">ID: {item.id}</span>
            )}
          </div>
        </div>
        {renderDetail()}
      </div>
    </div>
  )
}

export default DetailPage
