const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 타임아웃 설정 (10초)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(`API Error: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout: API server did not respond', 0);
    }
    
    throw new ApiError(`Network Error: ${error.message}`, 0);
  }
}

/**
 * 관리자 API 호출 (API 키 포함)
 */
async function fetchAdminApi(endpoint, options = {}, apiKey) {
  if (!apiKey) {
    throw new ApiError('API key is required', 401);
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-API-Key': apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new ApiError(errorData.error || `API Error: ${response.statusText}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network Error: ${error.message}`, 0);
  }
}

export const api = {
  // 전체 포트폴리오 데이터
  getPortfolio: () => fetchApi('/api/portfolio'),
  
  // 블로그 목록
  getBlogPosts: (category, search) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const query = params.toString();
    return fetchApi(`/api/blog${query ? `?${query}` : ''}`);
  },
  
  // 블로그 상세
  getBlogPost: (id) => fetchApi(`/api/blog/${id}`),

  // 관리자 API (블로그 글 작성)
  createBlogPost: async (data, apiKey) => {
    return fetchAdminApi('/api/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    }, apiKey);
  },

  uploadBlogImage: async (file, path = 'blog', apiKey) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('path', path);

    const url = `${API_BASE_URL}/api/blog/images`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new ApiError(errorData.error || `API Error: ${response.statusText}`, response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Network Error: ${error.message}`, 0);
    }
  },
};

export default api;
