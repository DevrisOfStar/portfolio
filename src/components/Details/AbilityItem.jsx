import React from 'react'
import { useNavigate } from 'react-router-dom'

function AbilityItem({ ability }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${ability.id}`)
  }

  return (
    <div className="ability-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span className="ability-name">{ability.name}</span>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(ability.level / 5) * 100}%` }}></div>
      </div>
      <span className="level">Lv.{ability.level}</span>
    </div>
  )
}

export default AbilityItem
