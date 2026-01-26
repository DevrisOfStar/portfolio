export interface PersonalInfo {
  name: string;
  email: string;
  github: string | null;
  youtube: string | null;
}

export interface IntroStatement {
  statement: string;
}

export interface Career {
  total: string;
  education: string | null;
  details: CareerDetail[];
}

export interface CareerDetail {
  id: string;
  period: string;
  company: string | null;
  content: string | null;
}

export interface GeneralTendency {
  id: string;
  name: string;
  level: number;
}

export interface Hobby {
  id: string;
  name: string;
  image: string | null;
}

export interface LanguageSkill {
  title: string;
  image: string | null;
  content: LanguageSkillItem[];
}

export interface LanguageSkillItem {
  id: string;
  skill: string;
  level: number;
}

export interface BasicAbility {
  id: string;
  name: string;
  level: number;
  content: string | null;
}

export interface WorkSkill {
  title: string;
  image: string | null;
  content: WorkSkillItem[];
}

export interface WorkSkillItem {
  id: string;
  name: string;
  level: number;
  content: string | null;
}

export interface BlogContentItem {
  type: 'text' | 'image' | 'heading' | 'code' | 'quote';
  content: string;
}

export interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  content: string | null;  // 기존 호환성을 위한 필드 (요약 또는 간단한 설명)
  thumbnail: string | null;
  items: BlogContentItem[];  // 실제 콘텐츠 아이템들 (텍스트, 이미지 등)
}

export interface CurrentStatus {
  id: string;
  text: string;
  content: string | null;
  current: number;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  introStatements: string[];
  career: Career;
  generalTendencies: GeneralTendency[];
  hobbies: Hobby[];
  languageSkills: Record<string, LanguageSkill>;
  thingsToAvoid: string[];
  basicAbilities: BasicAbility[];
  workSkills: Record<string, WorkSkill>;
  blog: BlogPost[];
  currentStatus: CurrentStatus[];
}

// Personal Info
export async function getPersonalInfo(db: D1Database): Promise<PersonalInfo | null> {
  const result = await db.prepare('SELECT name, email, github, youtube FROM personal_info LIMIT 1').first<PersonalInfo>();
  return result || null;
}

// Intro Statements
export async function getIntroStatements(db: D1Database): Promise<string[]> {
  const result = await db.prepare('SELECT statement FROM intro_statements ORDER BY order_index').all<{ statement: string }>();
  return result.results.map(r => r.statement);
}

// Career
export async function getCareer(db: D1Database): Promise<Career | null> {
  const careerResult = await db.prepare('SELECT total, education FROM career LIMIT 1').first<{ total: string; education: string | null }>();
  if (!careerResult) return null;

  const detailsResult = await db.prepare('SELECT id, period, company, content FROM career_details ORDER BY order_index').all<CareerDetail>();
  
  return {
    total: careerResult.total,
    education: careerResult.education,
    details: detailsResult.results
  };
}

// General Tendencies
export async function getGeneralTendencies(db: D1Database): Promise<GeneralTendency[]> {
  const result = await db.prepare('SELECT id, name, level FROM general_tendencies ORDER BY order_index').all<GeneralTendency>();
  return result.results;
}

// Hobbies
export async function getHobbies(db: D1Database): Promise<Hobby[]> {
  const result = await db.prepare('SELECT id, name, image FROM hobbies ORDER BY order_index').all<Hobby>();
  return result.results;
}

// Language Skills
export async function getLanguageSkills(db: D1Database): Promise<Record<string, LanguageSkill>> {
  const skillsResult = await db.prepare('SELECT id, title, image FROM language_skills ORDER BY order_index').all<{ id: string; title: string; image: string | null }>();
  const itemsResult = await db.prepare('SELECT id, language_skill_id, skill, level FROM language_skill_items ORDER BY language_skill_id, order_index').all<{ id: string; language_skill_id: string; skill: string; level: number }>();
  
  const skills: Record<string, LanguageSkill> = {};
  
  for (const skill of skillsResult.results) {
    skills[skill.id] = {
      title: skill.title,
      image: skill.image,
      content: itemsResult.results
        .filter(item => item.language_skill_id === skill.id)
        .map(item => ({ id: item.id, skill: item.skill, level: item.level }))
    };
  }
  
  return skills;
}

// Basic Abilities
export async function getBasicAbilities(db: D1Database): Promise<BasicAbility[]> {
  const result = await db.prepare('SELECT id, name, level, content FROM basic_abilities ORDER BY order_index').all<BasicAbility>();
  return result.results;
}

// Work Skills
export async function getWorkSkills(db: D1Database): Promise<Record<string, WorkSkill>> {
  const skillsResult = await db.prepare('SELECT id, title, image FROM work_skills ORDER BY order_index').all<{ id: string; title: string; image: string | null }>();
  const itemsResult = await db.prepare('SELECT id, work_skill_id, name, level, content FROM work_skill_items ORDER BY work_skill_id, order_index').all<{ id: string; work_skill_id: string; name: string; level: number; content: string | null }>();
  
  const skills: Record<string, WorkSkill> = {};
  
  for (const skill of skillsResult.results) {
    skills[skill.id] = {
      title: skill.title,
      image: skill.image,
      content: itemsResult.results
        .filter(item => item.work_skill_id === skill.id)
        .map(item => ({ id: item.id, name: item.name, level: item.level, content: item.content }))
    };
  }
  
  return skills;
}

// Blog Posts
export async function getBlogPosts(db: D1Database, category?: string, search?: string): Promise<BlogPost[]> {
  let query = 'SELECT id, date, category, title, content, thumbnail, created_at FROM blog_posts';
  const conditions: string[] = [];
  const params: any[] = [];
  
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  
  if (search) {
    conditions.push('(title LIKE ? OR content LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  // 날짜 역순 정렬 (최신순): created_at이 있으면 그것을 사용, 없으면 date를 파싱해서 정렬
  query += ' ORDER BY created_at DESC, date DESC';
  
  const stmt = db.prepare(query);
  if (params.length > 0) {
    stmt.bind(...params);
  }
  
  const postsResult = await stmt.all<{ id: string; date: string; category: string; title: string; content: string | null; thumbnail: string | null; created_at: string | null }>();
  
  // N+1 문제 해결: 모든 포스트의 콘텐츠 아이템을 한 번에 가져오기
  if (postsResult.results.length === 0) {
    return [];
  }
  
  // 모든 포스트 ID를 IN 절로 한 번에 조회
  const postIds = postsResult.results.map(p => p.id);
  const placeholders = postIds.map(() => '?').join(',');
  const allContentItems = await db.prepare(
    `SELECT blog_post_id, type, content FROM blog_content_items WHERE blog_post_id IN (${placeholders}) ORDER BY blog_post_id, order_index`
  ).bind(...postIds).all<{ blog_post_id: string; type: string; content: string }>();
  
  // 포스트 ID별로 콘텐츠 아이템 그룹화
  const contentItemsMap = new Map<string, BlogContentItem[]>();
  for (const item of allContentItems.results) {
    if (!contentItemsMap.has(item.blog_post_id)) {
      contentItemsMap.set(item.blog_post_id, []);
    }
    contentItemsMap.get(item.blog_post_id)!.push({
      type: item.type as BlogContentItem['type'],
      content: item.content
    });
  }
  
  // 포스트와 콘텐츠 아이템 결합
  const posts: BlogPost[] = postsResult.results.map(post => ({
    id: post.id,
    date: post.date,
    category: post.category,
    title: post.title,
    content: post.content,
    thumbnail: post.thumbnail,
    items: contentItemsMap.get(post.id) || []
  }));
  
  return posts;
}

export async function getBlogPost(db: D1Database, id: string): Promise<BlogPost | null> {
  const postResult = await db.prepare('SELECT id, date, category, title, content, thumbnail FROM blog_posts WHERE id = ?').bind(id).first<{ id: string; date: string; category: string; title: string; content: string | null; thumbnail: string | null }>();
  
  if (!postResult) {
    return null;
  }
  
  // 인덱스를 활용한 효율적인 조회
  const contentItems = await db.prepare(
    'SELECT type, content FROM blog_content_items WHERE blog_post_id = ? ORDER BY order_index'
  ).bind(id).all<BlogContentItem>();
  
  return {
    id: postResult.id,
    date: postResult.date,
    category: postResult.category,
    title: postResult.title,
    content: postResult.content,
    thumbnail: postResult.thumbnail,
    items: contentItems.results
  };
}

// Current Status
export async function getCurrentStatus(db: D1Database): Promise<CurrentStatus[]> {
  const result = await db.prepare('SELECT id, text, content, current FROM current_status ORDER BY order_index').all<CurrentStatus>();
  return result.results;
}

// Things to Avoid
export async function getThingsToAvoid(db: D1Database): Promise<string[]> {
  const result = await db.prepare('SELECT item FROM things_to_avoid ORDER BY order_index').all<{ item: string }>();
  return result.results.map(r => r.item);
}

// Full Portfolio Data
export async function getFullPortfolio(db: D1Database): Promise<PortfolioData> {
  try {
    const [
      personalInfo,
      introStatements,
      career,
      generalTendencies,
      hobbies,
      languageSkills,
      thingsToAvoid,
      basicAbilities,
      workSkills,
      blog,
      currentStatus
    ] = await Promise.all([
      getPersonalInfo(db),
      getIntroStatements(db),
      getCareer(db),
      getGeneralTendencies(db),
      getHobbies(db),
      getLanguageSkills(db),
      getThingsToAvoid(db),
      getBasicAbilities(db),
      getWorkSkills(db),
      getBlogPosts(db),
      getCurrentStatus(db)
    ]);

    if (!personalInfo || !career) {
      console.error('Missing required data:', { personalInfo: !!personalInfo, career: !!career });
      throw new Error('Portfolio data not found: personalInfo or career is missing');
    }

    return {
      personalInfo,
      introStatements,
      career,
      generalTendencies,
      hobbies,
      languageSkills,
      thingsToAvoid,
      basicAbilities,
      workSkills,
      blog,
      currentStatus
    };
  } catch (error: any) {
    console.error('Error in getFullPortfolio:', error);
    throw error;
  }
}
