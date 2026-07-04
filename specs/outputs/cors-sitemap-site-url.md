# Sprint 목표
프로덕션 프론트 도메인 `https://www.nokda.me` 기준으로 CORS 허용과 sitemap URL을 정합화한다.

# TICKET 목록
## TICKET 1 - 프로덕션 CORS 도메인 고정
- 설명: Cloudflare Workers production 환경에서 `https://www.nokda.me`만 프론트 Origin으로 허용한다.
- 입력 문서: `backend/README.md`, `backend/wrangler.toml`
- 산출물: `backend/wrangler.toml`, `backend/README.md`
- 완료 조건(DoD): `Origin: https://www.nokda.me` 요청에만 `Access-Control-Allow-Origin`이 반환된다.

## TICKET 2 - sitemap 사이트 URL 정리
- 설명: 빌드 전 sitemap 생성 기본 URL을 `https://www.nokda.me`로 변경하고 정적 sitemap을 갱신한다.
- 입력 문서: `client/scripts/generate-sitemap.mjs`, `client/public/sitemap.xml`
- 산출물: `client/scripts/generate-sitemap.mjs`, `client/public/sitemap.xml`
- 완료 조건(DoD): sitemap의 `loc` 값이 `https://www.nokda.me/`, `https://www.nokda.me/blog`로 생성된다.
