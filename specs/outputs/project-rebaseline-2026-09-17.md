# 프로젝트 재시작 기준선

작성일: 2026-09-17

## Sprint 목표

현재 구현을 기준선으로 고정하고, 정책 결정과 문서-코드 정합화를 선행해 포트폴리오와 블로그를 재개발 가능한 상태로 정리한다.

## 현재 기준선

- 사용자 화면은 React 18, Vite, React Router로 구성되어 있고 `/`, `/detail/:id`, `/blog`, `/blog/write` 라우트를 제공한다.
- API는 Cloudflare Workers, D1, R2로 구성되어 있으며 포트폴리오와 블로그 읽기, API 키 기반 블로그 쓰기 엔드포인트를 제공한다.
- 클라이언트 빌드와 백엔드 타입 검사는 통과한다.
- 백엔드 운영 의존성 감사는 취약점 0건이다. 클라이언트 운영 의존성 감사는 `react-router` 계열 high 2건을 보고한다.
- 클라이언트와 백엔드에는 자동 테스트 스크립트 및 테스트 파일이 없다.
- 현재 작업 트리에는 기존 README 수정과 기준 문서 초안이 Git에 반영되지 않은 상태로 존재한다. 이 문서는 해당 변경을 수정하거나 커밋하지 않는다.

## 문서-코드 불일치

| 우선순위 | 근거 문서 | 실제 코드 | 정리 원칙 |
| --- | --- | --- | --- |
| P0 | `docs/admin-blog-policy.md` | `authenticateAdmin()`이 Workers 요청을 localhost가 아니라는 이유로 API 키 검사 전에 거부한다. | 문서의 로컬 작성 UI와 production Workers 저장 목표에 맞춰 인증 경계를 구현한다. |
| P0 | `docs/privacy-policy.md` | 화면에서는 경력과 학력을 숨기지만 `GET /api/portfolio` 및 `GET /api/portfolio/career`가 데이터를 반환한다. | 공개 API 범위는 아직 미결정이므로 정책 확정 전에는 구현하지 않는다. |
| P1 | `docs/operations.md`, `backend/README.md` | workflow는 Node 18을 사용하고 README는 Node 16.17 이상을 안내하지만 설치된 Wrangler 4.59.2의 지원 런타임과 일치 여부가 문서화되지 않았다. | 지원 Node/Wrangler 조합을 문서와 workflow, 패키지 기준으로 하나로 정렬한다. |
| P1 | `docs/operations.md` | 배포 workflow는 의존성 설치 후 바로 배포하며 타입 검사, 빌드, 테스트 단계가 없다. | 검증 단계와 실패 시 배포 중단 조건을 운영 문서에 정의한 뒤 적용한다. |
| P1 | `docs/privacy-policy.md` | geo-gateway와 Google Analytics 스크립트가 클라이언트 HTML에서 실행된다. | 수집 항목과 고지 정책이 없으므로 기능 유지·삭제·고지를 결정하지 않는다. |
| P2 | `docs/api-contracts.md` | 블로그 `id`와 `date`는 존재 여부만 검사한다. | 형식과 제한값이 정의되지 않아 추가 검증을 구현하지 않는다. |

## TICKET 목록

### TICKET 1 - 기준 문서와 변경 이력 확정

- 설명: 현재 작업 트리의 `Agent.md`, `docs/`, 기존 점검 보고서와 README 수정본을 검토해 재시작 기준 문서로 확정하고, 구현 변경과 분리된 문서 이력을 만든다.
- 입력 문서: `Agent.md`, `docs/*.md`, `specs/outputs/*.md`
- 산출물: 확정된 기준 문서 커밋, 변경 이력
- 완료 조건(DoD): 작업 시작 시 참조할 문서가 Git에서 재현 가능하고, 미반영 문서와 구현 변경의 경계가 명확하다.

### TICKET 2 - 개인정보 공개 API 정책 확정

- 설명: 경력과 학력을 공개 API에서 계속 제공할지, 전체 포트폴리오 응답과 전용 엔드포인트에서 함께 제거할지 정의한다.
- 입력 문서: `docs/privacy-policy.md`, `docs/api-contracts.md`
- 산출물: 갱신된 개인정보 공개 범위와 API 계약
- 완료 조건(DoD): 화면, 전체 API, 전용 API 각각의 공개 여부와 기대 응답이 문서에 명시된다.
- 상태: docs에 먼저 정책을 추가해야 합니다.

### TICKET 3 - 외부 스크립트 개인정보 정책 확정

- 설명: geo-gateway와 Google Analytics의 사용 목적, 수집 항목, 보관, 제3자 제공, 공개 고지 방식을 정의한다.
- 입력 문서: `docs/privacy-policy.md`, `client/index.html`
- 산출물: 갱신된 개인정보 문서와 공개 고지 요구사항
- 완료 조건(DoD): 각 외부 스크립트의 유지 또는 제거 조건과 방문자 고지 내용이 문서에 명시된다.
- 상태: docs에 먼저 정책을 추가해야 합니다.

### TICKET 4 - 블로그 관리자 인증 경계 정합화

- 설명: 로컬 작성 UI 전용 정책은 유지하면서 유효한 `X-API-Key` 요청이 production Workers의 D1/R2에 저장되는 경로를 구현한다.
- 입력 문서: `docs/admin-blog-policy.md`, `docs/api-contracts.md`, `docs/operations.md`
- 산출물: 관리자 인증 코드, 글 작성 및 이미지 업로드 검증, 결과 보고서
- 완료 조건(DoD): 유효 키의 글 작성과 이미지 업로드가 production 저장소에 성공하고, 누락·오류 키 요청은 `401`로 거부되며 저장되지 않는다.

### TICKET 5 - 배포 런타임과 검증 게이트 정렬

- 설명: Node와 Wrangler 지원 조합을 운영 문서, README, GitHub Actions, package lock에 동일하게 반영하고, 배포 전에 타입 검사·클라이언트 빌드·테스트를 실행하도록 정의한다.
- 입력 문서: `docs/operations.md`, `backend/README.md`, `.github/workflows/deploy.yml`, `backend/package.json`, `client/package.json`
- 산출물: 운영 문서, 배포 workflow, 검증 스크립트
- 완료 조건(DoD): 배포 로그가 lockfile의 Wrangler를 사용하고, 정의된 검증 실패 시 production 배포가 시작되지 않는다.

### TICKET 6 - 자동 테스트 기준 수립

- 설명: 포트폴리오 공개 응답, CORS, 관리자 인증, 블로그 작성, 이미지 업로드의 성공·거부 시나리오를 자동 검증 범위로 문서화하고 구현한다.
- 입력 문서: `docs/api-contracts.md`, `docs/admin-blog-policy.md`, `docs/privacy-policy.md`, `docs/operations.md`
- 산출물: 테스트 전략, 테스트 파일, package scripts
- 완료 조건(DoD): 정의된 성공·거부 시나리오가 로컬과 CI에서 재현되고, 테스트 실패가 배포를 차단한다.

### TICKET 7 - 입력 형식 정책 확정

- 설명: 블로그 `id`, `date` 및 콘텐츠 입력의 허용 형식과 제한값을 API 계약에 정의한다.
- 입력 문서: `docs/api-contracts.md`
- 산출물: 갱신된 API 계약과 후속 구현 티켓
- 완료 조건(DoD): 클라이언트와 API가 공유할 형식, 길이, 오류 응답 기준이 문서에 명시된다.
- 상태: docs에 먼저 정책을 추가해야 합니다.

## 실행 순서

1. TICKET 1로 기준 문서를 Git 이력에 고정한다.
2. TICKET 2, 3, 7의 정책을 문서에서 먼저 확정한다.
3. TICKET 4로 블로그 발행 경로의 문서-코드 불일치를 해결한다.
4. TICKET 5와 TICKET 6으로 배포 재현성과 회귀 방지를 구축한다.
5. 개인정보 API와 외부 스크립트 관련 구현은 확정된 정책을 반영하는 별도 변경으로 진행한다.

## 검증 체크리스트

- [x] `Agent.md`와 `docs/`를 기준으로 현재 구조와 정책을 확인했다.
- [x] 문서-코드 불일치를 코드 수정 전에 기록했다.
- [x] 정책 미결정 항목을 구현 티켓과 분리했다.
- [x] 계획 산출물을 `specs/outputs/`에 작성했다.
- [x] 클라이언트 빌드와 백엔드 타입 검사를 실행했다.
- [x] 운영 의존성 감사를 실행했다.
