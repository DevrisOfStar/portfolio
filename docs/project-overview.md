# 프로젝트 개요

## 목적

이 프로젝트는 `https://www.nokda.me`에서 제공하는 개인 포트폴리오와 블로그다. 공개 사용자는 포트폴리오와 게시된 블로그를 조회하고, 관리자는 로컬 개발 클라이언트의 작성 화면에서 블로그를 작성한다.

## 구성

- 프론트엔드: React 18, Vite, React Router
- 백엔드: Cloudflare Workers, TypeScript
- 데이터베이스: Cloudflare D1
- 이미지 저장소: Cloudflare R2
- 백엔드 배포: GitHub Actions와 Wrangler
- 프론트엔드 배포: 현재 Cloudflare Pages 수동 배포

## 사용자 화면

- `/`: 포트폴리오 홈
- `/detail/:id`: 포트폴리오 상세
- `/blog`: 블로그 목록
- `/blog/write`: 로컬 개발 환경에서만 노출되는 관리자 작성 화면

## 데이터 흐름

1. 공개 클라이언트는 `VITE_API_URL`의 공개 API에서 포트폴리오와 블로그를 조회한다.
2. 로컬 개발 클라이언트는 관리자 API 키를 포함해 블로그 글과 이미지를 전송한다.
3. 프로덕션 블로그 글은 production D1, 이미지는 production R2에 저장되어야 한다.
4. 게시된 블로그와 이미지는 공개 읽기 API로 제공된다.

## 현재 확인된 불일치

- 목표 동작은 로컬 개발 클라이언트에서 작성한 글을 프로덕션 저장소에 저장하는 것이다.
- 현재 백엔드의 `authenticateAdmin()`은 요청 URL의 호스트가 localhost가 아니면 관리자 요청을 거부한다.
- 따라서 프로덕션 Workers로 보내는 작성 요청은 API 키가 올바르더라도 저장 전에 `401`로 차단된다.
- 해결 기준은 `docs/admin-blog-policy.md`를 따른다.

## 문서 상태

- 이 문서와 `docs/`의 문서는 프로젝트 정책과 계약의 기준이다.
- 코드와 문서의 불일치는 `specs/outputs/`에 티켓으로 기록한 뒤 수정한다.
