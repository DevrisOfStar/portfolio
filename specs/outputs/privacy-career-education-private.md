# Sprint Goal
포트폴리오 데이터는 유지하면서 학력/경력 정보를 사용자 화면에서 비공개 처리한다.

# TICKET 목록
## TICKET 1 - 개인정보 공개 정책 문서화
- 설명: 학력/경력을 비공개 처리한다는 정책을 문서에 명시한다.
- 입력 문서: `client/README.md`
- 산출물: `client/README.md`
- 완료 조건(DoD): 학력/경력 비공개 정책과 적용 범위(화면 비노출, 데이터 유지)가 문서에 반영된다.

## TICKET 2 - 경력 정보 화면 비노출
- 설명: 홈 화면의 경력 섹션을 숨기고 경력 상세 페이지 접근을 차단한다.
- 입력 문서: `client/README.md`
- 산출물: `client/src/pages/HomePage.jsx`, `client/src/pages/DetailPage.jsx`
- 완료 조건(DoD): 메인 화면에 경력 정보가 보이지 않고, `career-*` 상세 URL 접근 시 표시되지 않는다.
