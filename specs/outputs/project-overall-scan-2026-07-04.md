# 프로젝트 전체 스캔 요약

작성일: 2026-07-04
대상 루트: `/Users/nokda/Desktop/Individual/portfolio`

## 1. 스캔 기준과 SSOT 상태

- 최초 스캔 시 루트 `Agent.md`, `AGENTS.md`, `docs/` 디렉토리는 존재하지 않았다.
- 2026-07-13 문서 기준선 작업으로 `Agent.md`와 `docs/`를 생성했다.
- 현재 프로젝트 정책과 계약의 기준은 `Agent.md` 및 `docs/*.md`이다.
- 이 문서는 최초 스캔 결과와 이후 정정 상태를 함께 보존하는 분석 산출물이다.

## 2. 저장소 구성

- `client/`: React 18 + Vite 기반 포트폴리오/블로그 프론트엔드.
- `backend/`: Cloudflare Workers + D1 + R2 기반 API 백엔드.
- `.github/workflows/deploy.yml`: `main` push 또는 수동 실행 시 Cloudflare Workers 프로덕션 배포.
- `specs/outputs/`: 배포 수정, 개인정보 비공개, 보안 개선 계획 산출물.
- `checklist.md`: 보안, 성능, 검증, 운영 개선 항목 체크리스트.

## 3. 프론트엔드 요약

- 진입점은 `client/src/App.jsx`이며 라우트는 `/`, `/detail/:id`, `/blog`, `/blog/write`이다.
- `/`는 `HomePage`에서 Header, 상세 보드, Footer를 조합한다.
- `/detail/:id`는 성향, 취미, 언어, 기본 능력, 업무 스킬, 블로그, 현재 상황 데이터를 상세 컴포넌트로 렌더링한다.
- `/blog`는 포트폴리오 컨텍스트에 포함된 블로그 목록을 표시한다.
- `/blog/write`는 로컬 환경에서만 접근 가능한 블로그 작성 화면이며 API 키 입력, 마크다운 작성, 이미지 업로드, 초안 저장을 제공한다.
- `PortfolioContext`는 `/api/portfolio` 응답을 한 번 가져와 클라이언트 전역 상태로 제공하고 실패 시 빈 데이터 구조로 UI 중단을 방지한다.
- `client/scripts/generate-sitemap.mjs`는 빌드 전 `/`, `/blog` 사이트맵을 생성한다. `VITE_SITE_URL` 또는 `SITE_URL`이 없으면 `https://www.nokda.me`를 사용한다.
- `client/index.html`에는 외부 추적/최적화 스크립트가 포함되어 있어 개인정보 처리 고지와 연결된 후속 문서화가 필요하다.

## 4. 백엔드 요약

- 진입점은 `backend/src/index.ts`이며 `/health`, `/`, `/api/portfolio`, `/api/blog`, `/images/*` 요청을 분기한다.
- `/api/portfolio` 계열은 D1에서 포트폴리오 데이터를 조회한다.
- `/api/blog` 계열은 공개 블로그 조회와 로컬 전용 관리자 생성/업로드 API를 제공한다.
- 관리자 API는 `localhost`, `127.0.0.1`, `[::1]`, `*.localhost`에서만 허용되고 `X-API-Key`를 검증한다.
- CORS는 `backend/src/utils/cors.ts`에서 기본 로컬 origin과 `ALLOWED_ORIGIN`, `ALLOWED_ORIGINS` 환경 변수를 합산해 허용 origin에만 응답한다.
- 이미지 업로드는 MIME allowlist, 확장자 allowlist, 5MB 제한, 경로 정규화를 적용하고 R2에 저장한다.
- R2 이미지는 `/images/<path>`에서 Workers 프록시로 제공되며 1년 캐시 헤더를 설정한다.

## 5. 데이터 모델 요약

- 개인 정보: `personal_info`
- 소개 문장: `intro_statements`
- 경력/학력: `career`, `career_details`
- 성향/취미: `general_tendencies`, `hobbies`
- 언어 능력: `language_skills`, `language_skill_items`
- 기본 능력: `basic_abilities`
- 업무 스킬: `work_skills`, `work_skill_items`
- 블로그: `blog_posts`, `blog_content_items`
- 현재 상황/기피 항목: `current_status`, `things_to_avoid`
- `migrations/init_data.sql`은 인덱스, 트리거, FTS 테이블, 초기 데이터를 함께 포함하며 실행 시 기존 데이터를 삭제하고 다시 삽입한다.

## 6. 공개 API와 실제 코드 기준 엔드포인트

문서화된 공개 API:

- `GET /api/portfolio`
- `GET /api/portfolio/personal`
- `GET /api/portfolio/career`
- `GET /api/blog`
- `GET /api/blog/:id`

코드에서 추가로 확인되는 API:

- `GET /health`
- `GET /api/portfolio/intro-statements`
- `GET /api/portfolio/general-tendencies`
- `GET /api/portfolio/hobbies`
- `GET /api/portfolio/language-skills`
- `GET /api/portfolio/basic-abilities`
- `GET /api/portfolio/work-skills`
- `GET /api/portfolio/things-to-avoid`
- `GET /api/portfolio/current-status`
- `POST /api/blog`
- `POST /api/blog/:id/items`
- `POST /api/blog/images`
- `GET /images/<path>`

## 7. 문서와 코드 불일치 후보

- 최초 스캔 당시 루트 `Agent.md`/`docs/`가 없었으나 2026-07-13에 기준 문서를 생성했다.
- `backend/README.md`의 존재하지 않는 `.dev.vars.example` 복사 안내를 `.dev.vars` 직접 생성 안내로 정정했다.
- `backend/README.md`의 API 목록은 실제 포트폴리오 세부 조회 엔드포인트, `/health`, `POST /api/blog/:id/items`를 모두 포함하지 않는다.
- `client/README.md`는 학력/경력 정보를 사용자 화면에서 비공개 처리한다고 명시하고, 현재 홈/상세 화면 조합에서는 경력 상세가 제외되어 있다. 다만 `backend/README.md`와 코드는 `GET /api/portfolio/career` 및 `/api/portfolio`의 경력 데이터를 계속 공개한다.
- `specs/outputs/security-remediation-plan.md`의 TICKET 1은 경력/학력 API 응답 제거를 요구하지만 완료 상태가 아니다.
- `checklist.md`의 N+1 쿼리와 CORS 공통화 항목은 2026-07-13에 실제 코드 상태에 맞춰 완료로 정정했다.
- 사이트맵 기본 URL은 `https://www.nokda.me`로 정정되어 있다.
- 블로그 관리자 정책은 로컬 작성 UI에서 프로덕션 저장소로 쓰는 것을 목표로 하지만 현재 인증 코드가 프로덕션 Workers 요청을 차단한다.

## 8. 후속 TICKET 후보

Sprint 목표: 프로젝트 기준 문서 부재를 해소하고 현재 코드와 문서의 공개 범위, API, 운영 기준을 일치시킨다.

### TICKET 1 - 프로젝트 SSOT 문서 생성

- 상태: 완료 (2026-07-13)
- 설명: 루트 `Agent.md`와 `docs/` 기준 문서를 생성해 작업 전 확인 기준을 확정한다.
- 입력 문서: 현재 없음, `client/README.md`, `backend/README.md`, `checklist.md`, `specs/outputs/*.md`
- 산출물: `Agent.md`, `docs/project-overview.md`, `docs/api-contracts.md`, `docs/privacy-policy.md`, `docs/operations.md`
- 완료 조건(DoD): 작업자가 기능/정책/운영 기준을 `docs/`에서 먼저 확인할 수 있다.

### TICKET 2 - API 문서와 실제 라우트 정합화

- 상태: 완료 (2026-07-13)
- 설명: `backend/README.md` 또는 신규 `docs/api-contracts.md`에 실제 공개/관리자/이미지/헬스체크 API를 빠짐없이 반영한다.
- 입력 문서: `backend/README.md`, `backend/src/index.ts`, `backend/src/routes/portfolio.ts`, `backend/src/routes/blog.ts`
- 산출물: `docs/api-contracts.md` 또는 갱신된 `backend/README.md`
- 완료 조건(DoD): 문서 API 목록과 코드 라우트가 일치한다.

### TICKET 3 - 개인정보 공개 범위 확정

- 상태: 정책 결정 대기
- 설명: 경력/학력 데이터를 API에서도 제거할지, 화면에서만 비공개할지 정책을 승인 문서로 확정한다.
- 입력 문서: `client/README.md`, `specs/outputs/privacy-career-education-private.md`, `specs/outputs/security-remediation-plan.md`
- 산출물: `docs/privacy-policy.md`, 필요한 경우 `backend/src/db/queries.ts`, `backend/src/routes/portfolio.ts`
- 완료 조건(DoD): 화면과 API의 개인정보 공개 범위가 문서와 일치한다.

### TICKET 4 - 체크리스트 최신화

- 상태: 완료 (2026-07-13)
- 설명: 이미 반영된 N+1 개선, CORS 공통화, 인덱스 적용 상태를 체크리스트와 실제 코드 기준으로 재정리한다.
- 입력 문서: `checklist.md`, `backend/src/db/queries.ts`, `backend/src/utils/cors.ts`, `backend/migrations/init_data.sql`
- 산출물: 갱신된 `checklist.md` 또는 `docs/tickets.md`
- 완료 조건(DoD): 완료/미완료 항목이 실제 코드 상태와 충돌하지 않는다.

### TICKET 5 - 환경 변수와 배포 운영 문서 보강

- 상태: 문서화 완료, 예시 파일 생성은 미진행
- 설명: `VITE_SITE_URL`/`SITE_URL`, `VITE_API_URL`, Cloudflare secret 요구사항을 정리한다.
- 입력 문서: `backend/README.md`, `client/scripts/generate-sitemap.mjs`, `.github/workflows/deploy.yml`
- 산출물: `.env.example`류 예시 파일 또는 `docs/operations.md`
- 완료 조건(DoD): 신규 환경에서 로컬 실행, 사이트맵 생성, 프로덕션 배포에 필요한 값이 문서로 확인된다.

## 9. 검증 결과

- `cd client && npm audit --omit=dev`: 취약점 0건.
- `cd backend && npm audit --omit=dev`: 취약점 0건.
- `cd backend && npx tsc --noEmit`: 통과.
- `git status --short --branch`: `main...origin/main` 기준 작업트리 깨끗한 상태에서 스캔을 시작했다.

## 10. 최종 체크리스트

- docs와 충돌 없음: 루트 `docs/` 부재로 승인 SSOT 충돌은 판단 불가. 문서성 파일 기준 불일치 후보는 위에 분리했다.
- 요청사항 부합: 프로젝트 전체 구조, 기능, 데이터, API, 배포, 리스크를 스캔해 정리했다.
- Agent.md 부합: 루트 `Agent.md`가 없어 사용자 제공 AGENTS 지침을 우선 적용했다.
- 산출물 위치 규칙 준수: 본 정리 문서는 `specs/outputs/`에 생성했다.
