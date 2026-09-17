# Sprint 목표

Cloudflare Pages 기본 도메인에서 Workers 공개 API와 D1 데이터를 정상 조회할 수 있도록 production CORS Origin을 정합화한다.

# TICKET 목록

## TICKET 1 - Pages production Origin 전환

- 설명: 더 이상 포트폴리오 운영 도메인으로 사용하지 않는 `https://www.nokda.me`를 production CORS 허용 목록에서 제거하고 `https://portfolio-2hq.pages.dev`로 교체한다.
- 입력 문서: `docs/project-overview.md`, `docs/api-contracts.md`, `docs/operations.md`
- 산출물: `backend/wrangler.toml`, `backend/README.md`, 관련 SSOT 문서
- 완료 조건(DoD): 배포 후 `Origin: https://portfolio-2hq.pages.dev` 요청에는 해당 Origin의 CORS 헤더가 반환되고, `Origin: https://www.nokda.me` 요청에는 CORS 허용 헤더가 반환되지 않는다.

# 검증 체크리스트

- [ ] 백엔드 TypeScript 검사 통과
- [ ] 운영 의존성 감사 통과
- [ ] GitHub Actions production 배포 성공
- [ ] Pages Origin 허용 응답 확인
- [ ] 기존 `www.nokda.me` Origin 거부 응답 확인
