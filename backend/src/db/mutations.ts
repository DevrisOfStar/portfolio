import { BlogContentItem } from './queries';

export interface CreateBlogPostData {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string | null;
  thumbnail: string | null;
  order_index?: number;
}

export interface BlogContentItemInput {
  type: 'text' | 'image' | 'heading' | 'code' | 'quote';
  content: string;
}

/**
 * 블로그 포스트 생성
 */
export async function createBlogPost(
  db: D1Database,
  data: CreateBlogPostData
): Promise<{ success: boolean; error?: string }> {
  try {
    // order_index가 없으면 기존 최대값 + 1로 설정
    let orderIndex = data.order_index;
    if (orderIndex === undefined) {
      const maxResult = await db.prepare('SELECT MAX(order_index) as max_index FROM blog_posts').first<{ max_index: number | null }>();
      orderIndex = (maxResult?.max_index ?? -1) + 1;
    }

    // 블로그 포스트 삽입
    await db.prepare(
      'INSERT INTO blog_posts (id, date, category, title, content, thumbnail, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(data.id, data.date, data.category, data.title, data.content, data.thumbnail, orderIndex)
      .run();

    return { success: true };
  } catch (error: any) {
    // SQLite 에러 코드 2067은 UNIQUE constraint violation
    if (error?.code === 2067 || error?.message?.includes('UNIQUE constraint')) {
      return { success: false, error: `Blog post with id "${data.id}" already exists` };
    }
    console.error('Error creating blog post:', error);
    return { success: false, error: error?.message || 'Failed to create blog post' };
  }
}

/**
 * 블로그 콘텐츠 아이템 추가
 */
export async function addBlogContentItems(
  db: D1Database,
  blogPostId: string,
  items: BlogContentItemInput[]
): Promise<{ success: boolean; error?: string }> {
  try {
    // 블로그 포스트 존재 확인
    const postExists = await db.prepare('SELECT id FROM blog_posts WHERE id = ?').bind(blogPostId).first();
    if (!postExists) {
      return { success: false, error: `Blog post with id "${blogPostId}" not found` };
    }

    // 기존 최대 order_index 가져오기
    const maxResult = await db.prepare(
      'SELECT MAX(order_index) as max_index FROM blog_content_items WHERE blog_post_id = ?'
    )
      .bind(blogPostId)
      .first<{ max_index: number | null }>();
    
    let startIndex = (maxResult?.max_index ?? -1) + 1;

    // 각 아이템의 타입 검증
    const validTypes = ['text', 'image', 'heading', 'code', 'quote'];
    for (const item of items) {
      if (!validTypes.includes(item.type)) {
        return { success: false, error: `Invalid content type: ${item.type}. Valid types: ${validTypes.join(', ')}` };
      }
    }

    // 트랜잭션으로 모든 아이템 삽입
    const statements = items.map((item, index) => {
      return db.prepare(
        'INSERT INTO blog_content_items (blog_post_id, type, content, order_index) VALUES (?, ?, ?, ?)'
      ).bind(blogPostId, item.type, item.content, startIndex + index);
    });

    await db.batch(statements);

    return { success: true };
  } catch (error: any) {
    console.error('Error adding blog content items:', error);
    return { success: false, error: error?.message || 'Failed to add blog content items' };
  }
}

/**
 * 블로그 포스트와 콘텐츠 아이템을 함께 생성
 */
export async function createBlogPostWithItems(
  db: D1Database,
  postData: CreateBlogPostData,
  items: BlogContentItemInput[]
): Promise<{ success: boolean; error?: string }> {
  // 먼저 블로그 포스트 생성
  const postResult = await createBlogPost(db, postData);
  if (!postResult.success) {
    return postResult;
  }

  // 콘텐츠 아이템이 있으면 추가
  if (items.length > 0) {
    const itemsResult = await addBlogContentItems(db, postData.id, items);
    if (!itemsResult.success) {
      // 포스트는 생성되었지만 아이템 추가 실패
      // 롤백은 하지 않고 에러만 반환 (수동으로 삭제 필요)
      return { success: false, error: `Post created but failed to add items: ${itemsResult.error}` };
    }
  }

  return { success: true };
}
