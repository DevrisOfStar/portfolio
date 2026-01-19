// API 키 관리 유틸리티
// 난수화된 저장소 키 (로컬 환경에서만 사용)

// 난수화된 키 생성 (로컬 환경 체크와 함께)
const generateStorageKey = () => {
  // 호스트명 기반 해시 생성
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const hash = btoa(hostname + 'portfolio_admin').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  return `pa_${hash}_key`;
};

const API_KEY_STORAGE_KEY = generateStorageKey();

/**
 * 로컬 개발 환경인지 확인
 */
export function isLocalEnvironment() {
  if (typeof window === 'undefined') return false;
  
  // Vite 개발 모드 체크
  if (import.meta.env.DEV) return true;
  
  // 호스트명 체크
  const hostname = window.location.hostname;
  return hostname === 'localhost' || 
         hostname === '127.0.0.1' || 
         hostname === '[::1]' ||
         hostname.endsWith('.localhost');
}

/**
 * API 키 가져오기 (환경 변수 또는 로컬 스토리지)
 * 로컬 환경에서만 작동
 */
export function getApiKey() {
  // 로컬 환경이 아니면 null 반환
  if (!isLocalEnvironment()) {
    console.warn('API key access is only available in local development environment');
    return null;
  }

  // 1. 환경 변수에서 가져오기
  const envKey = import.meta.env.VITE_ADMIN_API_KEY;
  if (envKey) {
    return envKey;
  }

  // 2. 로컬 스토리지에서 가져오기
  try {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      return storedKey;
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }

  return null;
}

/**
 * API 키 저장
 * 로컬 환경에서만 작동
 */
export function setApiKey(apiKey) {
  if (!isLocalEnvironment()) {
    console.warn('API key storage is only available in local development environment');
    return false;
  }

  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    return true;
  } catch (error) {
    console.error('Failed to save API key:', error);
    return false;
  }
}

/**
 * API 키 삭제
 * 로컬 환경에서만 작동
 */
export function removeApiKey() {
  if (!isLocalEnvironment()) {
    return false;
  }

  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to remove API key:', error);
    return false;
  }
}

/**
 * API 키가 설정되어 있는지 확인
 * 로컬 환경에서만 작동
 */
export function hasApiKey() {
  if (!isLocalEnvironment()) {
    return false;
  }
  return getApiKey() !== null;
}
