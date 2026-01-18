import React from 'react'
import { useNavigate } from 'react-router-dom'

function SkillItem({ skill, maxLevel = 5, clickable = false }) {
  const navigate = useNavigate()
  
  // skill 객체가 skill 속성 또는 name 속성을 가질 수 있음
  const skillName = skill.skill || skill.name
  
  // 레벨을 5로 고정하고, 5를 넘으면 5로 제한
  const maxLevelFixed = 5
  const level = Math.min(skill.level, maxLevelFixed)

  const handleClick = () => {
    if (clickable && skill.id) {
      navigate(`/detail/${skill.id}`)
    }
  }
  
  return (
    <div 
      className="skill-item"
      onClick={handleClick}
      style={{ cursor: (clickable && skill.id) ? 'pointer' : 'default' }}
    >
      <span>{skillName}</span>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(level / maxLevelFixed) * 100}%` }}></div>
      </div>
      <span className="level">Lv.{skill.level}</span>
    </div>
  )
}

export default SkillItem
