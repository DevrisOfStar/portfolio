// 보안 미들웨어 함수들
import type { Env } from '../index';

export interface AuthResult {
  authorized: boolean;
  error?: string;
}

/**
 * API 키 검증
 * 로컬 개발 환경에서만 사용
 */
export function verifyApiKey(request: Request, env: Env): AuthResult {
  // 환경 변수에서 API 키 가져오기
  const expectedApiKey = env.ADMIN_API_KEY;
  
  if (!expectedApiKey) {
    return {
      authorized: false,
      error: 'ADMIN_API_KEY not configured'
    };
  }

  // 요청 헤더에서 API 키 가져오기
  const providedApiKey = request.headers.get('X-API-Key');
  
  if (!providedApiKey) {
    return {
      authorized: false,
      error: 'Missing X-API-Key header'
    };
  }

  if (providedApiKey !== expectedApiKey) {
    return {
      authorized: false,
      error: 'Invalid API key'
    };
  }

  return { authorized: true };
}

/**
 * 로컬 환경 체크
 * localhost 또는 127.0.0.1에서만 접근 허용
 */
export function isLocalRequest(request: Request): boolean {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  return hostname === 'localhost' || 
         hostname === '127.0.0.1' || 
         hostname === '[::1]' ||
         hostname.endsWith('.localhost');
}

/**
 * 관리자 API 인증 (로컬 환경 + API 키)
 */
export function authenticateAdmin(request: Request, env: Env): AuthResult {
  // 로컬 환경 체크
  if (!isLocalRequest(request)) {
    return {
      authorized: false,
      error: 'Admin API is only available in local development environment'
    };
  }

  // API 키 검증
  return verifyApiKey(request, env);
}
