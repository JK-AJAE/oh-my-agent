import os

# 1. 탐색에서 완전히 제외할 불필요한 캐시 및 런타임 빌드 폴더 정의
EXCLUDE_DIRS = {
    '.git',
    '.github',
    '.agents',
    '.claude-plugin',
    '.husky',
    '.serena',
    'node_modules',
    'dist',
    'build',
    '__pycache__',
    'benchmarks',
    'screenshots',
    'windows11',
    'ios',
    'android',
    'maskable',
    'static'
}

# 2. 결과 명세서의 가독성을 위해 제외할 바이너리 및 리소스 확장자 정의
SKIP_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.mp4', '.svg', '.lock',
    '.woff', '.woff2', '.eot', '.ttf'
}

TARGET_FILE = 'oma_current_structure.md'

def generate_structure_md():
    try:
        with open(TARGET_FILE, 'w', encoding='utf-8') as f:
            f.write("# 📂 Verified oh-my-agent Workspace Structure (Full Deep-Dive)\n\n")
            f.write("> **Note**: 이 파일은 프로젝트 루트의 실제 디렉터리 구조를 바닥 끝까지 추적한 정밀 분석서입니다.\n")
            f.write("> 무겁거나 불필요한 미디어 파일 및 캐시 디렉터리는 제외되었습니다.\n\n")
            f.write("## 🌲 Full Detailed File Tree\n```text\n")
            
            for root, dirs, files in os.walk('.'):
                # 제외 폴더 필터링 (In-place 수정으로 하위 디렉터리 탐색 원천 방지)
                dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
                
                # 현재 탐색 중인 경로 분석
                relative_path = os.path.relpath(root, '.')
                parts = relative_path.replace('\\', '/').split('/')
                
                # 상위 경로에 제외 폴더가 포함되어 있는지 이중 안전망 검증
                if any(exclude in parts for exclude in EXCLUDE_DIRS):
                    continue
                    
                depth = 0 if relative_path == '.' else len(parts)
                indent = ' ' * 4 * depth
                folder_name = os.path.basename(root)
                
                if folder_name == '':
                    f.write("oh-my-agent-root/\n")
                else:
                    f.write(f"{indent}{folder_name}/\n")
                    
                subindent = ' ' * 4 * (depth + 1)
                for file in files:
                    # 결과 파일 및 스크립트 자신은 트리 구조에서 제외
                    if file in {TARGET_FILE, 'scan_structure.py', 'export_md.py'}:
                        continue
                        
                    _, ext = os.path.splitext(file)
                    if ext.lower() in SKIP_EXTENSIONS:
                        continue
                        
                    f.write(f"{subindent}{file}\n")
                    
            f.write("```\n")
        print(f"\n✅ 초정밀 깊이 분석 완료: '{TARGET_FILE}' 파일이 정상적으로 갱신되었습니다.")
    except Exception as e:
        print(f"\n❌ 파일 생성 중 에러 발생: {e}")

if __name__ == '__main__':
    generate_structure_md()