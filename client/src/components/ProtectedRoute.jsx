import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLocalEnvironment } from '../utils/apiKey'

/**
 * 로컬 환경에서만 자식 컴포넌트를 렌더링하고, 그 외에는 /blog로 리다이렉트합니다.
 */
export function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLocalEnvironment()) {
      navigate('/blog', { replace: true })
    }
  }, [navigate])

  if (!isLocalEnvironment()) {
    return null
  }

  return children
}
