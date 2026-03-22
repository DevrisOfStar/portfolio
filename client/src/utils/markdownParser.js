/**
 * 간단한 마크다운 파서 (마크다운을 content items로 변환)
 */
export function parseMarkdownToItems(markdown) {
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

    currentParagraph.push(line)
  }

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
