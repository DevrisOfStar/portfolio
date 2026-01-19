import React from 'react'

function PublicationsInfo({ publications }) {
  if (!publications) return null

  return (
    <div className="publications-info">
      <div className="books-icon">📚📚📚📚</div>
      <div>+ {publications.count}</div>
      <div>+ 집필·번역 가이드 - {publications.guide}</div>
    </div>
  )
}

export default PublicationsInfo
