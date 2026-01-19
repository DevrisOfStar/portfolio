import { handlePortfolioRoutes } from './routes/portfolio';
import { handleBlogRoutes } from './routes/blog';

export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;  // Cloudflare R2 버킷 (이미지 저장용)
  ADMIN_API_KEY?: string;  // 관리자 API 키 (로컬 개발용)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Health check
    if (path === '/health' || path === '/') {
      return new Response(JSON.stringify({ status: 'ok', service: 'portfolio-api' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Portfolio routes
    if (path.startsWith('/api/portfolio')) {
      return handlePortfolioRoutes(request, env.DB);
    }

    // Blog routes
    if (path.startsWith('/api/blog')) {
      return handleBlogRoutes(request, env);
    }

    // Image proxy (R2 이미지 제공)
    if (path.startsWith('/images/')) {
      const imageKey = path.replace('/images/', '');
      const object = await env.IMAGES.get(imageKey);
      
      if (object === null) {
        return new Response('Image not found', { status: 404 });
      }
      
      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000', // 1년 캐시
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
