import React from 'react'
import PropTypes from 'prop-types'

export function DetailBlog({ item }) {
  return (
    <div className="detail-content blog-detail-content">
      {item.title && <h2>{item.title}</h2>}
      {item.items && item.items.length > 0 && (
        <div className="blog-content-items">
          {item.items.map((contentItem, idx) => {
            const itemKey = contentItem.id ?? `blog-${idx}-${contentItem.type}`
            switch (contentItem.type) {
              case 'heading':
                return (
                  <h3 key={itemKey} style={{ marginTop: '24px', marginBottom: '12px' }}>
                    {contentItem.content}
                  </h3>
                )
              case 'code':
                return (
                  <pre
                    key={itemKey}
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '16px',
                      borderRadius: '6px',
                      overflow: 'auto',
                      margin: '16px 0'
                    }}
                  >
                    <code>{contentItem.content}</code>
                  </pre>
                )
              case 'quote':
                return (
                  <blockquote
                    key={itemKey}
                    style={{
                      borderLeft: '4px solid var(--text-accent)',
                      paddingLeft: '16px',
                      margin: '16px 0',
                      fontStyle: 'italic',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {contentItem.content}
                  </blockquote>
                )
              case 'image':
                return (
                  <div key={itemKey} style={{ margin: '16px 0' }}>
                    <img
                      src={contentItem.content}
                      alt={contentItem.alt ?? '블로그 이미지'}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                )
              case 'text':
              default:
                return (
                  <p key={itemKey} style={{ margin: '12px 0', lineHeight: '1.8' }}>
                    {contentItem.content.split('\n').map((line, lineIdx) => (
                      <React.Fragment key={lineIdx}>
                        {line}
                        {lineIdx < contentItem.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                )
            }
          })}
        </div>
      )}
    </div>
  )
}

DetailBlog.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        content: PropTypes.string,
        id: PropTypes.string,
        alt: PropTypes.string
      })
    )
  }).isRequired
}
