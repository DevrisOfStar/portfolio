import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GENERAL_TENDENCIES,
  HOBBIES,
  LANGUAGE_SKILLS,
  THINGS_TO_AVOID,
  BASIC_ABILITIES,
  WORK_SKILLS,
  BLOG,
  CURRENT_STATUS
} from '../../data/constants'
import TendencyItem from './TendencyItem'
import HobbyItem from './HobbyItem'
import SkillItem from './SkillItem'
import AbilityItem from './AbilityItem'
import BoardItem from './BoardItem'
import StatusItem from './StatusItem'
import ScrollReveal from '../ScrollReveal'
import './Details.css'

function Details() {
  const navigate = useNavigate()
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 480)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  
  const blogItemsToShow = isSmallScreen ? 2 : 5

  return (
    <>
      {/* 블로그 - 맨 위 1단 */}
      <ScrollReveal direction="up" delay={0}>
        <section className="blog-section">
          <div className="blog-section-block">
            <div className="blog-header">
              <h3 className="section-title">블로그 (Blog)</h3>
            </div>
            <div className="board-list">
              {BLOG.slice(0, blogItemsToShow).map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                  <BoardItem item={item} />
                </ScrollReveal>
              ))}
              {BLOG.length > blogItemsToShow && (
                <ScrollReveal direction="up" delay={blogItemsToShow * 100}>
                  <button 
                    className="blog-more-button-inline"
                    onClick={() => navigate('/blog')}
                  >
                    더보기 →
                  </button>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 메인 컨텐츠 3단 레이아웃 */}
      <section className="main-content">
          {/* 좌측 열 */}
          <div className="column left-column">
            {/* 일반 성향 */}
            <ScrollReveal direction="right" delay={0}>
              <div className="section-block">
                <h3 className="section-title">일반 성향 (General Tendencies)</h3>
                <div className="tendencies-list">
                  {GENERAL_TENDENCIES.map((item, idx) => (
                    <TendencyItem key={idx} item={item} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 취미 */}
            <ScrollReveal direction="right" delay={100}>
              <div className="section-block">
                <h3 className="section-title">취미 (Hobbies)</h3>
                <div className="hobbies-grid">
                  {HOBBIES.map((hobby, idx) => (
                    <HobbyItem key={idx} hobby={hobby} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 언어 능력 */}
            <ScrollReveal direction="right" delay={200}>
              <div className="section-block">
                <h3 className="section-title">언어 능력 (Language Skills)</h3>
                <div className="language-skills">
                  <div className="language-group">
                    <div className="language-group-header">
                      <span className="flag">🇰🇷</span>
                      <span className="language-group-title">{LANGUAGE_SKILLS.korean.title}</span>
                    </div>
                    {LANGUAGE_SKILLS.korean.content.map((skill, idx) => (
                      <SkillItem key={idx} skill={skill} maxLevel={5} />
                    ))}
                  </div>
                  <div className="language-group">
                    <div className="language-group-header">
                      <span className="flag">🇺🇸</span>
                      <span className="language-group-title">{LANGUAGE_SKILLS.english.title}</span>
                    </div>
                    {LANGUAGE_SKILLS.english.content.map((skill, idx) => (
                      <SkillItem key={idx} skill={skill} maxLevel={5} />
                    ))}
                  </div>
                  <div className="language-group">
                    <div className="language-group-header">
                      <span className="flag">🇯🇵</span>
                      <span className="language-group-title">{LANGUAGE_SKILLS.japanese.title}</span>
                    </div>
                    {LANGUAGE_SKILLS.japanese.content.map((skill, idx) => (
                      <SkillItem key={idx} skill={skill} maxLevel={5} />
                    ))}
                  </div>
                  <div className="language-group">
                    <div className="language-group-header">
                      <span className="flag">🌐</span>
                      <span className="language-group-title">{LANGUAGE_SKILLS.other.title}</span>
                    </div>
                    {LANGUAGE_SKILLS.other.content.map((skill, idx) => (
                      <SkillItem key={idx} skill={skill} maxLevel={6} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 중앙 열 */}
          <div className="column center-column">
            {/* 기본 능력 */}
            <ScrollReveal direction="up" delay={0}>
              <div className="section-block">
                <h3 className="section-title">기본 능력 (Basic Abilities)</h3>
                <div className="abilities-list">
                  {BASIC_ABILITIES.map((ability, idx) => (
                    <AbilityItem key={idx} ability={ability} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 업무 스킬 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="section-block">
                <h3 className="section-title">업무 스킬 (Work Skills)</h3>
                
                <div className="work-skill-group">
                  <h4 className="work-skill-title">{WORK_SKILLS.teamLeading.title} (Team Leading)</h4>
                  {WORK_SKILLS.teamLeading.content.map((skill, idx) => (
                    <SkillItem key={idx} skill={skill} maxLevel={5} clickable={true} />
                  ))}
                </div>

                <div className="work-skill-group">
                  <h4 className="work-skill-title">{WORK_SKILLS.planning.title} (Planning)</h4>
                  {WORK_SKILLS.planning.content.map((skill, idx) => (
                    <SkillItem key={idx} skill={skill} maxLevel={5} clickable={true} />
                  ))}
                </div>

                <div className="work-skill-group">
                  <h4 className="work-skill-title">{WORK_SKILLS.editing.title} (Editing)</h4>
                  {WORK_SKILLS.editing.content.map((skill, idx) => (
                    <SkillItem key={idx} skill={skill} maxLevel={5} clickable={true} />
                  ))}
                </div>

                <div className="work-skill-group">
                  <h4 className="work-skill-title">{WORK_SKILLS.development.title} (Development)</h4>
                  {WORK_SKILLS.development.content.map((skill, idx) => (
                    <SkillItem key={idx} skill={skill} maxLevel={5} clickable={true} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 우측 열 */}
          <div className="column right-column">
            {/* 기피하는 것 */}
            <ScrollReveal direction="left" delay={0}>
              <div className="section-block">
                <h3 className="section-title">기피하는 것 (Things to Avoid)</h3>
                <div className="avoid-list">
                  {THINGS_TO_AVOID.join(', ')}
                </div>
              </div>
            </ScrollReveal>

            {/* 현재 상황 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="section-block">
                <h3 className="section-title">현재 상황 (Current Status)</h3>
                <div className="status-list">
                  {CURRENT_STATUS.map((status, idx) => (
                    <StatusItem key={idx} status={status} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
    </>
  )
}

export default Details
