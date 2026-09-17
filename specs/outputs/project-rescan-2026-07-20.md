# 프로젝트 재스캔 보고서

작성일: 2026-07-20
대상: `/Users/nokda/Desktop/Individual/portfolio`

## 1. 기준 문서

- `Agent.md`
- `docs/project-overview.md`
- `docs/api-contracts.md`
- `docs/admin-blog-policy.md`
- `docs/privacy-policy.md`
- `docs/operations.md`

## 2. 현재 상태 요약

- 클라이언트는 React/Vite, 백엔드는 Cloudflare Workers/D1/R2 구성이다.
- 공개 사이트 `https://www.nokda.me`와 Workers 상태 확인, 포트폴리오, 블로그 읽기 API는 응답 중이다.
- 운영 `/blog/write`는 `/blog`로 리다이렉트되어 공개 작성 화면이 노출되지 않는다.
- 로컬 작성 UI와 관리자 API 호출 코드는 존재하지만, 프로덕션 쓰기는 백엔드의 localhost 검사에서 차단된다.
- 2026-07-13에 만든 `Agent.md`, `docs/`, README 정정 내용은 아직 Git에 커밋되지 않았다.
- `main`과 `origin/main`의 마지막 커밋은 `f6c5c4c`이며 작성일은 2026-07-04다.

## 3. 검증 결과

### 로컬 정적 검증

- `cd client && npx vite build`: 통과, JS 216.41kB, CSS 30.59kB
- `cd backend && npx tsc --noEmit`: 통과
- `cd client && npm audit --omit=dev`: 취약점 0건
- `cd backend && npm audit --omit=dev`: 취약점 0건
- `cd client && npm audit`: 5건(낮음 1, 보통 2, 높음 2)
- `cd backend && npm audit`: 4건(보통 2, 높음 2)

전체 감사에서 확인된 항목은 Vite/Rollup/PostCSS/Babel 및 Wrangler/Miniflare/Undici/ws 등 개발·빌드 도구 의존성이다. 배포된 사용자 런타임 의존성 감사 결과와는 구분한다.

### 라이브 API 검증

- `GET /health`: `200`
- `GET /api/portfolio`: `200`, `Origin: https://www.nokda.me`에 CORS 허용
- `GET /api/portfolio`: `career` 필드 존재
- `GET /api/portfolio/career`: `200`, `details`, `education`, `total` 반환
- `GET /api/blog`: `200`, 현재 글 0건
- 로컬 Origin의 `OPTIONS /api/blog`: `204`, `GET, POST, OPTIONS` 허용
- API 키 없는 `POST /api/blog`: `401`, localhost 전용 오류 반환

쓰기 검증은 실제 데이터를 변경하지 않기 위해 유효한 관리자 키를 전송하지 않았다.

### 공개 화면 검증

- 홈 화면: 정상 렌더링, 깨진 콘텐츠 이미지 0건, 콘솔 경고/오류 0건
- 블로그 화면: 정상 렌더링, 현재 빈 상태 표시, 콘솔 경고/오류 0건
- 운영 `/blog/write`: `/blog`로 리다이렉트
- `/vite.svg`: HTML fallback을 반환하므로 favicon 참조가 잘못되어 있다.
- 응답 보안 헤더: `X-Content-Type-Options`, `Referrer-Policy`는 존재하나 CSP와 HSTS는 확인되지 않았다.

### 배포 검증

- 최근 GitHub Actions 배포는 2026-07-04에 성공했다.
- 저장소 Wrangler `4.59.2`는 Node `>=20`을 요구한다.
- workflow는 Node `18`을 설정하고 README는 Node `16.17.0` 이상을 안내한다.
- 최근 배포 로그에서 저장소 Wrangler 실행이 거부되고 Action이 Wrangler `3.90.0`을 설치해 대신 배포했다.
- 결과적으로 성공한 배포의 Wrangler 버전이 `package-lock.json`과 일치하지 않는다.
- 로컬 Wrangler로 production secret 목록을 확인하려 했으나 비대화형 환경의 `CLOUDFLARE_API_TOKEN` 부재로 확인하지 못했다.

## 4. 주요 발견 사항

### Critical 1 - 로컬 프로덕션 빌드에 관리자 키 포함

- `client/.env.local`에 `VITE_ADMIN_API_KEY`가 존재한다.
- Vite는 `VITE_` 변수를 클라이언트 번들에 치환한다.
- 실제 로컬 빌드 JS에서 관리자 키와 동일한 값이 포함된 것을 확인했다.
- 현재 `www.nokda.me` 배포 JS에서는 동일한 키가 발견되지 않았다.
- 현재 배포본은 안전하지만, 로컬에서 `npm run build` 후 `dist`를 수동 업로드하면 키가 공개될 수 있다.
- 이는 `docs/admin-blog-policy.md`와 `docs/operations.md`의 프로덕션 번들 키 금지 정책에 위배된다.

### Critical 2 - 블로그 프로덕션 저장 정책과 코드 불일치

- 문서 목표는 로컬 작성 UI에서 production D1/R2로 저장하는 것이다.
- `backend/src/utils/auth.ts`는 요청 URL이 localhost가 아니면 API 키 검증 전에 거부한다.
- `backend/src/routes/blog.ts`는 모든 POST 저장 작업 전에 해당 인증을 실행한다.
- 따라서 글 작성과 이미지 업로드는 프로덕션 Workers에서 수행되지 않는다.

### High 1 - 배포 도구 버전 불일치

- package lock은 Wrangler `4.59.2`, workflow는 Node 18, 실제 배포는 Wrangler `3.90.0`이다.
- 배포 성공 여부와 무관하게 저장소에서 검증한 도구와 실제 배포 도구가 다르다.
- workflow와 README의 Node 기준, Wrangler 실행 버전을 하나의 지원 조합으로 정렬해야 한다.

### High 2 - 자동 테스트와 배포 게이트 부재

- `client`, `backend`에 테스트 스크립트와 테스트 파일이 없다.
- GitHub Actions는 `npm ci` 후 타입 검사, 빌드, 테스트 없이 바로 배포한다.
- 관리자 인증, 블로그 작성, 이미지 업로드, 개인정보 응답의 회귀를 자동으로 탐지할 수 없다.

### High 3 - 경력·학력 공개 API 노출

- 화면에서는 경력·학력을 숨기지만 공개 API는 계속 반환한다.
- 라이브 API에서도 현재 데이터 반환을 확인했다.
- `docs/privacy-policy.md`에서 API 제거 여부가 미결정이므로 코드 변경 전에 정책 결정이 필요하다.

### High 4 - 개발·배포 도구 취약점

- 운영 의존성 감사 결과는 0건이다.
- 전체 감사에서는 클라이언트 5건, 백엔드 4건이 남아 있다.
- 백엔드 취약점은 배포 CLI인 Wrangler 계열에 포함되므로 단순 개발 편의 의존성으로만 볼 수 없다.

### Medium 1 - 관리자 secret 운영 확인 경로 부족

- 정책상 production Workers에 `ADMIN_API_KEY`가 필요하다.
- workflow는 Cloudflare 토큰, 계정 ID, D1 ID만 검증하며 `ADMIN_API_KEY` 존재 여부를 확인하지 않는다.
- Cloudflare에 secret이 실제 설정되어 있는지는 이번 로컬 환경에서 확인하지 못했다.

### Medium 2 - 프론트엔드 배포와 자산 관리

- 프론트엔드는 여전히 수동 배포이며 자동 빌드 검증이 없다.
- 공개 PNG 이미지와 루트 JPG의 합계는 약 7.5MB다.
- `client/IMG_3639.JPG`는 Git에 추적되지만 코드 참조가 확인되지 않았다.
- favicon은 존재하지 않는 `/vite.svg`를 참조한다.

### Medium 3 - 공개 웹 보안 정책 미정

- 라이브 HTML 응답에서 CSP와 HSTS가 확인되지 않았다.
- 외부 geo-gateway와 Google Analytics 스크립트의 개인정보 고지 정책도 미결정이다.
- 헤더와 외부 스크립트 정책은 `docs/`에 먼저 정책을 추가해야 한다.

## 5. 정상 반영 상태

- CORS 허용 Origin 공통 처리
- 블로그 목록 콘텐츠 배치 조회로 N+1 제거
- 이미지 MIME, 확장자, 크기, 경로 검증
- 관리자 API 클라이언트 타임아웃
- 공개 API 내부 오류 메시지 축약
- 사이트맵 도메인 `https://www.nokda.me` 정합화
- 운영 작성 페이지 리다이렉트
- 홈과 블로그의 정상 렌더링 및 콘솔 오류 없음

## 6. 후속 TICKET

Sprint 목표: 관리자 키 노출 가능성을 제거하고 블로그 프로덕션 저장 및 배포 과정을 문서와 일치시키며 자동 검증 가능한 상태로 만든다.

### TICKET 1 - 프로덕션 번들 관리자 키 차단

- 설명: 수동 또는 자동 프로덕션 빌드에서 `VITE_ADMIN_API_KEY`가 JS에 포함되지 않도록 환경과 빌드 절차를 분리한다.
- 입력 문서: `docs/admin-blog-policy.md`, `docs/operations.md`
- 산출물: 클라이언트 환경 설정, 빌드 검증 스크립트, 운영 문서 갱신
- 완료 조건(DoD): 관리자 키가 있는 로컬 작성 환경은 동작하고, 프로덕션 빌드 산출물에는 해당 값이 없다.

### TICKET 2 - 프로덕션 관리자 인증 정합화

- 설명: 작성 UI의 로컬 전용 정책을 유지하면서 유효한 관리자 키의 production Workers 쓰기를 허용한다.
- 입력 문서: `docs/admin-blog-policy.md`, `docs/api-contracts.md`
- 산출물: `backend/src/utils/auth.ts`, 인증 테스트, 라이브 검증 기록
- 완료 조건(DoD): 유효한 관리자 요청은 production D1/R2에 저장되고, 누락·오류 키 요청은 저장되지 않는다.

### TICKET 3 - 배포 런타임과 Wrangler 버전 고정

- 설명: README, GitHub Actions Node 버전, package lock의 Wrangler 버전을 지원 조합으로 정렬한다.
- 입력 문서: `docs/operations.md`, `backend/README.md`, `backend/package.json`, `.github/workflows/deploy.yml`
- 산출물: 운영 문서와 workflow 설정
- 완료 조건(DoD): 배포 로그가 저장소의 Wrangler 버전을 그대로 실행하고 임시 하위 버전 설치가 발생하지 않는다.

### TICKET 4 - 테스트 및 CI 게이트 구축

- 설명: 인증, CORS, 블로그 쓰기, 이미지 검증, 공개 응답에 대한 자동 테스트와 배포 전 검증 단계를 추가한다.
- 입력 문서: `docs/api-contracts.md`, `docs/admin-blog-policy.md`, `docs/privacy-policy.md`
- 산출물: 테스트 파일, package scripts, GitHub Actions 검증 단계
- 완료 조건(DoD): 실패 테스트, 타입 오류, 빌드 오류가 있으면 배포가 실행되지 않는다.

### TICKET 5 - 개발 도구 의존성 취약점 정리

- 설명: 클라이언트 및 백엔드 개발 의존성을 호환 가능한 버전으로 업데이트한다.
- 입력 문서: `docs/operations.md`, 각 `package.json`, `package-lock.json`
- 산출물: 의존성 및 lockfile 갱신, 검증 결과
- 완료 조건(DoD): 전체 `npm audit`의 high 취약점이 0건이고 빌드, 타입 검사, 테스트가 통과한다.

### TICKET 6 - 경력·학력 API 공개 정책 확정

- 설명: 화면 비공개 데이터를 공개 API에서도 제거할지 확정한다.
- 입력 문서: `docs/privacy-policy.md`
- 산출물: 정책 갱신과 필요한 API 변경 티켓
- 완료 조건(DoD): 화면, API, 문서의 공개 범위가 일치한다.

### TICKET 7 - 프론트엔드 배포 및 정적 자산 정리

- 설명: 클라이언트 배포 자동화, favicon 수정, 이미지 용량과 미사용 파일을 정리한다.
- 입력 문서: `docs/operations.md`, `client/README.md`
- 산출물: 배포 workflow 또는 Pages 설정, 최적화 자산, 문서 갱신
- 완료 조건(DoD): 프로덕션 빌드 검증 후 자동 배포되고 favicon 오류와 미사용 자산이 없다.

## 7. 이번 스캔의 제한

- production 관리자 키로 실제 쓰기를 수행하지 않았다.
- Cloudflare production secret 목록은 인증 토큰 부재로 확인하지 못했다.
- 경력·학력 API 공개 정책, CSP/HSTS, 외부 추적 고지는 아직 미결정이므로 구현안을 확정하지 않았다.
