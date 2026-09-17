# Portfolio Agent Guide

## 작업 원칙

1. 작업 전 이 파일과 `docs/`의 관련 문서를 확인한다.
2. 문서와 코드가 다르면 현재 상태를 확인하고, 정책 변경은 문서를 먼저 갱신한다.
3. 문서에 정의되지 않은 인증, 공개 범위, 제한값을 임의로 추가하지 않는다.
4. 계획, 티켓, 분석 결과는 `specs/outputs/`에 작성한다.
5. 비밀키와 실제 Cloudflare 리소스 ID는 저장소에 기록하지 않는다.

## 디렉토리 책임

- `client/`: React/Vite 사용자 화면과 로컬 관리자 작성 화면
- `backend/`: Cloudflare Workers API, D1 데이터 접근, R2 이미지 저장
- `docs/`: 프로젝트 기능, API, 정책, 운영 절차의 단일 기준 문서
- `specs/outputs/`: 작업별 계획, 티켓, 점검 결과
- `.github/workflows/`: 자동 배포 절차

## 기준 문서

- 프로젝트 구조와 범위: `docs/project-overview.md`
- API 계약: `docs/api-contracts.md`
- 블로그 관리자 정책: `docs/admin-blog-policy.md`
- 개인정보 공개 범위: `docs/privacy-policy.md`
- 환경 설정과 배포: `docs/operations.md`

## 변경 시 검증

- 클라이언트: `npm run build`
- 백엔드: `npx tsc --noEmit`
- 의존성: 각 패키지에서 `npm audit --omit=dev`
- API 또는 배포 변경: 허용/거부 요청을 모두 확인하고 결과를 `specs/outputs/`에 기록
