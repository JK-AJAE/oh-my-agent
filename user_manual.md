# 🛸 오마이에이전트(oh-my-agent) 초간단 사용 설명서

**오마이에이전트(oh-my-agent)**는 내 프로젝트 폴더에 분야별 전문가 AI 팀(기획자, 개발자, 디자이너, 테스터 등)을 한 번에 불러와 협업할 수 있게 도와주는 도구입니다.

개발자가 아니어도 아래 **3가지 단계**만 따라 하면 다른 프로젝트에서 쉽게 AI 팀을 불러와 사용할 수 있습니다.

---

### 1단계: 컴퓨터에 오마이에이전트 설치 및 연동하기 (최초 1회)

> 🔒 **참고:** `oh-my-agent-custom` 레포지토리가 **프라이빗(Private)**이므로 설치를 위해 **깃허브 개인 액세스 토큰(Personal Access Token - PAT)**이 필요합니다. 
> 혼자 사용하시는 경우, 아래 명령어의 `[본인의_깃허브_토큰]` 부분에 실제 토큰 값을 직접 적어두고 저장하시면 매번 입력할 필요 없이 한 줄 복사로 간편하게 설치할 수 있습니다.

사용하시는 환경 및 도구에 맞춰 아래의 설치/연동 방법을 진행하세요.

#### 💻 1. 윈도우 파워쉘 (Windows PowerShell)
윈도우 파워쉘 터미널을 열고 설치를 진행합니다.
> ⚠️ **주의:** 파워쉘에서 `| iex`를 통해 스크립트를 즉시 실행할 때 내부 오류가 발생하면 터미널 창이 자동으로 닫힐 수 있습니다. 터미널이 닫히는 현상이 발생하면 아래와 같이 **스크립트 파일 다운로드 후 실행** 방식을 사용하세요.

* **기본 설치법 (즉시 실행):**
  ```powershell
  irm -Headers @{Authorization="token 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"} -Uri "https://raw.githubusercontent.com/JK-AJAE/oh-my-agent-custom/main/cli/install.ps1" | iex
  ```

* **권장 설치법 (터미널이 닫히는 경우):**
  스크립트를 파일로 저장한 뒤 로컬에서 직접 실행하면 에러 로그를 끝까지 확인할 수 있습니다.
  ```powershell
  # 1. 설치 스크립트 다운로드
  irm -Headers @{Authorization="token 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"} -Uri "https://raw.githubusercontent.com/JK-AJAE/oh-my-agent-custom/main/cli/install.ps1" -OutFile install.ps1
  
  # 2. 다운로드된 파일 직접 실행
  .\install.ps1
  ```

#### 🖥️ 2. 안티그래비티 IDE의 터미널 (Antigravity IDE Terminal)
안티그래비티 IDE 내부의 통합 터미널(단축키 `Ctrl + \``)을 열고, 자신의 OS 환경에 맞는 명령어를 입력해 설치를 진행합니다.
* **Windows (PowerShell 쉘):**
  터미널이 즉시 종료된다면, 위의 **권장 설치법 (스크립트 파일 다운로드 후 실행)**을 진행하세요.
  ```powershell
  irm -Headers @{Authorization="token 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"} -Uri "https://raw.githubusercontent.com/JK-AJAE/oh-my-agent-custom/main/cli/install.ps1" | iex
  ```
* **macOS / Linux (Bash 쉘):**
  ```bash
  curl -H "Authorization: token [본인의_깃허브_토큰]" -fsSL https://raw.githubusercontent.com/JK-AJAE/oh-my-agent-custom/main/cli/install.sh | bash
  ```

#### ⚙️ 3. 안티그래비티 CLI (Antigravity CLI)
안티그래비티 CLI의 V3 엔진 파이프라인 전개 및 전역 설치가 필요할 경우, 터미널에서 초기 연동 명령을 수행합니다.
```bash
# V3 엔진 연동 및 셋업 명령
antigravity /master
# 또는 초기화 명령어
ag init
```

#### 📱 4. 코덱스 앱 (Codex App)
코덱스 GUI 앱에서 해당 프로젝트 내의 오마이에이전트 설정을 정상 인식할 수 있도록 셋업합니다.
1. 코덱스 앱이 설치된 상태에서, 터미널에 설치 명령어가 정상 실행되었는지 확인합니다.
2. 프로젝트 루트 폴더에 `.codex/` 폴더가 없는 경우, `bunx oh-my-agent@latest`를 실행하여 연동 설정 파일을 자동 생성 및 초기화합니다.

#### 📟 5. 코덱스 CLI (Codex CLI)
터미널에서 코덱스 CLI 도구를 전역적으로 오마이에이전트와 매핑하여 초기화합니다.
```bash
# 코덱스 CLI 초기화 및 에이전트 환경 셋업
codex init
```

#### 🤖 6. 클로드 (Claude - Claude Code / Cursor 등)
Claude Code CLI 또는 Claude API 기반 개발 환경에서 오마이에이전트의 도구 연동(MCP 등)을 활성화합니다.
* **Claude Code 설치 및 인증:**
  ```bash
  npm install -g @anthropic-ai/claude-code
  claude
  ```
* **MCP 설정 연동:**
  `.mcp.json` 파일에 로컬 오마이에이전트의 도구 연동 정보(serena MCP 등)가 등록되어 있는지 확인합니다.

> 💡 **알아두기:** 이 설치 및 초기화 과정은 오마이에이전트 실행에 필요한 프로그램들(Bun, uv, 전역 CLI 연동 등)을 각 환경에 자동으로 세팅해 줍니다.


---

### 2단계: 내 프로젝트 폴더에 AI 팀 불러오기

적용하고 싶은 프로젝트 폴더 위치에서 안티그래비티 터미널(또는 명령 창)을 열고 아래 명령어를 실행합니다.

* **기본 실행 명령어 (Bun 기반):**
  ```bash
  bunx oh-my-agent@latest
  ```

* **윈도우에서 `better-sqlite3` 컴파일 에러가 나는 경우 (추천 대안):**
  윈도우 환경에서 `Permission denied` 또는 `better-sqlite3` 빌드 관련 Visual Studio 오류가 나면, Node.js 기반의 `npx`를 사용하여 실행하면 빌드 컴파일 없이 바로 설치가 가능합니다.
  ```bash
  npx oh-my-agent@latest
  ```

1. 명령어를 입력하면 어떤 전문가들(프리셋)을 팀으로 구성할지 묻는 화면이 나옵니다.
   * 예: **Frontend** (화면 개발 전문가 팀), **DevOps** (배포/서버 전문가 팀), **Fullstack** (전체 개발 팀) 등
2. 키보드 방향키로 원하는 설정을 선택하고 **엔터(Enter)**를 누릅니다.
3. 선택이 끝나면 프로젝트 폴더 안에 `.agents/`라는 **AI 팀 폴더**가 자동으로 생성됩니다. 이 폴더가 생성되면 연동이 완료된 것입니다.

---

### 3단계: 평소 사용하던 AI 도구로 질문하기

폴더 안에 `.agents/` 팀 폴더가 생겼다면 준비는 끝났습니다. 평소 사용하시는 도구에 맞게 AI 팀을 실행해 보세요.

#### 🛸 안티그래비티 IDE (Antigravity IDE)에서 자연어로 실행하기
안티그래비티 IDE는 CLI 명령어뿐만 아니라, 내장된 AI 채팅창을 통해 자연어로 직접 오마이에이전트 팀과 협업할 수 있습니다.
1. 안티그래비티 IDE에서 프로젝트 폴더를 엽니다.
2. IDE 내부의 **AI 채팅창(채팅 패널)**을 활성화합니다.
3. 평소 질문하듯이 대화창에 자연어로 원하는 작업을 지시하면, 프로젝트 내에 생성된 `.agents/` 설정을 바탕으로 전문 에이전트들이 자동으로 구동됩니다.
   * **질문 예시:** `"work 워크플로우로 로그인 기능 완성해줘"`, `"메뉴얼대로 기획서 작성해줘"`

#### 💻 안티그래비티 터미널 (Antigravity Terminal) 및 CLI 도구에서 실행하기
터미널 창에서 `oma` CLI 명령어와 함께 원하는 워크플로우 이름을 붙여 작업을 지시합니다.
```bash
# 예시: step-by-step 단계별 작업 수행 (work 워크플로우 실행)
oma work "로그인 페이지 완성하기"

# 예시: 여러 에이전트들의 협업 병렬 처리 (orchestrate 워크플로우 실행)
oma orchestrate "API 서버 설계 및 구현"
```

#### 📱 코덱스 앱 (Codex App)에서 실행하기
1. 코덱스 앱에서 해당 프로젝트 폴더를 엽니다.
2. 프로젝트 내 `.codex/agents/`에 정의된 개별 전문 에이전트(PM, Frontend, QA 등)가 자동으로 활성화됩니다.
3. 채팅창이나 프롬프트 입력을 통해 원하는 작업을 지시하면, 오마이에이전트에 정의된 분업 및 협업 프로세스(PM 수립 → 개발 → QA 검증)가 자동으로 전개됩니다.

#### 🤖 타사 AI 도구 (Cursor, Claude Code, Gemini CLI 등)에서 실행하기
해당 도구의 채팅창을 켜고 평소처럼 자연어로 질문을 던지면 됩니다.
```
나: "로그인 기능 추가해 줘"
→ [PM AI]가 할 일을 정리하고 계획을 세웁니다.
→ [DB AI]가 로그인에 필요한 데이터 저장소 설계합니다.
→ [Backend AI]가 로그인 서버 코드를 짭니다.
→ [Frontend AI]가 깔끔한 로그인 화면을 그립니다.
→ [QA AI]가 오류가 없는지 테스트합니다.
```

오마이에이전트가 프로젝트 안에 탑재되어 있기 때문에, 질문 하나만으로 여러 명의 전문가 AI가 서로 협업하며 자동으로 완성도 높은 결과물을 만들어냅니다.

---

### 💡 자주 발생하는 설치 오류 해결 방법 (Troubleshooting)

#### 1. `Permission denied` 또는 `better-sqlite3` 빌드 실패 (exited with 1)
* **원인**: `better-sqlite3` 모듈 컴파일 중 윈도우 보안 시스템(Defender 등)에 의한 권한 차단이 발생했거나, C++ 컴파일러(Visual Studio Build Tools)가 설치되어 있지 않아서 발생합니다.
* **해결 방법**:
  1. **`npx` 명령어로 우회 실행 (가장 추천)**: 이미 Bun, uv, serena 등 기본 설치가 완료된 상태라면, `bunx oh-my-agent@latest` 대신 **`npx oh-my-agent@latest`**를 실행하면 C++ 컴파일을 우회하고 prebuilt binary로 간편히 셋업을 완료할 수 있습니다.
  2. **백신 실시간 보호 일시 중단**: Windows Defender 또는 기타 타사 백신의 실시간 감시 기능을 잠시 끄고 다시 설치를 진행해 보세요.
  3. **Visual Studio 빌드 도구 설치**: 파워쉘을 관리자 권한으로 열고 아래 명령어를 통해 C++ 빌드 도구를 설치합니다.
     ```powershell
     winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools"
     ```
  4. **Node/Bun 최신 버전 업데이트**: 설치된 Bun 및 Node.js의 버전 호환성 문제일 수 있으므로 터미널에서 다음 명령어를 실행합니다.
     ```powershell
     bun upgrade
     ```

#### 2. `npx oh-my-agent@latest` 실행 중 `CLI tools to configure:` 단계에서 종료 코드 1로 실패하는 경우
* **원인**: 마지막 단계인 `CLI tools to configure:`는 방향키로 항목을 탐색하고 **스페이스바(Space)**로 다중 선택한 뒤 엔터를 눌러 완료해야 하는 선택식 프롬프트입니다. 아무것도 선택하지 않은 채 바로 엔터를 누르거나, 터미널 환경에 따른 입력 키 인식 지연으로 제한 시간(Timeout)이 발생하여 중단된 것입니다.
* **해결 방법**:
  1. **스페이스바로 도구 선택하기**: 방향키(↑/↓)로 연동하고자 하는 도구(Claude Code, Codex CLI 등)로 이동한 후, 반드시 **스페이스바(Space)를 눌러서 체크(선택) 표시**를 하고 **엔터(Enter)**를 누르세요.
  2. **외부 파워쉘/CMD 사용 (추천)**: IDE 내장 터미널에서 키 조작 및 입력 맵 전송이 올바르게 동작하지 않는 경우, 윈도우의 일반 **명령 프롬프트(CMD)** 또는 **PowerShell** 창을 별도로 실행하여 해당 프로젝트 경로로 이동한 뒤 `npx oh-my-agent@latest` 명령어를 실행하면 모든 선택 조작이 정상적으로 이루어집니다.

#### 3. 도구를 선택하고 엔터를 눌렀으나 마지막에 여전히 종료 코드 1로 실패하는 경우
* **원인**: 프로젝트 폴더 내에 기존에 생성되다 만 폴더(`.agents`, `.codex`, `.gemini` 등) 또는 파일들의 덮어쓰기 권한이 잠겨있거나, 로컬 임시 폴더(Temp) 내의 권한 문제로 정상적인 파일 저장이 불가능한 상태입니다.
* **해결 방법**:
  1. **기존 설정 폴더 강제 삭제 후 재시도 (추천)**: 파워쉘 터미널에서 아래 명령어로 꼬여있는 기존 에이전트 폴더를 깨끗하게 지운 뒤 셋업을 재시도합니다.
     ```powershell
     Remove-Item -Recurse -Force .agents, .codex, .gemini, .claude, .qwen, AGENTS.md, GEMINI.md, CLAUDE.md
     npx oh-my-agent@latest
     ```
  2. **npm 전역 설치 방식으로 우회**: 임시 폴더 실행 권한(sandbox 제한)을 우회하기 위해 아래 명령어를 차례로 입력합니다.
     ```powershell
     npm install -g oh-my-agent
     oh-my-agent
     ```

#### 4. 대화형 셋업 프롬프트가 권한/인식 오류 등으로 완전히 불가능한 경우 (가장 확실한 수동 설치법)
* **원인**: 윈도우 환경 및 터미널의 입력 포커스 전송 오류, 또는 GitHub API 템플릿 다운로드 시 깃허브 토큰이 셋업 도구 내부에 제대로 인식되지 않아 다운로드 중에 프로세스가 비정상 종료(종료 코드 1)되는 경우입니다.
* **해결 방법 (수동 파일 복제 및 벤더 연동)**:
  수동으로 깃허브에서 원본 프로젝트 소스를 가져와서 복사하고 연동(Link)하는 방식으로 셋업을 완결할 수 있습니다.
  1. **오마이에이전트 임시 설치 및 클론 (PowerShell 실행):**
     아래 명령어를 파워쉘에 입력해 프라이빗 소스를 로컬로 임시 클론합니다.
     ```powershell
     git clone https://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@github.com/JK-AJAE/oh-my-agent-custom.git temp_oma
     ```
  2. **핵심 설정 폴더 및 에이전트 가이드 파일 복사:**
     클론된 템플릿 파일들을 내 프로젝트의 루트로 복사해 옵니다.
     ```powershell
     Copy-Item -Path "temp_oma\.agents" -Destination "." -Recurse -Force
     Copy-Item -Path "temp_oma\.serena" -Destination "." -Recurse -Force
     Copy-Item -Path "temp_oma\AGENTS.md", "temp_oma\CLAUDE.md", "temp_oma\GEMINI.md", "temp_oma\.mcp.json" -Destination "." -Force
     ```
  3. **에이전트 벤더 링크 생성:**
     로컬 프로젝트의 에이전트 셋업 설정 도구를 실행하여 각 도구 연동 폴더(`.claude/`, `.gemini/` 등)를 자동 링크합니다. (대화형 질문 없이 바로 실행됩니다.)
     ```powershell
     npx oh-my-agent link
     ```
  4. **임시 다운로드 폴더 삭제 (마무리):**
     복사가 끝난 임시 폴더를 삭제하여 디렉토리를 정리합니다.
     ```powershell
     Get-ChildItem -Path "temp_oma" -Recurse | ForEach-Object { $_.Attributes = 'Normal' }
     Remove-Item -Path "temp_oma" -Recurse -Force
     ```
