# HCI.AI.KR 전체 홈페이지 업로드 가이드

## 1. 압축 해제
ZIP 파일을 압축 해제하면 `HCI.AI.KR-Full-Website` 폴더가 생성됩니다.

## 2. GitHub 업로드 순서
한 번에 전체를 올리지 않고 다음 순서로 업로드하세요.

### 1단계 — 공통 스타일 + HOME
- `style.css`
- `index.html`
- GitHub에서 Commit changes
- Cloudflare Pages 자동 배포 확인
- `https://hci.ai.kr` 접속 확인

### 2단계 — HCI 섹터
- `01/` 폴더 전체
- 업로드 후 다음 주소 확인
  - `/01/hci.html`
  - `/01/hci-basics.html`
  - `/01/hci-platforms.html`
  - `/01/nutanix.html`
  - `/01/vmware-vcf.html`
  - `/01/vxrail.html`
  - `/01/popcon-hci.html`

### 3단계 — AI 섹터
- `02/` 폴더 전체
- `/02/ai.html`부터 확인

### 4단계 — HCI × AI 섹터
- `03/` 폴더 전체
- `/03/hci-ai.html`부터 확인

### 5단계 — INSIGHT 섹터
- `04/` 폴더 전체
- `/04/insight.html`부터 확인

### 6단계 — ABOUT 섹터
- `05/` 폴더 전체
- `/05/about.html`
- `/05/glossary.html`

## 3. GitHub 업로드 시 주의
- 기존 파일을 덮어쓰기 전에 백업 브랜치를 만드는 것을 권장합니다.
- 각 단계마다 Cloudflare 배포 완료 후 페이지를 확인합니다.
- 이 버전은 전체 메뉴와 디자인 골격을 제공하는 확장형 초안입니다.
- 벤더별 수치, 가격, 라이선스, 성능 수치는 공식 자료 확인 후 추가해야 합니다.
