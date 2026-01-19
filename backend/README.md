# Portfolio Backend API

Cloudflare Workers와 D1을 사용한 포트폴리오 백엔드 API입니다.

## 필수 요구사항

- Node.js 16.17.0 이상
- Cloudflare 계정
- Wrangler CLI

## 설치

```bash
npm install
```

## Cloudflare 설정

### D1 데이터베이스 생성

```bash
npx wrangler d1 create portfolio-data
```

**주의**: 데이터베이스 이름은 `portfolio-data`입니다. (`wrangler.toml`의 `database_name`과 일치해야 함)

생성 후 반환되는 `database_id`를 `wrangler.toml`의 `database_id` 필드에 추가하세요:

```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-data"
database_id = "여기에_database_id_추가"  # 생성 시 반환된 ID
```

### R2 버킷 생성 (이미지 저장용)

```bash
npx wrangler r2 bucket create portfolio-images
```

R2 버킷은 `wrangler.toml`에 이미 설정되어 있습니다. 생성 후 바로 사용 가능합니다.

## 데이터베이스 관리

### 스키마 적용

#### 로컬 개발 환경
로컬 D1 데이터베이스에 스키마를 적용합니다:

```bash
npm run db:local
```

이 명령은 `schema.sql` 파일을 실행하여 테이블 구조를 생성합니다.

#### 프로덕션 환경
원격 D1 데이터베이스에 스키마를 적용합니다:

```bash
npm run db:remote
```

**주의**: 프로덕션 데이터베이스에 스키마를 적용하면 기존 데이터가 삭제될 수 있습니다. 신중하게 실행하세요.

### 초기 데이터 로드

#### 로컬 개발 환경
로컬 데이터베이스에 초기 데이터를 로드합니다:

```bash
npx wrangler d1 execute portfolio-data --local --file=./migrations/init_data.sql
```

#### 프로덕션 환경
원격 데이터베이스에 초기 데이터를 로드합니다:

```bash
npm run db:migrate
```

또는 직접 실행:

```bash
npx wrangler d1 execute portfolio-data --remote --file=./migrations/init_data.sql
```

**주의**: `init_data.sql`은 기존 데이터를 삭제하고 초기 데이터를 삽입합니다. 프로덕션에서 실행 시 기존 데이터가 모두 삭제됩니다.

### 데이터베이스 초기화 (전체 재설정)

로컬 개발 환경에서 데이터베이스를 완전히 초기화하려면:

```bash
# 1. 스키마 재적용
npm run db:local

# 2. 초기 데이터 로드
npx wrangler d1 execute portfolio-data --local --file=./migrations/init_data.sql
```

### 데이터베이스 백업

로컬 데이터베이스를 백업하려면:

```bash
# 로컬 데이터베이스 내보내기
npx wrangler d1 export portfolio-data --local --output=./backup.sql
```

### 데이터베이스 복원

백업 파일에서 복원하려면:

```bash
# 로컬 데이터베이스 복원
npx wrangler d1 execute portfolio-data --local --file=./backup.sql
```

### 데이터베이스 쿼리 실행

직접 SQL 쿼리를 실행하려면:

```bash
# 로컬
npx wrangler d1 execute portfolio-data --local --command="SELECT * FROM blog_posts LIMIT 10;"

# 원격
npx wrangler d1 execute portfolio-data --remote --command="SELECT * FROM blog_posts LIMIT 10;"
```

### 마이그레이션 파일 구조

- `schema.sql`: 데이터베이스 스키마 (테이블 생성)
- `migrations/init_data.sql`: 초기 데이터 삽입 (개발용 샘플 데이터)

새로운 마이그레이션을 추가하려면 `migrations/` 디렉토리에 새로운 SQL 파일을 생성하고 실행하세요.

## 로컬 개발

```bash
npm run dev
```

서버가 `http://localhost:8787`에서 실행됩니다.

## 배포

### 로컬에서 수동 배포

```bash
npm run deploy
```

### GitHub Actions를 통한 자동 배포

프로젝트는 GitHub Actions를 통해 자동으로 프로덕션 환경에 배포됩니다.

#### 필요한 GitHub Secrets 설정

GitHub 저장소의 **Settings → Secrets and variables → Actions**에서 다음 secrets를 설정해야 합니다:

1. **CLOUDFLARE_API_TOKEN**: Cloudflare API 토큰
   - Cloudflare 대시보드 → My Profile → API Tokens에서 생성
   - 권한: Account - Cloudflare Workers:Edit, Account - D1:Edit, Account - R2:Edit

2. **CLOUDFLARE_ACCOUNT_ID**: Cloudflare 계정 ID
   - Cloudflare 대시보드 우측 사이드바에서 확인 가능

3. **PROD_DB_ID**: 프로덕션 D1 데이터베이스 ID
   - `npx wrangler d1 list` 명령어로 확인하거나
   - Cloudflare 대시보드 → Workers & Pages → D1에서 확인

#### 배포 트리거

- **자동 배포**: `main` 브랜치에 push 시 자동으로 배포됩니다
- **수동 배포**: GitHub Actions 탭에서 `Deploy to Cloudflare Workers` 워크플로우를 수동으로 실행할 수 있습니다

#### 배포 과정

1. 코드가 `main` 브랜치에 push되면 자동으로 워크플로우가 실행됩니다
2. Node.js 환경 설정 및 의존성 설치
3. `wrangler deploy --env production --d1 DB=${{ secrets.PROD_DB_ID }}` 명령어로 배포
4. `database_id`는 GitHub Secrets에서 안전하게 전달되므로 공개 저장소에 노출되지 않습니다

## API 엔드포인트

### 공개 API (읽기 전용)

- `GET /api/portfolio` - 전체 포트폴리오 데이터
- `GET /api/portfolio/personal` - 개인 정보
- `GET /api/portfolio/career` - 경력 정보
- `GET /api/blog` - 블로그 목록 (쿼리: `?category=개발&search=검색어`)
- `GET /api/blog/:id` - 블로그 상세

### 관리자 API (로컬 개발 전용)

**주의**: 이 API는 로컬 개발 환경(localhost)에서만 사용 가능하며, API 키 인증이 필요합니다.

#### 환경 변수 설정

로컬 개발을 위해 API 키를 설정하세요:

**방법 1: .dev.vars 파일 사용 (권장)**

```bash
# .dev.vars.example을 복사하여 .dev.vars 생성
cp .dev.vars.example .dev.vars

# .dev.vars 파일 편집하여 API 키 설정
# ADMIN_API_KEY=your-secret-key-here
```

**방법 2: Wrangler 시크릿 사용**

```bash
# 로컬 개발용 API 키 설정
npx wrangler secret put ADMIN_API_KEY --local
# 프롬프트에 API 키 입력 (예: "local-dev-key-2024")
```

**주의**: `.dev.vars` 파일은 Git에 커밋되지 않습니다. 실제 키는 안전하게 관리하세요.

#### 블로그 포스트 생성

```bash
curl -X POST http://localhost:8787/api/blog \
  -H "Content-Type: application/json" \
  -H "X-API-Key: local-dev-key-2024" \
  -d '{
    "id": "blog-16",
    "date": "24.01.20",
    "category": "개발",
    "title": "새 블로그 포스트",
    "content": "요약 내용",
    "thumbnail": "/images/blog-16.jpg",
    "items": [
      {"type": "text", "content": "첫 번째 문단"},
      {"type": "image", "content": "https://...r2.../image.png"},
      {"type": "heading", "content": "제목"},
      {"type": "text", "content": "두 번째 문단"}
    ]
  }'
```

#### 이미지 업로드

```bash
curl -X POST http://localhost:8787/api/blog/images \
  -H "X-API-Key: local-dev-key-2024" \
  -F "image=@/path/to/image.png" \
  -F "path=blog/2024"
```

**응답 예시:**
```json
{
  "success": true,
  "url": "/images/blog/2024/1234567890-image.png",
  "fileName": "blog/2024/1234567890-image.png"
}
```

#### 지원하는 콘텐츠 타입

- `text`: 일반 텍스트
- `image`: 이미지 (R2 URL)
- `heading`: 제목/소제목
- `code`: 코드 블록
- `quote`: 인용문

## 이미지 저장

블로그 콘텐츠 내 이미지는 **Cloudflare R2**에 저장됩니다.

### 이미지 접근

업로드된 이미지는 `/images/<path>` 엔드포인트를 통해 접근할 수 있습니다. Workers가 R2에서 이미지를 가져와서 제공합니다.

예시: `/images/blog/2024/1234567890-image.png`
