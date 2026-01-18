import React from 'react'
import { useNavigate } from 'react-router-dom'

function StatusItem({ status }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${status.id}`)
  }

  return (
    <div className="status-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {status.text || status}
    </div>
  )
}

export default StatusItem
