# oh-my-agent 커스텀 버전 타 컴퓨터 셋업 및 업데이트 가이드

본 문서는 사용자의 커스텀 오마이에이전트(`JK-AJAE/oh-my-agent-custom`) 소스코드를 다른 컴퓨터 환경에 최초 셋업하고 빌드 및 전역 명령어(`oma`)로 연동하여 사용하는 방법에 대해 설명합니다.

---

## 1. 초기 셋업 단계 (최초 1회)

### Step 1. 필수 프로그램 사전 설치
타겟 컴퓨터에 아래 개발 도구들이 먼저 설치되어 있어야 합니다.
- **Git**
- **Node.js (v22 이상 권장)** & **npm**
- **Bun** (설치: 파워쉘에서 `powershell -c "irm bun.sh/install.ps1 | iex"`)
- **uv** (설치: 파워쉘에서 `powershell -c "irm astral.sh/uv/install.ps1 | iex"`)
- **serena-agent** (설치: `uv tool install -p 3.13 serena-agent@latest --prerelease=allow`)

### Step 2. 커스텀 저장소 복제 (Clone)
원하는 로컬 작업 폴더(예: `C:\projects` 등)로 이동한 뒤, 깃허브 저장소를 복제합니다:
```powershell
git clone https://github.com/JK-AJAE/oh-my-agent-custom.git
```

### Step 3. 의존성 설치 및 빌드
클론한 저장소의 `cli` 폴더로 이동하여 npm 의존성을 설치하고 빌드를 수행합니다:
```powershell
cd oh-my-agent-custom/cli
npm install --legacy-peer-deps --no-audit
npm run build
```

### Step 4. 글로벌 CLI 연동
빌드가 완료되면 글로벌 명령어(`oma`, `oh-my-agent`)로 등록합니다:
```powershell
npm install -g .
```
- **정상 등록 확인**: `oma --version` (결과: `8.9.0`)

---

## 2. 자동 업데이트 환경 구축 (권장)
매번 변경사항을 직접 빌드하고 적용하는 번거로움을 피하기 위해 원클릭 자동 업데이트 스크립트를 사용합니다.

1. 로컬에 `oh-my-agent-manual` 폴더를 생성합니다.
2. 폴더 안에 `update.ps1` 파일을 만들고 아래 코드를 붙여넣습니다 (이때 `$repoPath` 경로를 본인의 저장소 경로에 맞게 적절히 수정합니다):

```powershell
# oh-my-agent-custom 업데이트 및 글로벌 링크 스크립트
$ErrorActionPreference = "Stop"
$repoPath = "C:\projects\oh-my-agent-custom" # 저장소 경로에 맞춰 변경

Write-Host "▸ 1. 깃허브에서 최신 소스 가져오기 (git pull)..." -ForegroundColor Cyan
Set-Location $repoPath
git pull

Write-Host "▸ 2. 의존성 설치 (npm install)..." -ForegroundColor Cyan
Set-Location "$repoPath\cli"
npm install --legacy-peer-deps --no-audit

Write-Host "▸ 3. 소스 빌드 (npm run build)..." -ForegroundColor Cyan
npm run build

Write-Host "▸ 4. 글로벌 CLI 등록 (npm install -g .)..." -ForegroundColor Cyan
npm install -g .

Write-Host ""
Write-Host "✓ 업데이트 및 글로벌 등록이 완료되었습니다!" -ForegroundColor Green
Write-Host "버전 확인: oma --version" -ForegroundColor Green
```

3. 이후 코드 변경 사항을 적용하고 싶을 때는 생성한 폴더 내에서 파워쉘로 `.\update.ps1`을 실행해주면 자동으로 최신화됩니다.

---

## 3. 원본(first-fluke/oh-my-agent)과 버전 동기화하는 방법
커스텀 버전(`oh-my-agent-custom`)을 공식 원본 저장소의 최신 버전과 항상 맞추려면 아래 방법을 사용합니다.

### 방법 A. GitHub Web UI 이용 (가장 간편)
1. 본인의 깃허브 저장소 페이지([JK-AJAE/oh-my-agent-custom](https://github.com/JK-AJAE/oh-my-agent-custom))에 접속합니다.
2. 브랜치 정보 아래에 있는 **[Sync Fork]** 버튼을 누른 뒤 **[Update branch]**를 클릭합니다.
3. 로컬 컴퓨터(또는 타 컴퓨터) 터미널로 돌아와 수동으로 최신 코드를 당긴 후 업데이트를 진행합니다:
   ```powershell
   cd e:\신규프로젝트\oh-my-agent-manual
   .\update.ps1
   ```

### 방법 B. 로컬 Git에서 upstream 직접 연동
로컬 터미널에서 원본 저장소(`upstream`)를 등록하여 명령어로 직접 병합합니다.

1. **원본 저장소를 upstream으로 추가** (최초 1회):
   ```powershell
   cd e:\신규프로젝트\oh-my-agent-custom
   git remote add upstream https://github.com/first-fluke/oh-my-agent.git
   ```
2. **동기화 및 병합**:
   ```powershell
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
3. **병합된 코드를 본인 원격 저장소에 푸시**:
   ```powershell
   git push origin main
   ```
4. **업데이트 스크립트 실행**하여 로컬 CLI 반영:
   ```powershell
   cd e:\신규프로젝트\oh-my-agent-manual
   .\update.ps1
   ```

