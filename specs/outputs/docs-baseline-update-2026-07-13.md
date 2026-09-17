# Sprint 목표

현재 코드와 확정된 운영 요구사항을 기준으로 프로젝트 SSOT를 만들고, 후속 구현의 판단 기준을 확립한다.

# TICKET 목록

## TICKET 1 - 프로젝트 작업 기준 생성

- 설명: 작업 순서, 디렉토리 책임, 기준 문서와 검증 명령을 정의한다.
- 입력 문서: 사용자 제공 AGENTS 지침, 현재 저장소 구조
- 산출물: `Agent.md`
- 완료 조건(DoD): 작업자가 변경 전 확인할 문서와 디렉토리 책임을 알 수 있다.

## TICKET 2 - 프로젝트 및 API 기준 문서 생성

- 설명: 프론트엔드, 백엔드, 저장소, 라우트와 API 계약을 현재 코드 기준으로 문서화한다.
- 입력 문서: `client/src`, `backend/src`, 기존 README
- 산출물: `docs/project-overview.md`, `docs/api-contracts.md`
- 완료 조건(DoD): 실제 주요 라우트와 API가 문서에서 누락되지 않는다.

## TICKET 3 - 블로그 관리자 저장 정책 문서화

- 설명: 로컬 작성 UI에서 프로덕션 D1/R2에 저장하는 목표와 인증 경계를 정의하고 현재 코드 불일치를 기록한다.
- 입력 문서: `client/src/pages/BlogWritePage.jsx`, `client/src/services/api.js`, `backend/src/utils/auth.ts`, `backend/src/routes/blog.ts`
- 산출물: `docs/admin-blog-policy.md`
- 완료 조건(DoD): 목표 저장 위치, 인증 방식, 비밀키 금지 범위, 현재 차단 원인이 명시된다.

## TICKET 4 - 개인정보 및 운영 상태 문서화

- 설명: 화면 비공개와 API 공개 상태를 분리하고 환경 변수, 배포, 데이터 작업 주의사항을 정리한다.
- 입력 문서: `client/README.md`, `backend/README.md`, `.github/workflows/deploy.yml`, `backend/wrangler.toml`
- 산출물: `docs/privacy-policy.md`, `docs/operations.md`
- 완료 조건(DoD): 확정 정책과 미결정 정책이 섞이지 않고, 현재 배포 방식이 재현 가능하게 기록된다.
