# Sprint 목표
포트폴리오의 개인정보 노출면과 운영 보안 리스크를 백엔드 응답, CORS, 업로드 검증, 의존성 기준으로 우선 차단한다.

# TICKET 목록
## TICKET 1 - 학력/경력 API 비공개 정책 확정 및 응답 제거
- 설명: 화면에서만 숨긴 학력/경력 정보를 공개 API 응답에서도 제외한다.
- 입력 문서: `client/README.md`, `specs/outputs/privacy-career-education-private.md`
- 산출물: `backend/src/db/queries.ts`, `backend/src/routes/portfolio.ts`, 관련 README/spec 문서
- 완료 조건(DoD): `GET /api/portfolio`와 `GET /api/portfolio/career`에서 학력/경력 정보가 공개되지 않는다.

## TICKET 2 - React Router 보안 취약점 업데이트
- 상태: 완료
- 설명: `npm audit --omit=dev`에서 확인된 `react-router-dom`/`react-router` high 취약점을 해결한다.
- 입력 문서: `client/package.json`, `client/package-lock.json`
- 산출물: 갱신된 의존성 잠금 파일
- 완료 조건(DoD): `cd client && npm audit --omit=dev` 결과 high 취약점이 0건이다.

## TICKET 3 - CORS 허용 출처 제한
- 상태: 완료
- 설명: `Access-Control-Allow-Origin: '*'`를 허용 도메인 기반 응답으로 변경한다.
- 입력 문서: `checklist.md`
- 산출물: `backend/src/utils/cors.ts`, `backend/src/routes/portfolio.ts`, `backend/src/routes/blog.ts`
- 완료 조건(DoD): 허용된 origin만 CORS 응답을 받고, 미허용 origin은 CORS 헤더를 받지 않는다.

## TICKET 4 - 이미지 업로드 검증 강화
- 상태: 완료
- 설명: 이미지 업로드에 MIME allowlist, 확장자 검증, 5MB 크기 제한, 경로 정규화를 적용한다.
- 입력 문서: `checklist.md`
- 산출물: `backend/src/routes/blog.ts`
- 완료 조건(DoD): `image/jpeg`, `image/png`, `image/gif`, `image/webp` 외 파일과 5MB 초과 파일, `../` 포함 경로가 거부된다.

## TICKET 5 - 운영 에러 메시지 비공개 처리
- 상태: 완료
- 설명: 공개 API에서 내부 에러 메시지가 응답 본문으로 노출되지 않게 한다.
- 입력 문서: `checklist.md`
- 산출물: `backend/src/routes/portfolio.ts`, `backend/src/routes/blog.ts`
- 완료 조건(DoD): 클라이언트 응답은 일반 메시지만 포함하고, 상세 오류는 서버 로그에만 남는다.

## TICKET 6 - 관리자 API 호출 안정성 보강
- 상태: 완료
- 설명: `fetchAdminApi`에 일반 API와 같은 타임아웃 처리를 적용한다.
- 입력 문서: `checklist.md`
- 산출물: `client/src/services/api.js`
- 완료 조건(DoD): 관리자 API 호출도 10초 초과 시 abort되고 사용자에게 timeout 에러가 반환된다.

## TICKET 7 - 외부 추적 스크립트와 개인정보 처리 고지 정리
- 설명: GA/geo-gateway 스크립트 사용 여부와 개인정보 처리방침 필요성을 문서화하고 공개 페이지에 고지를 추가한다.
- 입력 문서: `client/index.html`, `client/README.md`
- 산출물: 개인정보 처리방침 문서 또는 페이지, 관련 README/spec 문서
- 완료 조건(DoD): 방문자 데이터 처리 항목, 목적, 보관/제3자 제공 여부가 공개 문서에 명시된다.
