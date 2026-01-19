import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../../contexts/PortfolioContext'
import TendencyItem from './TendencyItem'
import HobbyItem from './HobbyItem'
import SkillItem from './SkillItem'
import AbilityItem from './AbilityItem'
import BoardItem from './BoardItem'
import StatusItem from './StatusItem'
import ScrollReveal from '../ScrollReveal'
import './Details.css'

function Details() {
  const { data, loading } = usePortfolio()
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

  if (loading) {
    return (
      <section className="main-content">
        <div className="column">로딩 중...</div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="main-content">
        <div className="column">
          <p>데이터를 불러올 수 없습니다.</p>
          <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
            백엔드 서버가 실행 중인지 확인해주세요. (http://localhost:8787)
          </p>
        </div>
      </section>
    )
  }

  const {
    generalTendencies = [],
    hobbies = [],
    languageSkills = {},
    thingsToAvoid = [],
    basicAbilities = [],
    workSkills = {},
    blog = [],
    currentStatus = []
  } = data


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
              {blog && blog.length > 0 ? (
                <>
                  {blog.slice(0, blogItemsToShow).map((item) => (
                    <ScrollReveal key={item.id || Math.random()} direction="up" delay={100}>
                      <BoardItem item={item} />
                    </ScrollReveal>
                  ))}
                  {blog.length > blogItemsToShow && (
                    <ScrollReveal direction="up" delay={blogItemsToShow * 100}>
                      <button 
                        className="blog-more-button-inline"
                        onClick={() => navigate('/blog')}
                      >
                        더보기 →
                      </button>
                    </ScrollReveal>
                  )}
                </>
              ) : (
                <p>블로그 글이 없습니다.</p>
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
                  {generalTendencies.map((item, idx) => (
                    <TendencyItem key={item.id || idx} item={item} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 취미 */}
            <ScrollReveal direction="right" delay={100}>
              <div className="section-block">
                <h3 className="section-title">취미 (Hobbies)</h3>
                <div className="hobbies-grid">
                  {hobbies.map((hobby, idx) => (
                    <HobbyItem key={hobby.id || idx} hobby={hobby} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 언어 능력 */}
            <ScrollReveal direction="right" delay={200}>
              <div className="section-block">
                <h3 className="section-title">언어 능력 (Language Skills)</h3>
                <div className="language-skills">
                  {languageSkills.korean && (
                    <div className="language-group">
                      <div className="language-group-header">
                        <span className="flag">🇰🇷</span>
                        <span className="language-group-title">{languageSkills.korean.title}</span>
                      </div>
                      {languageSkills.korean.content.map((skill, idx) => (
                        <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} />
                      ))}
                    </div>
                  )}
                  {languageSkills.english && (
                    <div className="language-group">
                      <div className="language-group-header">
                        <span className="flag">🇺🇸</span>
                        <span className="language-group-title">{languageSkills.english.title}</span>
                      </div>
                      {languageSkills.english.content.map((skill, idx) => (
                        <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} />
                      ))}
                    </div>
                  )}
                  {languageSkills.japanese && (
                    <div className="language-group">
                      <div className="language-group-header">
                        <span className="flag">🇯🇵</span>
                        <span className="language-group-title">{languageSkills.japanese.title}</span>
                      </div>
                      {languageSkills.japanese.content.map((skill, idx) => (
                        <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} />
                      ))}
                    </div>
                  )}
                  {languageSkills.other && (
                    <div className="language-group">
                      <div className="language-group-header">
                        <span className="flag">🌐</span>
                        <span className="language-group-title">{languageSkills.other.title}</span>
                      </div>
                      {languageSkills.other.content.map((skill, idx) => (
                        <SkillItem key={skill.id || idx} skill={skill} maxLevel={6} />
                      ))}
                    </div>
                  )}
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
                  {basicAbilities.map((ability, idx) => (
                    <AbilityItem key={ability.id || idx} ability={ability} />
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 업무 스킬 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="section-block">
                <h3 className="section-title">업무 스킬 (Work Skills)</h3>
                
                {workSkills.teamLeading && (
                  <div className="work-skill-group">
                    <h4 className="work-skill-title">{workSkills.teamLeading.title} (Team Leading)</h4>
                    {workSkills.teamLeading.content.map((skill, idx) => (
                      <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} clickable={true} />
                    ))}
                  </div>
                )}

                {workSkills.planning && (
                  <div className="work-skill-group">
                    <h4 className="work-skill-title">{workSkills.planning.title} (Planning)</h4>
                    {workSkills.planning.content.map((skill, idx) => (
                      <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} clickable={true} />
                    ))}
                  </div>
                )}

                {workSkills.editing && (
                  <div className="work-skill-group">
                    <h4 className="work-skill-title">{workSkills.editing.title} (Editing)</h4>
                    {workSkills.editing.content.map((skill, idx) => (
                      <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} clickable={true} />
                    ))}
                  </div>
                )}

                {workSkills.development && (
                  <div className="work-skill-group">
                    <h4 className="work-skill-title">{workSkills.development.title} (Development)</h4>
                    {workSkills.development.content.map((skill, idx) => (
                      <SkillItem key={skill.id || idx} skill={skill} maxLevel={5} clickable={true} />
                    ))}
                  </div>
                )}
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
                  {thingsToAvoid.join(', ')}
                </div>
              </div>
            </ScrollReveal>

            {/* 현재 상황 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="section-block">
                <h3 className="section-title">현재 상황 (Current Status)</h3>
                <div className="status-list">
                  {currentStatus.map((status, idx) => (
                    <StatusItem key={status.id || idx} status={status} />
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
