import { getBlogPosts, getBlogPost } from '../db/queries';
import { createBlogPost, addBlogContentItems, createBlogPostWithItems } from '../db/mutations';
import { authenticateAdmin } from '../utils/auth';
import { createCorsHeaders, createJsonHeaders } from '../utils/cors';
import type { Env } from '../index';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp']);

function createErrorResponse(error: string, status: number, corsHeaders: Headers): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: createJsonHeaders(corsHeaders),
  });
}

function normalizeUploadPath(pathPrefix: string): string | null {
  const rawPath = pathPrefix.trim().replace(/\\/g, '/');
  const segments = rawPath.split('/').filter(Boolean);

  if (segments.some((segment) => segment === '.' || segment === '..')) {
    return null;
  }

  const sanitizedSegments = segments
    .map((segment) => segment.replace(/[^a-zA-Z0-9_-]/g, '_'))
    .filter(Boolean);

  return sanitizedSegments.length > 0 ? sanitizedSegments.join('/') : 'blog';
}

function getSafeFileName(originalName: string): { fileName: string; extension: string | null } {
  const baseName = originalName.replace(/\\/g, '/').split('/').pop() || 'image';
  const extension = baseName.includes('.') ? baseName.split('.').pop()!.toLowerCase() : null;
  const safeName = baseName.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^_+/, '') || 'image';

  return { fileName: safeName, extension };
}

export async function handleBlogRoutes(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const corsHeaders = createCorsHeaders(request, env, {
    methods: 'GET, POST, OPTIONS',
    headers: 'Content-Type, X-API-Key',
  });

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // GET 요청 처리
    if (request.method === 'GET') {
      // Blog list
      if (path === '/api/blog' || path === '/api/blog/') {
        const category = url.searchParams.get('category');
        const search = url.searchParams.get('search');
        
        const data = await getBlogPosts(env.DB, category || undefined, search || undefined);
        return new Response(JSON.stringify(data), {
          headers: createJsonHeaders(corsHeaders),
        });
      }

      // Blog detail
      const blogDetailMatch = path.match(/^\/api\/blog\/([^\/]+)$/);
      if (blogDetailMatch) {
        const id = blogDetailMatch[1];
        const data = await getBlogPost(env.DB, id);
        
        if (!data) {
          return new Response('Not Found', { status: 404, headers: corsHeaders });
        }
        
        return new Response(JSON.stringify(data), {
          headers: createJsonHeaders(corsHeaders),
        });
      }
    }

    // POST 요청 처리 (관리자 API)
    if (request.method === 'POST') {
      // 인증 확인
      const auth = authenticateAdmin(request, env);
      if (!auth.authorized) {
        return createErrorResponse(auth.error || 'Unauthorized', 401, corsHeaders);
      }

      // 블로그 포스트 생성
      if (path === '/api/blog' || path === '/api/blog/') {
        const body = await request.json() as {
          id: string;
          date: string;
          category: string;
          title: string;
          content?: string | null;
          thumbnail?: string | null;
          order_index?: number;
          items?: Array<{ type: string; content: string }>;
        };

        // 필수 필드 검증
        if (!body.id || !body.date || !body.category || !body.title) {
          return createErrorResponse('Missing required fields: id, date, category, title', 400, corsHeaders);
        }

        // items가 있으면 함께 생성, 없으면 포스트만 생성
        if (body.items && body.items.length > 0) {
          // 타입 검증 및 변환
          const validTypes = ['text', 'image', 'heading', 'code', 'quote'];
          const items = body.items.map(item => {
            if (!validTypes.includes(item.type)) {
              throw new Error(`Invalid content type: ${item.type}`);
            }
            return {
              type: item.type as 'text' | 'image' | 'heading' | 'code' | 'quote',
              content: item.content
            };
          });

          const result = await createBlogPostWithItems(env.DB, {
            id: body.id,
            date: body.date,
            category: body.category,
            title: body.title,
            content: body.content || null,
            thumbnail: body.thumbnail || null,
            order_index: body.order_index,
          }, items);

          if (!result.success) {
            return createErrorResponse(result.error || 'Failed to create blog post', 400, corsHeaders);
          }
        } else {
          const result = await createBlogPost(env.DB, {
            id: body.id,
            date: body.date,
            category: body.category,
            title: body.title,
            content: body.content || null,
            thumbnail: body.thumbnail || null,
            order_index: body.order_index,
          });

          if (!result.success) {
            return createErrorResponse(result.error || 'Failed to create blog post', 400, corsHeaders);
          }
        }

        return new Response(JSON.stringify({ success: true, id: body.id }), {
          status: 201,
          headers: createJsonHeaders(corsHeaders),
        });
      }

      // 블로그 콘텐츠 아이템 추가
      const itemsMatch = path.match(/^\/api\/blog\/([^\/]+)\/items$/);
      if (itemsMatch) {
        const blogPostId = itemsMatch[1];
        const body = await request.json() as {
          items: Array<{ type: string; content: string }>;
        };

        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
          return createErrorResponse('items array is required and must not be empty', 400, corsHeaders);
        }

        // 타입 검증 및 변환
        const validTypes = ['text', 'image', 'heading', 'code', 'quote'];
        const items = body.items.map(item => {
          if (!validTypes.includes(item.type)) {
            throw new Error(`Invalid content type: ${item.type}`);
          }
          return {
            type: item.type as 'text' | 'image' | 'heading' | 'code' | 'quote',
            content: item.content
          };
        });

        const result = await addBlogContentItems(env.DB, blogPostId, items);

        if (!result.success) {
          return createErrorResponse(result.error || 'Failed to add blog content items', 400, corsHeaders);
        }

        return new Response(JSON.stringify({ success: true, blogPostId }), {
          status: 201,
          headers: createJsonHeaders(corsHeaders),
        });
      }

      // 이미지 업로드
      if (path === '/api/blog/images' || path === '/api/blog/images/') {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File | null;
        const pathPrefix = formData.get('path') as string | null || 'blog';

        if (!imageFile) {
          return createErrorResponse('image file is required', 400, corsHeaders);
        }

        if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
          return createErrorResponse('Unsupported image type', 400, corsHeaders);
        }

        if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
          return createErrorResponse('Image file must be 5MB or smaller', 413, corsHeaders);
        }

        const normalizedPath = normalizeUploadPath(pathPrefix);
        if (!normalizedPath) {
          return createErrorResponse('Invalid upload path', 400, corsHeaders);
        }

        // 파일명 생성 (타임스탬프 + 원본 파일명)
        const timestamp = Date.now();
        const originalName = imageFile.name || 'image';
        const { fileName: safeFileName, extension } = getSafeFileName(originalName);
        if (!extension || !ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
          return createErrorResponse('Unsupported image extension', 400, corsHeaders);
        }

        const fileName = `${normalizedPath}/${timestamp}-${safeFileName}`;

        // R2에 업로드
        try {
          await env.IMAGES.put(fileName, imageFile, {
            httpMetadata: {
              contentType: imageFile.type,
            },
          });

          // R2 URL 생성 (실제 배포 시 커스텀 도메인 사용 가능)
          // 로컬 개발 환경에서는 Workers를 통해 접근하거나 R2 직접 URL 사용
          const imageUrl = `/images/${fileName}`; // Workers 프록시를 통해 접근하거나
          // 또는: `https://your-account-id.r2.cloudflarestorage.com/portfolio-images/${fileName}`;

          return new Response(JSON.stringify({ 
            success: true, 
            url: imageUrl,
            fileName 
          }), {
            status: 201,
            headers: createJsonHeaders(corsHeaders),
          });
        } catch (error: any) {
          console.error('Error uploading image:', error);
          return new Response(JSON.stringify({ error: 'Failed to upload image' }), {
            status: 500,
            headers: createJsonHeaders(corsHeaders),
          });
        }
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('Error handling blog route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: createJsonHeaders(corsHeaders),
    });
  }
}
