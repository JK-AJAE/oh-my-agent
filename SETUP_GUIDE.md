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
현재 커스텀 저장소(`oh-my-agent-custom`)는 포크(Fork)가 아닌 **독립 저장소로 복사하여 생성**되었으므로, GitHub 웹 UI의 [Sync Fork] 버튼을 사용할 수 없습니다. 
따라서 로컬 컴퓨터의 Git CLI에서 원본 저장소를 `upstream`으로 등록하고 직접 병합(Merge)하는 방식을 사용해야 합니다.

### 동기화 순서 (Git CLI 기준)

#### Step 1. 원본 저장소를 upstream 원격지로 추가 (최초 1회만 실행)
로컬 저장소 폴더로 이동한 뒤, 공식 원본 저장소를 `upstream`이라는 이름으로 등록합니다:
```powershell
cd e:\신규프로젝트\oh-my-agent-custom
git remote add upstream https://github.com/first-fluke/oh-my-agent.git
```
- 등록 확인: `git remote -v` 명령을 실행해 `upstream` 주소가 정상적으로 출력되는지 확인합니다.

#### Step 2. 원본 최신 코드 동기화 및 병합
원본의 최신 업데이트를 가져와 내 main 브랜치에 병합합니다:
```powershell
# 1. 원본 저장소의 변경사항 다운로드
git fetch upstream

# 2. 로컬 main 브랜치로 전환
git checkout main

# 3. 원본의 main 브랜치를 내 main 브랜치에 병합
git merge upstream/main
```
> **[참고] 병합 거부 에러(fatal: refusing to merge unrelated histories) 발생 시:**
> 독립 저장소로 시작했기 때문에 두 저장소의 초기 히스토리가 달라 병합이 거부될 수 있습니다. 이 경우 아래와 같이 `--allow-unrelated-histories` 옵션을 추가하여 병합을 허용해주십시오:
> ```powershell
> git merge upstream/main --allow-unrelated-histories
> ```

#### Step 3. 병합된 최신 버전을 본인 깃허브에 푸시
```powershell
git push origin main
```

#### Step 4. 로컬 전역 CLI 빌드 및 업데이트 적용
```powershell
cd e:\신규프로젝트\oh-my-agent-manual
.\update.ps1
```


