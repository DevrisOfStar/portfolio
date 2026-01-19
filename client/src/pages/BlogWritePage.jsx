import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { getApiKey, setApiKey, isLocalEnvironment } from '../utils/apiKey'
import './BlogWritePage.css'

const CATEGORIES = ['개발', '기획', '번역', '기여', '커뮤니티']

// 간단한 마크다운 파서 (마크다운을 content items로 변환)
function parseMarkdownToItems(markdown) {
  if (!markdown.trim()) return []
  
  const lines = markdown.split('\n')
  const items = []
  let currentParagraph = []
  let currentCodeBlock = []
  let inCodeBlock = false
  let codeLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // 코드 블록 처리
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // 코드 블록 종료
        if (currentCodeBlock.length > 0) {
          items.push({
            type: 'code',
            content: currentCodeBlock.join('\n')
          })
        }
        currentCodeBlock = []
        inCodeBlock = false
        codeLanguage = ''
      } else {
        // 코드 블록 시작
        if (currentParagraph.length > 0) {
          items.push({
            type: 'text',
            content: currentParagraph.join('\n')
          })
          currentParagraph = []
        }
        codeLanguage = line.slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line)
      continue
    }

    // 제목 처리
    if (line.startsWith('# ')) {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      items.push({
        type: 'heading',
        content: line.slice(2).trim()
      })
      continue
    }

    if (line.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      items.push({
        type: 'heading',
        content: line.slice(3).trim()
      })
      continue
    }

    if (line.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      items.push({
        type: 'heading',
        content: line.slice(4).trim()
      })
      continue
    }

    // 인용문 처리
    if (line.startsWith('> ')) {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      items.push({
        type: 'quote',
        content: line.slice(2).trim()
      })
      continue
    }

    // 이미지 처리 (![alt](url))
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      items.push({
        type: 'image',
        content: imageMatch[2]
      })
      continue
    }

    // 빈 줄 처리
    if (line.trim() === '') {
      if (currentParagraph.length > 0) {
        items.push({
          type: 'text',
          content: currentParagraph.join('\n')
        })
        currentParagraph = []
      }
      continue
    }

    // 일반 텍스트
    currentParagraph.push(line)
  }

  // 남은 내용 처리
  if (inCodeBlock && currentCodeBlock.length > 0) {
    items.push({
      type: 'code',
      content: currentCodeBlock.join('\n')
    })
  } else if (currentParagraph.length > 0) {
    items.push({
      type: 'text',
      content: currentParagraph.join('\n')
    })
  }

  return items
}

function BlogWritePage() {
  const navigate = useNavigate()
  
  // 로컬 환경 체크
  const [isLocal, setIsLocal] = useState(false)

  // 기본 정보 상태
  const [blogId, setBlogId] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('개발')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  // UI 상태
  const [apiKey, setApiKeyState] = useState('')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // 초기화
  useEffect(() => {
    // 로컬 환경 체크
    const local = isLocalEnvironment()
    setIsLocal(local)

    // 로컬 환경이 아니면 블로그 목록으로 리다이렉트
    if (!local) {
      navigate('/blog', { replace: true })
      return
    }

    const key = getApiKey()
    if (!key) {
      setShowApiKeyModal(true)
    } else {
      setApiKeyState(key)
    }

    // 오늘 날짜를 기본값으로 설정 (YY.MM.DD 형식)
    const today = new Date()
    const year = today.getFullYear().toString().slice(-2)
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    setDate(`${year}.${month}.${day}`)
  }, [navigate])

  // 블로그 ID 자동 생성
  const generateBlogId = () => {
    const today = new Date()
    const year = today.getFullYear().toString().slice(-2)
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const timestamp = Date.now().toString().slice(-6)
    return `blog-${year}${month}${day}-${timestamp}`
  }

  // API 키 저장
  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim())
      setApiKeyState(apiKey.trim())
      setShowApiKeyModal(false)
    }
  }

  // 썸네일 파일 선택
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 이미지 업로드
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !apiKey) {
      setError('이미지 파일과 API 키가 필요합니다')
      return
    }

    setUploadingImage(true)
    setError('')

    try {
      const result = await api.uploadBlogImage(file, 'blog', apiKey)
      const imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}${result.url}`
      
      // 마크다운에 이미지 삽입
      const imageMarkdown = `![${file.name}](${imageUrl})\n`
      const cursorPos = e.target.selectionStart || markdown.length
      const newMarkdown = markdown.slice(0, cursorPos) + imageMarkdown + markdown.slice(cursorPos)
      setMarkdown(newMarkdown)
      
      setSuccess('이미지가 업로드되었습니다')
    } catch (err) {
      setError(`이미지 업로드 실패: ${err.message}`)
    } finally {
      setUploadingImage(false)
    }
  }

  // 썸네일 업로드
  const uploadThumbnail = async () => {
    if (!thumbnailFile || !apiKey) {
      setError('썸네일 파일과 API 키가 필요합니다')
      return
    }

    try {
      const result = await api.uploadBlogImage(thumbnailFile, 'blog/thumbnails', apiKey)
      const imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}${result.url}`
      setThumbnail(imageUrl)
      setSuccess('썸네일이 업로드되었습니다')
    } catch (err) {
      setError(`썸네일 업로드 실패: ${err.message}`)
    }
  }

  // 폼 검증
  const validateForm = () => {
    if (!blogId.trim()) {
      setError('블로그 ID를 입력하세요')
      return false
    }
    if (!date.trim()) {
      setError('날짜를 입력하세요')
      return false
    }
    if (!category) {
      setError('카테고리를 선택하세요')
      return false
    }
    if (!title.trim()) {
      setError('제목을 입력하세요')
      return false
    }
    if (!markdown.trim()) {
      setError('내용을 입력하세요')
      return false
    }
    return true
  }

  // 발행 (저장)
  const handlePublish = async () => {
    if (!validateForm()) return
    if (!apiKey) {
      setShowApiKeyModal(true)
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      // 썸네일이 파일로 업로드되지 않았으면 먼저 업로드
      let finalThumbnail = thumbnail
      if (thumbnailFile && !thumbnail) {
        const thumbResult = await api.uploadBlogImage(thumbnailFile, 'blog/thumbnails', apiKey)
        finalThumbnail = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}${thumbResult.url}`
      }

      // 마크다운을 content items로 변환
      const contentItems = parseMarkdownToItems(markdown)

      // 블로그 포스트 생성
      const postData = {
        id: blogId,
        date,
        category,
        title,
        content: summary || null,
        thumbnail: finalThumbnail || null,
        items: contentItems
      }

      await api.createBlogPost(postData, apiKey)
      
      setSuccess('블로그 글이 성공적으로 발행되었습니다!')
      setTimeout(() => {
        navigate('/blog')
      }, 2000)
    } catch (err) {
      setError(`발행 실패: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 초안 저장 (로컬 스토리지)
  const handleSaveDraft = () => {
    const draft = {
      blogId,
      date,
      category,
      title,
      summary,
      markdown,
      thumbnail,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem('blog_draft', JSON.stringify(draft))
    setSuccess('초안이 저장되었습니다')
  }

  // 초안 불러오기
  const loadDraft = () => {
    const draft = localStorage.getItem('blog_draft')
    if (draft) {
      const parsed = JSON.parse(draft)
      setBlogId(parsed.blogId || '')
      setDate(parsed.date || '')
      setCategory(parsed.category || '개발')
      setTitle(parsed.title || '')
      setSummary(parsed.summary || '')
      setMarkdown(parsed.markdown || '')
      setThumbnail(parsed.thumbnail || '')
      setSuccess('초안을 불러왔습니다')
    }
  }

  // 마크다운 미리보기 렌더링
  const renderMarkdownPreview = () => {
    const items = parseMarkdownToItems(markdown)
    return (
      <div className="markdown-preview">
        {items.map((item, idx) => {
          switch (item.type) {
            case 'heading':
              return <h2 key={idx}>{item.content}</h2>
            case 'code':
              return (
                <pre key={idx}><code>{item.content}</code></pre>
              )
            case 'quote':
              return <blockquote key={idx}>{item.content}</blockquote>
            case 'image':
              return <img key={idx} src={item.content} alt="" style={{ maxWidth: '100%' }} />
            case 'text':
            default:
              return <p key={idx}>{item.content}</p>
          }
        })}
      </div>
    )
  }

  // 로컬 환경이 아니면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!isLocal) {
    return null
  }

  return (
    <div className="blog-write-page">
      {/* API 키 입력 모달 */}
      {showApiKeyModal && (
        <div className="modal-overlay" onClick={() => setShowApiKeyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>API 키 입력</h3>
            <p>블로그 글을 작성하려면 API 키가 필요합니다.</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              placeholder="API 키를 입력하세요"
              className="api-key-input"
              onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
            />
            <div className="modal-actions">
              <button onClick={handleApiKeySubmit} className="btn btn-primary">
                확인
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="blog-write-container">
        <div className="blog-write-header">
          <button onClick={() => navigate('/blog')} className="back-button">
            ← Back to Blog
          </button>
          <h1>블로그 글 작성</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        {/* 기본 정보 */}
        <section className="blog-write-section">
          <h2>기본 정보</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>블로그 ID</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={blogId}
                  onChange={(e) => setBlogId(e.target.value)}
                  placeholder="blog-16"
                />
                <button 
                  type="button"
                  onClick={() => setBlogId(generateBlogId())}
                  className="btn btn-small"
                >
                  자동생성
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>날짜</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="24.01.20"
              />
            </div>

            <div className="form-group">
              <label>카테고리</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="블로그 제목을 입력하세요"
              />
            </div>

            <div className="form-group form-group-full">
              <label>요약/설명</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="블로그 요약 또는 설명을 입력하세요"
                rows="2"
              />
            </div>

            <div className="form-group form-group-full">
              <label>썸네일</label>
              <div className="thumbnail-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  id="thumbnail-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="thumbnail-upload" className="btn btn-secondary">
                  파일 선택
                </label>
                {thumbnailFile && (
                  <>
                    <button onClick={uploadThumbnail} className="btn btn-primary">
                      업로드
                    </button>
                    {thumbnailPreview && (
                      <img src={thumbnailPreview} alt="Thumbnail preview" className="thumbnail-preview" />
                    )}
                  </>
                )}
                {thumbnail && !thumbnailPreview && (
                  <img src={thumbnail} alt="Thumbnail" className="thumbnail-preview" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 마크다운 에디터 */}
        <section className="blog-write-section">
          <div className="section-header">
            <h2>내용 (마크다운)</h2>
            <div className="editor-actions">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
                style={{ display: 'none' }}
                disabled={uploadingImage}
              />
              <label htmlFor="image-upload" className="btn btn-small btn-outline">
                {uploadingImage ? '업로드 중...' : '📷 이미지 업로드'}
              </label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn btn-small btn-outline"
              >
                {showPreview ? '✏️ 편집' : '👁️ 미리보기'}
              </button>
            </div>
          </div>

          {showPreview ? (
            <div className="markdown-editor-container">
              <div className="markdown-preview-container">
                {renderMarkdownPreview()}
              </div>
            </div>
          ) : (
            <div className="markdown-editor-container">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="# 제목&#10;&#10;내용을 마크다운 형식으로 작성하세요.&#10;&#10;## 지원 기능&#10;- 제목 (#, ##, ###)&#10;- 코드 블록 (```)&#10;- 인용문 (>)&#10;- 이미지 (![alt](url))"
                className="markdown-editor"
                rows={20}
              />
              <div className="markdown-help">
                <strong>마크다운 가이드:</strong>
                <ul>
                  <li><code># 제목</code> - 제목</li>
                  <li><code>```코드```</code> - 코드 블록</li>
                  <li><code>&gt; 인용문</code> - 인용문</li>
                  <li><code>![alt](url)</code> - 이미지 (이미지 업로드 버튼 사용 권장)</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* 액션 버튼 */}
        <div className="blog-write-actions">
          <button onClick={() => navigate('/blog')} className="btn btn-secondary">
            취소
          </button>
          <div className="action-buttons-right">
            <button onClick={loadDraft} className="btn btn-outline">
              초안 불러오기
            </button>
            <button onClick={handleSaveDraft} className="btn btn-outline">
              초안 저장
            </button>
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="btn btn-primary btn-large"
            >
              {isSubmitting ? '발행 중...' : '발행'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogWritePage
