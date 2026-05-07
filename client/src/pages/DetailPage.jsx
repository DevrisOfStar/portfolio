import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePortfolio } from '../contexts/PortfolioContext'
import { formatDate } from '../utils/formatDate'
import {
  DetailCareer,
  DetailTendency,
  DetailHobby,
  DetailLanguage,
  DetailAbility,
  DetailWork,
  DetailBlog,
  DetailStatus,
  DetailHeaderVisual
} from '../components/DetailContent'
import './DetailPage.css'

const DETAIL_COMPONENTS = {
  career: DetailCareer,
  tendency: DetailTendency,
  hobby: DetailHobby,
  language: DetailLanguage,
  ability: DetailAbility,
  work: DetailWork,
  blog: DetailBlog,
  status: DetailStatus
}

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = usePortfolio()

  const allData = useMemo(() => {
    if (loading || !data) return []
    return [
      ...(data.generalTendencies || []).map(item => ({ ...item, type: 'tendency' })),
      ...(data.hobbies || []).map(item => ({ ...item, type: 'hobby' })),
      ...Object.values(data.languageSkills || {}).map(group => group.content).flat().map(item => ({ ...item, type: 'language' })),
      ...(data.basicAbilities || []).map(item => ({ ...item, type: 'ability' })),
      ...Object.values(data.workSkills || {}).map(group => group.content).flat().map(item => ({ ...item, type: 'work' })),
      ...(data.blog || []).map(item => ({ ...item, type: 'blog' })),
      ...(data.currentStatus || []).map(item => ({ ...item, type: 'status' }))
    ]
  }, [data, loading])

  const item = useMemo(() => allData.find(d => d.id === id), [allData, id])

  if (loading || !data) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <p>로딩 중...</p>
        </div>
      </div>
    )
  }

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

  const DetailContentComponent = DETAIL_COMPONENTS[item.type]

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

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button onClick={handleBack} className="back-button">
          {getBackButtonText()}
        </button>
        <div className="detail-header">
          <span className="detail-type">{item.type}</span>
          <div className="detail-header-right">
            <DetailHeaderVisual item={item} />
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
        {DetailContentComponent ? <DetailContentComponent item={item} /> : <div>Unknown type</div>}
      </div>
    </div>
  )
}

export default DetailPage
