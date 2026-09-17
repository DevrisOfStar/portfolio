# Portfolio Resume

React 기반 원페이지 이력서 포트폴리오입니다.

프로젝트 기능과 운영 정책의 기준은 루트 `Agent.md`와 `../docs/`를 확인하세요.

## 개인정보 공개 정책

- 학력/경력 정보는 데이터베이스에 유지하되, 사용자 화면에서는 비공개 처리합니다.
- 비공개 범위: 메인 페이지 경력 섹션, 경력 상세 페이지
- 공개 API의 경력/학력 응답 상태와 미결정 사항은 `../docs/privacy-policy.md`를 따릅니다.

## 설치 및 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 클라우드플레어 배포

1. `npm run build` 실행
2. 클라우드플레어 Pages에서 `dist` 폴더 업로드

환경 변수와 전체 배포 절차는 `../docs/operations.md`를 확인하세요.
