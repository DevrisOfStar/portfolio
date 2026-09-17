# 환경 설정과 운영

## 로컬 실행

### 클라이언트

```bash
cd client
npm install
npm run dev
```

기본 주소는 Vite가 출력하는 로컬 주소를 사용한다.

### 백엔드

```bash
cd backend
npm install
npm run db:local
npm run dev
```

기본 주소는 `http://localhost:8787`이다.

## 환경 변수

### 클라이언트

- `VITE_API_URL`: 호출할 Workers API URL
- `VITE_ADMIN_API_KEY`: 로컬 관리자 작성 환경에서만 사용하는 API 키
- `VITE_SITE_URL` 또는 `SITE_URL`: sitemap 생성 사이트 URL

`VITE_` 접두사 값은 클라이언트 코드에서 접근할 수 있으므로 프로덕션 공개 빌드에 관리자 키를 넣지 않는다.

### 백엔드

- `ADMIN_API_KEY`: 관리자 쓰기 API 인증 키
- `ALLOWED_ORIGIN`, `ALLOWED_ORIGINS`: 추가 CORS 허용 Origin. 현재 production Origin은 `https://portfolio-2hq.pages.dev`
- `CLOUDFLARE_API_TOKEN`: GitHub Actions 배포 인증
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 계정 ID
- `PROD_DB_ID`: production D1 ID

실제 값은 로컬 비밀 파일, Cloudflare secret 또는 GitHub Actions secret으로 관리한다.

## 배포

### 백엔드

- `main` 브랜치 push 또는 수동 실행으로 `.github/workflows/deploy.yml`이 동작한다.
- workflow는 production D1 ID를 설정한 뒤 `wrangler deploy --env production`을 실행한다.
- 현재 workflow에는 타입 검사와 자동 테스트 단계가 없다.

### 클라이언트

- 현재 `npm run build` 후 `dist`를 Cloudflare Pages에 수동 배포한다.
- 자동 배포는 아직 구성되지 않았다.

## 데이터베이스 주의사항

- `migrations/init_data.sql`은 기존 데이터를 삭제하고 초기 데이터를 다시 넣으므로 production에서 일반 마이그레이션처럼 실행하지 않는다.
- production 스키마 또는 데이터 변경 전 백업과 복구 절차를 확인해야 한다.
- 버전 기반 마이그레이션과 롤백 정책은 아직 정의되지 않았다.

## 현재 검증 명령

```bash
cd client && npm run build
cd client && npm audit --omit=dev
cd backend && npx tsc --noEmit
cd backend && npm audit --omit=dev
```

자동 테스트 스크립트는 아직 없다.
