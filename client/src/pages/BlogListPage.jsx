import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../contexts/PortfolioContext'
import BoardItem from '../components/Details/BoardItem'
import './BlogListPage.css'

function BlogListPage() {
  const navigate = useNavigate()
  const { data, loading } = usePortfolio()

  if (loading || !data) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-container">
          <div className="blog-list-header">
            <h1 className="blog-list-title">블로그 (Blog)</h1>
            <button onClick={() => navigate('/')} className="back-button">
              ← Back to Home
            </button>
          </div>
          <div className="blog-list-content">
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  const blog = data.blog || []

  return (
    <div className="blog-list-page">
      <div className="blog-list-container">
        <div className="blog-list-header">
          <h1 className="blog-list-title">블로그 (Blog)</h1>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
        <div className="blog-list-content">
          {blog.length === 0 ? (
            <p>블로그 글이 없습니다.</p>
          ) : (
            blog.map((item) => (
              <BoardItem key={item.id} item={item} variant="list" />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogListPage
