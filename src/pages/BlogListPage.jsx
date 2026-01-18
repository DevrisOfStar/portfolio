import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BLOG } from '../data/constants'
import BoardItem from '../components/Details/BoardItem'
import './BlogListPage.css'

function BlogListPage() {
  const navigate = useNavigate()

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
          {BLOG.map((item, idx) => (
            <BoardItem key={idx} item={item} variant="list" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogListPage
