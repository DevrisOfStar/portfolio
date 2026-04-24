# Sprint Goal
GitHub Actions `Deploy Production` 실패(`npx ... exit code 1`)를 문서 기준으로 재현 가능 원인 제거와 배포 안정성 개선으로 해결한다.

# TICKET 목록
## TICKET 1 - 배포 실패 원인 정리 및 문서-코드 불일치 해소
- 설명: `wrangler.toml` 프로덕션 R2 바인딩 플레이스홀더 상태를 문서 기준 실제 값으로 정렬한다.
- 입력 문서: `backend/README.md`, `.github/workflows/deploy.yml`
- 산출물: `backend/wrangler.toml`, `backend/README.md`
- 완료 조건(DoD): 프로덕션 R2 바인딩에 플레이스홀더가 없고 문서 설명과 설정이 일치한다.

## TICKET 2 - 배포 워크플로우 신뢰성 개선
- 설명: 워크플로우 환경명 오타(후행 공백) 제거 및 필수 시크릿 사전 검증으로 원인 식별 가능성을 높인다.
- 입력 문서: `backend/README.md`
- 산출물: `.github/workflows/deploy.yml`
- 완료 조건(DoD): 워크플로우가 필수 시크릿 누락 시 `wrangler` 실행 전 명확한 오류를 출력한다.
