# API 계약

## 공통

- 프로덕션 기준 URL: `https://portfolio-api.yh1483.workers.dev`
- JSON 응답은 `Content-Type: application/json`을 사용한다.
- 프로덕션 웹 Origin은 `https://www.nokda.me`다.
- 관리자 요청은 `X-API-Key` 헤더가 필요하다.

## 상태 확인

### `GET /` 또는 `GET /health`

- 용도: Workers 상태 확인
- 성공: `200`, `{ "status": "ok", "service": "portfolio-api" }`

## 포트폴리오 공개 API

- `GET /api/portfolio`: 전체 포트폴리오 데이터
- `GET /api/portfolio/personal`: 개인 기본 정보
- `GET /api/portfolio/career`: 경력 및 학력 정보
- `GET /api/portfolio/intro-statements`: 소개 문장
- `GET /api/portfolio/general-tendencies`: 일반 성향
- `GET /api/portfolio/hobbies`: 취미
- `GET /api/portfolio/language-skills`: 언어 능력
- `GET /api/portfolio/basic-abilities`: 기본 능력
- `GET /api/portfolio/work-skills`: 업무 스킬
- `GET /api/portfolio/things-to-avoid`: 기피 항목
- `GET /api/portfolio/current-status`: 현재 상태

경력 및 학력 공개 범위는 `docs/privacy-policy.md`의 미결정 사항을 확인해야 한다.

## 블로그 공개 API

### `GET /api/blog`

- 용도: 블로그 목록 조회
- 선택 쿼리: `category`, `search`
- 정렬: `created_at DESC`, `date DESC`

### `GET /api/blog/:id`

- 용도: 블로그 상세 조회
- 게시물이 없으면 `404`

### `GET /images/:path`

- 용도: R2 이미지 조회
- 이미지가 없으면 `404`
- 성공 응답 캐시: `public, max-age=31536000`

## 블로그 관리자 API

### `POST /api/blog`

- 용도: 글과 선택적 콘텐츠 아이템 생성
- 필수 필드: `id`, `date`, `category`, `title`
- 선택 필드: `content`, `thumbnail`, `order_index`, `items`
- 콘텐츠 타입: `text`, `image`, `heading`, `code`, `quote`
- 성공: `201`, `{ "success": true, "id": "..." }`

### `POST /api/blog/:id/items`

- 용도: 기존 글에 콘텐츠 아이템 추가
- 필수 필드: 비어 있지 않은 `items` 배열
- 성공: `201`

### `POST /api/blog/images`

- 용도: R2 이미지 업로드
- 형식: `multipart/form-data`
- 필드: `image`, 선택적 `path`
- 허용 MIME: JPEG, PNG, GIF, WebP
- 허용 확장자: `jpg`, `jpeg`, `png`, `gif`, `webp`
- 최대 크기: 5MB
- 성공: `201`, 이미지 프록시 경로 반환

## 현재 검증 한계

- `date`는 필수 여부만 검사하고 형식은 검사하지 않는다.
- `id`는 필수 여부만 검사하고 형식과 길이는 검사하지 않는다.
- 추가 제한값은 정책 문서에 확정한 뒤 구현한다.
