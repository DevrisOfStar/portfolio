-- ============================================
-- 데이터베이스 초기 설정 및 최적화
-- ============================================
-- 이 파일은 스키마 생성 후 실행하는 초기 설정 파일입니다.
-- 인덱스, 트리거, FTS 테이블 생성 및 초기 데이터 삽입을 포함합니다.
-- ============================================

-- ============================================
-- 1. 인덱스 생성 (쿼리 성능 최적화)
-- ============================================

-- 1.1 외래키 컬럼 인덱스 (JOIN 성능 향상)
CREATE INDEX IF NOT EXISTS idx_career_details_career_id ON career_details(career_id);
CREATE INDEX IF NOT EXISTS idx_language_skill_items_language_skill_id ON language_skill_items(language_skill_id);
CREATE INDEX IF NOT EXISTS idx_work_skill_items_work_skill_id ON work_skill_items(work_skill_id);
CREATE INDEX IF NOT EXISTS idx_blog_content_items_blog_post_id ON blog_content_items(blog_post_id);

-- 1.2 ORDER BY에 사용되는 order_index 인덱스
CREATE INDEX IF NOT EXISTS idx_intro_statements_order_index ON intro_statements(order_index);
CREATE INDEX IF NOT EXISTS idx_career_details_order_index ON career_details(order_index);
CREATE INDEX IF NOT EXISTS idx_general_tendencies_order_index ON general_tendencies(order_index);
CREATE INDEX IF NOT EXISTS idx_hobbies_order_index ON hobbies(order_index);
CREATE INDEX IF NOT EXISTS idx_language_skills_order_index ON language_skills(order_index);
CREATE INDEX IF NOT EXISTS idx_basic_abilities_order_index ON basic_abilities(order_index);
CREATE INDEX IF NOT EXISTS idx_work_skills_order_index ON work_skills(order_index);
CREATE INDEX IF NOT EXISTS idx_current_status_order_index ON current_status(order_index);
CREATE INDEX IF NOT EXISTS idx_things_to_avoid_order_index ON things_to_avoid(order_index);

-- 1.3 복합 인덱스 (WHERE + ORDER BY 조합)
CREATE INDEX IF NOT EXISTS idx_language_skill_items_skill_order ON language_skill_items(language_skill_id, order_index);
CREATE INDEX IF NOT EXISTS idx_work_skill_items_skill_order ON work_skill_items(work_skill_id, order_index);
CREATE INDEX IF NOT EXISTS idx_blog_content_items_post_order ON blog_content_items(blog_post_id, order_index);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_created ON blog_posts(category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at_date ON blog_posts(created_at DESC, date DESC);

-- ============================================
-- 2. updated_at 자동 업데이트 트리거
-- ============================================

CREATE TRIGGER IF NOT EXISTS update_personal_info_timestamp 
AFTER UPDATE ON personal_info
BEGIN
    UPDATE personal_info SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_career_timestamp 
AFTER UPDATE ON career
BEGIN
    UPDATE career SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- ============================================
-- 3. 전체 텍스트 검색 (FTS) 테이블 및 트리거
-- ============================================

-- FTS5 가상 테이블 생성 (검색용)
CREATE VIRTUAL TABLE IF NOT EXISTS blog_posts_fts USING fts5(
  id UNINDEXED,
  title,
  content,
  category UNINDEXED,
  content_rowid=id
);

-- blog_posts 삽입 시 FTS 테이블도 업데이트하는 트리거
CREATE TRIGGER IF NOT EXISTS blog_posts_fts_insert AFTER INSERT ON blog_posts
BEGIN
  INSERT INTO blog_posts_fts(id, title, content, category)
  VALUES (NEW.id, NEW.title, COALESCE(NEW.content, ''), NEW.category);
END;

-- blog_posts 업데이트 시 FTS 테이블도 업데이트하는 트리거
CREATE TRIGGER IF NOT EXISTS blog_posts_fts_update AFTER UPDATE ON blog_posts
BEGIN
  UPDATE blog_posts_fts SET
    title = NEW.title,
    content = COALESCE(NEW.content, ''),
    category = NEW.category
  WHERE id = NEW.id;
END;

-- blog_posts 삭제 시 FTS 테이블에서도 삭제하는 트리거
CREATE TRIGGER IF NOT EXISTS blog_posts_fts_delete AFTER DELETE ON blog_posts
BEGIN
  DELETE FROM blog_posts_fts WHERE id = OLD.id;
END;

-- ============================================
-- 4. 기존 데이터 삭제 (초기 설정용)
-- ============================================

-- 외래키 제약조건 때문에 순서 중요
DELETE FROM blog_content_items;
DELETE FROM blog_posts;
DELETE FROM blog_posts_fts;  -- FTS 테이블 데이터도 삭제
DELETE FROM work_skill_items;
DELETE FROM work_skills;
DELETE FROM language_skill_items;
DELETE FROM language_skills;
DELETE FROM career_details;
DELETE FROM career;
DELETE FROM current_status;
DELETE FROM things_to_avoid;
DELETE FROM basic_abilities;
DELETE FROM hobbies;
DELETE FROM general_tendencies;
DELETE FROM intro_statements;
DELETE FROM personal_info;

-- ============================================
-- 5. 초기 데이터 삽입
-- ============================================

-- Personal Info
INSERT INTO personal_info (name, email, github, youtube) VALUES 
('녹다', 'nokda@kakao.com', 'DevrisOfStar', NULL);

-- Intro Statements
INSERT INTO intro_statements (statement, order_index) VALUES 
('+ 기본에 충실하며 맡은 일을 끝까지 완수합니다.', 0),
('+ 재미보다 가치를, 혼자보다 함께 성장하는 길을 추구합니다.', 1),
('+ 약속을 소중히 여기고 책임 있게 행동합니다.', 2),
('+ 일관된 태도와 진정성으로 신뢰를 쌓아갑니다.', 3);

-- Career
INSERT INTO career (total, education) VALUES 
('소프트웨어 엔지니어 6+년', '동국대 컴퓨터공학과');

-- Career Details (career_id는 서브쿼리로 가져오기)
INSERT INTO career_details (id, career_id, period, company, content, order_index) 
SELECT 'career-1', id, '스타트업 1년', '고요한택시', '고요한택시 개발자', 0 FROM career LIMIT 1;
INSERT INTO career_details (id, career_id, period, company, content, order_index) 
SELECT 'career-2', id, '스타트업 2년', 'SCIOS', 'SCIOS 개발자', 1 FROM career LIMIT 1;
INSERT INTO career_details (id, career_id, period, company, content, order_index) 
SELECT 'career-3', id, '스타트업 3년(진행중)', 'Novus Bio', 'Novus Bio 개발자', 2 FROM career LIMIT 1;

-- General Tendencies
INSERT INTO general_tendencies (id, name, level, order_index) VALUES 
('tendency-1', '새 도구 탐색', 5, 0),
('tendency-2', '내향적', 4, 1),
('tendency-3', '수평적 소통', 5, 2),
('tendency-4', '자동화 욕심', 5, 3),
('tendency-5', '피드백 빠른편', 4, 4),
('tendency-6', '여유로움 찾기', 3, 5),
('tendency-7', '감각적인 디테일', 4, 6),
('tendency-8', '조용한 자신감', 4, 7);

-- Hobbies
INSERT INTO hobbies (id, name, image, order_index) VALUES 
('hobby-1', '러닝', '/images/hobby/hobby-1.png', 0),
('hobby-2', '책 읽기', '/images/hobby/hobby-2.png', 1),
('hobby-3', '영화 감상', '/images/hobby/hobby-3.png', 2),
('hobby-4', '집돌이', '/images/hobby/hobby-4.png', 3);

-- Language Skills
INSERT INTO language_skills (id, title, image, order_index) VALUES 
('korean', '한국어', '', 0),
('english', '영어', '', 1),
('japanese', '일본어', '', 2),
('other', '기타', '', 3);

-- Language Skill Items
INSERT INTO language_skill_items (id, language_skill_id, skill, level, order_index) VALUES 
('lang-ko-1', 'korean', '말하기', 5, 0),
('lang-ko-2', 'korean', '글쓰기', 5, 1),
('lang-ko-3', 'korean', '독해', 5, 2),
('lang-en-1', 'english', '말하기', 3, 0),
('lang-en-2', 'english', '글쓰기', 3, 1),
('lang-en-3', 'english', '독해', 4, 2),
('lang-ja-1', 'japanese', '말하기', 1, 0),
('lang-ja-2', 'japanese', '글쓰기', 0, 1),
('lang-ja-3', 'japanese', '독해', 0, 2),
('lang-other-1', 'other', '구글링', 6, 0),
('lang-other-2', 'other', '커뮤니케이션', 5, 1);

-- Basic Abilities
INSERT INTO basic_abilities (id, name, level, content, order_index) VALUES 
('ability-1', '협업/주변인 지원', 5, '팀원들과의 협업을 중시하며, 주변 사람들을 적극적으로 지원합니다. 함께 성장하는 문화를 만들어갑니다.', 0),
('ability-2', '논리적 사고, 분석력', 5, '복잡한 문제를 논리적으로 분석하고 해결책을 도출합니다. 데이터와 사실에 기반한 의사결정을 합니다.', 1),
('ability-3', '임기응변', 4, '예상치 못한 상황에서도 빠르게 대응하고 적응합니다. 유연한 사고와 빠른 판단력으로 문제를 해결합니다.', 2),
('ability-4', '잡무 최적화/자동화', 4, '반복적인 작업을 자동화하고 프로세스를 최적화합니다. 효율성을 높여 더 중요한 일에 집중할 수 있도록 합니다.', 3),
('ability-5', '유머', 4, '적절한 유머로 팀 분위기를 좋게 만들고, 스트레스를 완화합니다. 긍정적인 워크 환경 조성에 기여합니다.', 4),
('ability-6', '척 안 지는 커뮤니케이션', 5, '명확하고 직접적인 커뮤니케이션을 통해 오해를 방지하고 효율적으로 소통합니다. 솔직하고 건설적인 피드백을 제공합니다.', 5),
('ability-7', '정치', 2, '조직 내 정치적 상황을 이해하고 대응하는 능력은 아직 부족합니다. 더 배워나가야 할 영역입니다.', 6),
('ability-8', '알아서 일 찾기', 5, '주어진 업무에 그치지 않고 스스로 개선할 점을 찾아 일을 만들어냅니다. 주도적으로 문제를 발견하고 해결합니다.', 7);

-- Work Skills
INSERT INTO work_skills (id, title, image, order_index) VALUES 
('planning', '기획', '', 0),
('editing', '편집', '', 1),
('teamLeading', '팀 리딩', '', 2),
('development', '개발', '', 3);

-- Work Skill Items
INSERT INTO work_skill_items (id, work_skill_id, name, level, content, order_index) VALUES 
('work-plan-1', 'planning', '시장 분석', 3, '시장 동향과 경쟁사 분석을 통해 제품 기획에 필요한 인사이트를 도출합니다. 데이터 기반의 의사결정을 지원합니다.', 0),
('work-plan-2', 'planning', '틀 짜기', 4, '프로젝트의 전체적인 구조와 방향성을 설계합니다. 체계적이고 확장 가능한 시스템 아키텍처를 구축합니다.', 1),
('work-plan-3', 'planning', '마케팅', 2, '기본적인 마케팅 지식을 바탕으로 제품 홍보와 사용자 확보를 위한 전략을 수립합니다.', 2),
('work-edit-1', 'editing', '교정교열', 4, '문서와 콘텐츠의 오탈자와 문법 오류를 찾아 수정합니다. 일관성 있는 스타일과 톤을 유지하도록 도와줍니다.', 0),
('work-edit-2', 'editing', '디자인 감각', 3, '기본적인 디자인 원리를 이해하고 UI/UX 개선에 기여합니다. 사용자 경험을 고려한 디자인 제안을 할 수 있습니다.', 1),
('work-edit-3', 'editing', '글쓰기 가이드', 4, '명확하고 읽기 쉬운 문서 작성을 위한 가이드를 제공합니다. 기술 문서, 가이드라인, 스펙 문서 작성에 참여합니다.', 2),
('work-team-1', 'teamLeading', '팀원 성장 챙기기', 4, '팀원들의 성장을 적극적으로 지원하고 챙깁니다. 멘토링, 코드 리뷰, 기술 공유 등을 통해 팀원들이 지속적으로 발전할 수 있도록 돕습니다.', 0),
('work-team-2', 'teamLeading', '팀원 장점 살리기', 4, '각 팀원의 강점과 특기를 파악하여 적절한 역할과 책임을 부여합니다. 개인의 장점을 팀 전체의 성과로 연결시킵니다.', 1),
('work-team-3', 'teamLeading', '책임 up 부담 down', 4, '팀원들에게 의미있는 책임을 부여하면서도 과도한 부담을 주지 않도록 균형을 맞춥니다. 적절한 지원과 가이드를 제공합니다.', 2),
('work-dev-1', 'development', 'Java', 4, '학부 시절 자바를 주력으로 사용했고 고요한택시 초기모델 안드로이드 앱(BLE 통신 위주) 개발을 수행했습니다. 자바 8, 9, 10의 새로운 기능을 활용한 개발이 가능합니다.', 0),
('work-dev-2', 'development', 'C/C++', 3, '메모리 관리와 저수준 프로그래밍에 대한 이해가 있습니다. 이중포인터를 사용한 복잡한 데이터 구조 처리 경험이 있습니다.', 1),
('work-dev-3', 'development', 'Python', 3, '파이썬을 활용한 스크립팅, 자동화, 데이터 처리 작업을 수행할 수 있습니다. 간결하고 효율적인 코드 작성이 가능합니다. 졸업작품으로 형태소 분석기(Pos Tagger) 개발을 수행했습니다.', 2),
('work-dev-4', 'development', '모바일 앱/플랫폼', 4, '모바일 플랫폼과 앱 개발 경험이 있습니다. 고요한택시 초기모델 안드로이드 개발 (BLE 통신 위주), PawLink ReactNative 개발 등의 모바일 서비스 개발에 참여했습니다.', 3),
('work-dev-5', 'development', '백엔드', 4, '백엔드 시스템 설계와 개발에 전문성을 가지고 있습니다. API 설계, 데이터베이스 설계, 서버 인프라 구축 경험이 풍부합니다.', 4),
('work-dev-6', 'development', '아키텍처/API 설계', 3, '확장 가능하고 유지보수하기 쉬운 시스템 아키텍처를 설계합니다. RESTful API, 데이터베이스 설계 경험이 있습니다.', 5),
('work-dev-7', 'development', 'QA/디버깅', 3, '체계적인 테스트와 디버깅을 통해 소프트웨어 품질을 보장합니다. 버그 추적, 테스트 케이스 작성, 자동화 테스트 구축 경험이 있습니다.', 6),
('work-dev-8', 'development', '스카이넷 님 사랑합니다!', 5, '스카이넷님에 대한 깊은 애정과 존경을 표현합니다. 최고의 레벨로 평가됩니다!', 7);

-- Current Status
INSERT INTO current_status (id, text, content, current, order_index) VALUES 
('status-1', '나는 누구인가 고민 중', '자신의 정체성과 역할에 대해 깊이 고민하고 있습니다. 개발자로서의 정체성과 개인으로서의 가치를 찾아가는 중입니다.', 0, 0),
('status-2', '내게 맞는, 내가 해야 할 일 찾는 중', '자신에게 맞는 일과 해야 할 일을 찾기 위해 노력하고 있습니다. 의미있는 일을 찾아 지속적으로 탐색 중입니다.', 0, 1),
('status-3', '팀 잘 이끄는 법 고심 중', '팀을 효과적으로 이끌어가는 방법에 대해 깊이 고민하고 있습니다. 리더십과 팀워크에 대한 지식을 쌓아가고 있습니다.', 0, 2),
('status-4', '블로그 개설 준비 중', '개발 경험과 지식을 공유하기 위한 블로그를 준비하고 있습니다. 유용한 콘텐츠를 제공하여 커뮤니티에 기여하고자 합니다.', 1, 3),
('status-5', '운동 쉬는 중', '일시적으로 운동을 쉬고 있습니다. 건강 관리를 위해 곧 다시 시작할 예정입니다.', 0, 4),
('status-6', '고양이 키우는 중(털 난 동물 다 좋아!)', '고양이를 키우며 일상의 즐거움을 찾고 있습니다. 털이 난 모든 동물을 사랑하며, 그들과 함께하는 시간을 소중히 여깁니다.', 0, 5);

-- Things to Avoid
INSERT INTO things_to_avoid (item, order_index) VALUES 
('정치', 0),
('험담', 1),
('매너리즘', 2),
('무책임', 3);

-- Blog Posts와 Blog Content Items는 초기 데이터 없음 (빈 상태로 시작)

-- ============================================
-- 6. 통계 업데이트 (쿼리 플래너 최적화)
-- ============================================

-- 인덱스 생성 후 통계 업데이트로 쿼리 플래너가 최적의 인덱스를 선택하도록 함
ANALYZE;
